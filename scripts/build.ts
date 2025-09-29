import { build } from 'vite'
import { resolve, join } from 'path'
import fs from 'fs'
import { BuildParse, getPackages } from './BuildParse'
import { generatePackageJson, handleTypeFiles, removeDir, ensureDir } from '../src/build/utils'

// 获取当前工作目录
const projectRoot = process.cwd()

// 构建单个组件
async function buildComponent(pkgName: string): Promise<boolean> {
    console.log(`\n🚀 Starting build for ${pkgName}...`)
    
    try {
        // 使用 BuildParse 进行解析
        const parser = BuildParse.src(pkgName)
        const parseResult = await parser.parse()
        
        if (!parseResult.success) {
            console.error(`❌ Failed to parse ${pkgName}:`, parseResult.logs.filter(log => log.level === 'error'))
            return false
        }
        
        console.log(`📈 Parse results for ${pkgName}:`)
        console.log(`  - 入口文件: ${parseResult.entryFile}`)
        console.log(`  - TypeScript: ${parseResult.useType ? '✅' : '❌'}`)
        console.log(`  - Vite配置: ${parseResult.viteConfig || '默认'}`)
        
        // 调试输出最终配置
        if (parseResult.viteConfigObject?.build?.rollupOptions?.external) {
            console.log(`  - External依赖: ${JSON.stringify(parseResult.viteConfigObject.build.rollupOptions.external)}`)
        }
        const libConfig = parseResult.viteConfigObject?.build?.lib
        if (libConfig && typeof libConfig === 'object' && 'formats' in libConfig) {
            console.log(`  - 输出格式: ${JSON.stringify(libConfig.formats)}`)
        }
        
        if (!parseResult.viteConfigObject) {
            console.error(`❌ No valid Vite configuration for ${pkgName}`)
            return false
        }
        
        // 清理输出目录
        const distDir = resolve(projectRoot, 'dist', pkgName)
        await removeDir(distDir)
        await ensureDir(distDir)
        
        console.log(`📦 Building ${pkgName} with ${parseResult.useType ? 'TypeScript' : 'JavaScript'} entry...`)
        
        // 执行构建
        await build(parseResult.viteConfigObject)
        
        console.log(`✅ ${pkgName} built successfully`)
        
        // 处理类型文件和生成 package.json
        if (parseResult.useType) {
            console.log(`📄 Processing TypeScript declarations for ${pkgName}...`)
            await handleTypeFiles(pkgName, parseResult.pkgPath, distDir)
        }
        
        console.log(`📝 Generating package.json for ${pkgName}...`)
        await generatePackageJson(pkgName, distDir)
        
        console.log(`✅ ${pkgName} build completed!`)
        return true
        
    } catch (error: any) {
        console.error(`❌ Failed to build ${pkgName}:`, error)
        
        // 输出详细的错误日志
        if (error.logs) {
            console.log('📋 Build logs:')
            error.logs.forEach((log: any) => {
                console.log(`  [${log.level.toUpperCase()}] ${log.message}`)
            })
        }
        
        return false
    }
}

// 主函数
async function main() {
    try {
        console.log('📦 Looplan Component Library Builder')
        console.log('🔍 Discovering components...')
        
        // 获取所有组件
        const packages = await getPackages()
        const validComponents = packages.filter(pkg => pkg.hasEntryFile)
        
        if (validComponents.length === 0) {
            console.error('❌ No valid components found in packages directory')
            process.exit(1)
        }
        
        console.log(`📋 Found ${validComponents.length} components:`)
        validComponents.forEach(comp => {
            console.log(`  - ${comp.name} (入口: ${comp.hasEntryFile ? '✅' : '❌'}, Vite配置: ${comp.hasViteConfig ? '✅' : '❌'})`)
        })
        
        // 获取命令行参数
        const args = process.argv.slice(2)
        const pkgArg = args.find(arg => arg.startsWith('--pkg='))
        const targetPkg = pkgArg ? pkgArg.split('=')[1] : null
        
        if (targetPkg) {
            // 构建指定组件
            const component = validComponents.find(c => c.name === targetPkg)
            if (!component) {
                throw new Error(`Component ${targetPkg} not found or invalid`)
            }
            
            console.log(`\n🎯 Building single component: ${targetPkg}`)
            const success = await buildComponent(targetPkg)
            
            if (success) {
                console.log(`\n🎉 Component ${targetPkg} built successfully!`)
            } else {
                console.error(`\n❌ Failed to build component ${targetPkg}`)
                process.exit(1)
            }
        } else {
            // 构建所有组件
            console.log('\n🚀 Building all components...')
            
            const results = []
            for (const component of validComponents) {
                const success = await buildComponent(component.name)
                results.push({ name: component.name, success })
            }
            
            // 总结报告
            console.log('\n📈 Build Summary:')
            const successful = results.filter(r => r.success)
            const failed = results.filter(r => !r.success)
            
            console.log(`✅ Successful: ${successful.length} (${successful.map(r => r.name).join(', ')})`)
            
            if (failed.length > 0) {
                console.log(`❌ Failed: ${failed.length} (${failed.map(r => r.name).join(', ')})`)
                process.exit(1)
            } else {
                console.log('\n🎉 All components built successfully!')
            }
        }
    } catch (error: any) {
        console.error('❌ Build failed:', error)
        process.exit(1)
    }
}

// 运行主函数
main()