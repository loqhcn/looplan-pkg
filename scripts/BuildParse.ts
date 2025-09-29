import { existsSync, readFileSync } from 'fs'
import { join, resolve } from 'path'
import { defineConfig, type UserConfig } from 'vite'
import { mergeConfig } from 'vite'

interface ParseLog {
    level: 'info' | 'warn' | 'error'
    message: string
    timestamp: Date
}

interface ParseResult {
    pkgName: string
    pkgPath: string
    entryFile: string | null
    useType: boolean // 是否使用TypeScript
    viteConfig: string | null
    viteConfigObject: UserConfig | null
    packageJson: any | null
    config: any | null
    logs: ParseLog[]
    success: boolean
}

class BuildParse {
    public logs: ParseLog[] = []
    pkgName: string = ''
    private projectRoot = process.cwd()

    constructor() {}

    /**
     * 创建解析器实例
     * @param pkgName 组件包名称
     * @returns BuildParse实例
     */
    static src(pkgName: string) {
        const obj = new BuildParse()
        obj.pkgName = pkgName
        return obj
    }

    private addLog(level: 'info' | 'warn' | 'error', message: string) {
        this.logs.push({
            level,
            message,
            timestamp: new Date()
        })
    }

    private fileExists(filePath: string): boolean {
        return existsSync(filePath)
    }

    private readJsonFile(filePath: string): any | null {
        try {
            if (this.fileExists(filePath)) {
                const content = readFileSync(filePath, 'utf-8')
                return JSON.parse(content)
            }
        } catch (error) {
            this.addLog('error', `读取JSON文件失败: ${filePath}, 错误: ${error}`)
        }
        return null
    }

    private async readConfigFile(filePath: string): Promise<any | null> {
        try {
            if (this.fileExists(filePath)) {
                // 使用动态导入读取配置文件
                const config = await import(filePath)
                return config.default || config
            }
        } catch (error) {
            this.addLog('error', `读取配置文件失败: ${filePath}, 错误: ${error}`)
        }
        return null
    }

    async parse(): Promise<ParseResult> {
        this.addLog('info', `开始解析组件包: ${this.pkgName}`)
        
        const pkgPath = join(this.projectRoot, 'packages', this.pkgName)
        this.addLog('info', `组件包路径: ${pkgPath}`)
        
        // 检查组件包目录是否存在
        if (!this.fileExists(pkgPath)) {
            this.addLog('error', `组件包目录不存在: ${pkgPath}`)
            return {
                pkgName: this.pkgName,
                pkgPath,
                entryFile: null,
                useType: false,
                viteConfig: null,
                viteConfigObject: null,
                packageJson: null,
                config: null,
                logs: this.logs,
                success: false
            }
        }

        // 解析入口文件 src/index.ts | src/index.js
        const entryResult = this.findEntryFile(pkgPath)
        const entryFile = entryResult?.entry || null
        const useType = entryResult?.useType || false
        
        // 解析vite.config.ts | vite.config.js
        const viteConfig = await this.findViteConfig(pkgPath)
        
        // 解析并合并Vite配置
        const viteConfigObject = await this.parseViteConfig(pkgPath, viteConfig)
        
        // 解析package.json
        const packageJson = this.parsePackageJson(pkgPath)
        
        // 解析config.ts | config.js
        const config = await this.findConfig(pkgPath)
        
        const success = entryFile !== null
        
        this.addLog('info', `解析完成，成功: ${success}`)
        
        console.log('vite配置',JSON.stringify(viteConfigObject));

        return {
            pkgName: this.pkgName,
            pkgPath,
            entryFile,
            useType,
            viteConfig,
            viteConfigObject,
            packageJson,
            config,
            logs: this.logs,
            success
        }
    }

    /**
     * 解析并合并Vite配置
     * @param pkgPath 组件包路径
     * @param viteConfigFile Vite配置文件路径
     * @returns 合并后的Vite配置对象
     */
    private async parseViteConfig(pkgPath: string, viteConfigFile: string | null): Promise<UserConfig | null> {
        try {
            // 1. 读取默认的 vite.base.ts
            const baseViteConfig = await this.loadBaseViteConfig()
            if (!baseViteConfig) {
                this.addLog('error', '无法读取基础Vite配置')
                return null
            }
            
            this.addLog('info', '成功读取基础Vite配置')
            
            let finalConfig = { ...baseViteConfig }
            
            // 2. 读取组件包的 vite.config.ts（如果存在）
            if (viteConfigFile) {
                const customConfig = await this.loadCustomViteConfig(pkgPath, viteConfigFile)
                if (customConfig) {
                    this.addLog('info', `成功读取自定义Vite配置: ${viteConfigFile}`)
                    // 3. 智能合并配置参数
                    finalConfig = this.smartMergeConfig(finalConfig, customConfig)
                    this.addLog('info', '成功合并Vite配置')
                } else {
                    this.addLog('warn', `无法解析自定义Vite配置: ${viteConfigFile}`)
                }
            }
            
            // 4. 注入必要的路径配置
            const configWithPaths = this.injectPathConfig(finalConfig, pkgPath)
            
            this.addLog('info', '成功注入路径配置')
            
            return configWithPaths
            
        } catch (error) {
            this.addLog('error', `解析Vite配置失败: ${error}`)
            return null
        }
    }
    
    /**
     * 智能合并Vite配置，避免重复项
     */
    private smartMergeConfig(baseConfig: UserConfig, customConfig: UserConfig): UserConfig {
        const merged = { ...baseConfig }
        
        // 合并 build 配置
        if (customConfig.build) {
            merged.build = { ...baseConfig.build, ...customConfig.build }
            
            // 合并 rollupOptions
            if (customConfig.build.rollupOptions) {
                merged.build.rollupOptions = {
                    ...baseConfig.build?.rollupOptions,
                    ...customConfig.build.rollupOptions
                }
                
                // 智能合并 external 数组，去重
                const baseExternal = baseConfig.build?.rollupOptions?.external
                const customExternal = customConfig.build.rollupOptions.external
                
                if (baseExternal || customExternal) {
                    const mergedExternal: string[] = []
                    
                    // 处理基础 external
                    if (baseExternal) {
                        if (Array.isArray(baseExternal)) {
                            baseExternal.forEach(item => {
                                if (typeof item === 'string' && !mergedExternal.includes(item)) {
                                    mergedExternal.push(item)
                                }
                            })
                        } else if (typeof baseExternal === 'string') {
                            mergedExternal.push(baseExternal)
                        }
                    }
                    
                    // 处理自定义 external
                    if (customExternal) {
                        if (Array.isArray(customExternal)) {
                            customExternal.forEach(item => {
                                if (typeof item === 'string' && !mergedExternal.includes(item)) {
                                    mergedExternal.push(item)
                                }
                            })
                        } else if (typeof customExternal === 'string') {
                            if (!mergedExternal.includes(customExternal)) {
                                mergedExternal.push(customExternal)
                            }
                        }
                    }
                    
                    merged.build.rollupOptions.external = mergedExternal
                }
                
                // 合并 output 配置
                if (customConfig.build.rollupOptions.output) {
                    const baseOutput = baseConfig.build?.rollupOptions?.output
                    const customOutput = customConfig.build.rollupOptions.output
                    
                    // 处理单个output对象的情况
                    if (!Array.isArray(customOutput) && !Array.isArray(baseOutput)) {
                        merged.build.rollupOptions.output = {
                            ...baseOutput,
                            ...customOutput
                        }
                        
                        // 合并 globals 对象
                        if (customOutput.globals && baseOutput?.globals) {
                            merged.build.rollupOptions.output.globals = {
                                ...baseOutput.globals,
                                ...customOutput.globals
                            }
                        }
                    } else {
                        // 如果是数组格式，直接使用自定义配置
                        merged.build.rollupOptions.output = customOutput
                    }
                }
            }
            
            // 合并 lib 配置
            if (customConfig.build.lib) {
                merged.build.lib = {
                    ...baseConfig.build?.lib,
                    ...customConfig.build.lib
                }
            }
        }
        
        // 合并其他顶级配置
        Object.keys(customConfig).forEach(key => {
            if (key !== 'build' && (customConfig as any)[key] !== undefined) {
                (merged as any)[key] = (customConfig as any)[key]
            }
        })
        
        return merged
    }
    
    /**
     * 读取基础Vite配置
     */
    private async loadBaseViteConfig(): Promise<UserConfig | null> {
        try {
            const baseConfigPath = join(this.projectRoot, 'src', 'build', 'vite.base.ts')
            if (!this.fileExists(baseConfigPath)) {
                this.addLog('error', `基础Vite配置文件不存在: ${baseConfigPath}`)
                return null
            }
            
            const module = await import(baseConfigPath)
            return module.baseViteConfig || module.default
        } catch (error) {
            this.addLog('error', `读取基础Vite配置失败: ${error}`)
            return null
        }
    }
    
    /**
     * 读取组件包的自定义Vite配置
     */
    private async loadCustomViteConfig(pkgPath: string, viteConfigFile: string): Promise<UserConfig | null> {
        try {
            const configPath = join(pkgPath, viteConfigFile)
            const module = await import(configPath)
            return module.default || module
        } catch (error) {
            this.addLog('error', `读取自定义Vite配置失败: ${error}`)
            return null
        }
    }
    
    /**
     * 注入必要的路径配置
     */
    private injectPathConfig(config: UserConfig, pkgPath: string): UserConfig {
        const entryPath = join(pkgPath, 'src', 'index.ts')
        const jsEntryPath = join(pkgPath, 'src', 'index.js')
        
        // 确定实际的入口文件
        const actualEntry = this.fileExists(entryPath) ? entryPath : 
                           (this.fileExists(jsEntryPath) ? jsEntryPath : entryPath)
        
        // 保留用户自定义的 lib 配置，但确保必要的属性被设置
        const existingLib: any = config.build?.lib || {}
        let customFormats = Array.isArray(existingLib.formats) ? existingLib.formats : ['es', 'umd']
        const customName = typeof existingLib.name === 'string' ? existingLib.name : this.pkgName
        
        // 去重 formats 数组
        const uniqueFormats: any[] = []
        customFormats.forEach(format => {
            if (!uniqueFormats.includes(format)) {
                uniqueFormats.push(format)
            }
        })
        customFormats = uniqueFormats
        
        const injectedConfig: UserConfig = {
            ...config,
            root: pkgPath, // 设置组件包为根目录
            build: {
                ...config.build,
                lib: {
                    ...existingLib,
                    entry: actualEntry,
                    name: customName,
                    fileName: (format) => `${this.pkgName}.${format}.js`,
                    formats: customFormats as any
                },
                outDir: join(this.projectRoot, 'dist', this.pkgName),
                emptyOutDir: true,
                // 确保只有一个 CSS 文件输出
                cssCodeSplit: false
            }
        }
        
        this.addLog('info', `设置构建根目录: ${pkgPath}`)
        this.addLog('info', `设置入口文件: ${actualEntry}`)
        this.addLog('info', `设置输出目录: ${join(this.projectRoot, 'dist', this.pkgName)}`)
        this.addLog('info', `设置库名称: ${customName}`)
        this.addLog('info', `设置输出格式: ${JSON.stringify(customFormats)}`)
        
        return injectedConfig
    }

    private findEntryFile(pkgPath: string): { entry: string; useType: boolean } | null {
        const srcPath = join(pkgPath, 'src')
        
        // 优先检查 TypeScript 入口文件
        const tsEntry = join(srcPath, 'index.ts')
        if (this.fileExists(tsEntry)) {
            this.addLog('info', `找到TypeScript入口文件: ${tsEntry}`)
            return { entry: 'src/index.ts', useType: true }
        }
        
        // 检查 JavaScript 入口文件
        const jsEntry = join(srcPath, 'index.js')
        if (this.fileExists(jsEntry)) {
            this.addLog('info', `找到JavaScript入口文件: ${jsEntry}`)
            return { entry: 'src/index.js', useType: false }
        }
        
        this.addLog('error', `未找到入口文件: ${srcPath}/index.(ts|js)`)
        return null
    }

    private async findViteConfig(pkgPath: string): Promise<string | null> {
        // 优先检查 TypeScript 配置文件
        const tsConfig = join(pkgPath, 'vite.config.ts')
        if (this.fileExists(tsConfig)) {
            this.addLog('info', `找到Vite TypeScript配置: ${tsConfig}`)
            return 'vite.config.ts'
        }
        
        // 检查 JavaScript 配置文件
        const jsConfig = join(pkgPath, 'vite.config.js')
        if (this.fileExists(jsConfig)) {
            this.addLog('info', `找到Vite JavaScript配置: ${jsConfig}`)
            return 'vite.config.js'
        }
        
        this.addLog('warn', `未找到Vite配置文件: ${pkgPath}/vite.config.(ts|js)`)
        return null
    }

    private parsePackageJson(pkgPath: string): any | null {
        const packageJsonPath = join(pkgPath, 'package.json')
        
        if (this.fileExists(packageJsonPath)) {
            this.addLog('info', `找到package.json: ${packageJsonPath}`)
            return this.readJsonFile(packageJsonPath)
        }
        
        this.addLog('warn', `未找到package.json: ${packageJsonPath}`)
        return null
    }

    private async findConfig(pkgPath: string): Promise<any | null> {
        // 优先检查 TypeScript 配置文件
        const tsConfig = join(pkgPath, 'config.ts')
        if (this.fileExists(tsConfig)) {
            this.addLog('info', `找到TypeScript配置: ${tsConfig}`)
            return await this.readConfigFile(tsConfig)
        }
        
        // 检查 JavaScript 配置文件
        const jsConfig = join(pkgPath, 'config.js')
        if (this.fileExists(jsConfig)) {
            this.addLog('info', `找到JavaScript配置: ${jsConfig}`)
            return await this.readConfigFile(jsConfig)
        }
        
        this.addLog('info', `未找到自定义配置文件: ${pkgPath}/config.(ts|js)`)
        return null
    }
}

interface PackageItem {
    name: string
    path: string
    config: any
    hasEntryFile: boolean
    hasViteConfig: boolean
    hasPackageJson: boolean
    hasConfig: boolean
}

/**
 * 获取所有组件包
 */
async function getPackages(): Promise<PackageItem[]> {
    const projectRoot = process.cwd()
    const packagesDir = join(projectRoot, 'packages')
    
    if (!existsSync(packagesDir)) {
        console.warn(`packages目录不存在: ${packagesDir}`)
        return []
    }
    
    const items: PackageItem[] = []
    
    try {
        const { readdirSync, statSync } = await import('fs')
        const dirs = readdirSync(packagesDir)
        
        for (const dir of dirs) {
            const pkgPath = join(packagesDir, dir)
            const stat = statSync(pkgPath)
            
            if (stat.isDirectory()) {
                // 检查各种文件是否存在
                const hasEntryTs = existsSync(join(pkgPath, 'src', 'index.ts'))
                const hasEntryJs = existsSync(join(pkgPath, 'src', 'index.js'))
                const hasViteConfigTs = existsSync(join(pkgPath, 'vite.config.ts'))
                const hasViteConfigJs = existsSync(join(pkgPath, 'vite.config.js'))
                const hasPackageJson = existsSync(join(pkgPath, 'package.json'))
                const hasConfigTs = existsSync(join(pkgPath, 'config.ts'))
                const hasConfigJs = existsSync(join(pkgPath, 'config.js'))
                
                const item: PackageItem = {
                    name: dir,
                    path: pkgPath,
                    config: null,
                    hasEntryFile: hasEntryTs || hasEntryJs,
                    hasViteConfig: hasViteConfigTs || hasViteConfigJs,
                    hasPackageJson,
                    hasConfig: hasConfigTs || hasConfigJs
                }
                
                items.push(item)
            }
        }
    } catch (error) {
        console.error(`扫描packages目录失败:`, error)
    }
    
    return items
}

export {
    getPackages,
    BuildParse
}