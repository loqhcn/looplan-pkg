import { BuildParse, getPackages } from '../scripts/BuildParse'

async function main() {
    // 测试单个组件包解析
    console.log('=== 测试单个组件包解析 ===')
    const testProjectRoot = './'
    let res = await BuildParse.src('looplan-button').parse()
    console.log(res)

    console.log('\n=== 获取所有组件包 ===')
    const packages = await getPackages()
    console.log('发现的组件包:', packages.length)
    packages.forEach(pkg => {
        console.log(`- ${pkg.name}:`)
        console.log(`  路径: ${pkg.path}`)
        console.log(`  有入口文件: ${pkg.hasEntryFile}`)
        console.log(`  有Vite配置: ${pkg.hasViteConfig}`)
        console.log(`  有package.json: ${pkg.hasPackageJson}`)
        console.log(`  有自定义配置: ${pkg.hasConfig}`)
    })

    // 特别测试有自定义Vite配置的组件包
    console.log('\n=== 测试自定义Vite配置组件包 ===')
    const testViteConfigResult = await BuildParse.src('test-vite-config').parse()
    console.log('解析结果:')
    console.log(`成功: ${testViteConfigResult.success}`)
    console.log(`有自定义配置: ${testViteConfigResult.viteConfig !== null}`)
    
    if (testViteConfigResult.viteConfigObject) {
        console.log('\n合并后的Vite配置详情:')
        console.log(`  - 根目录: ${testViteConfigResult.viteConfigObject.root}`)
        console.log(`  - 入口: ${testViteConfigResult.viteConfigObject.build?.lib?.entry}`)
        console.log(`  - 库名: ${testViteConfigResult.viteConfigObject.build?.lib?.name}`)
        console.log(`  - 输出目录: ${testViteConfigResult.viteConfigObject.build?.outDir}`)
        console.log(`  - 构建格式: ${JSON.stringify(testViteConfigResult.viteConfigObject.build?.lib?.formats)}`)
        console.log(`  - 外部依赖: ${JSON.stringify(testViteConfigResult.viteConfigObject.build?.rollupOptions?.external)}`)
        
        console.log('\n解析日志:')
        testViteConfigResult.logs.forEach(log => {
            console.log(`  [${log.level.toUpperCase()}] ${log.message}`)
        })
    }

    console.log('\n=== 测试多个组件包解析 ===')
    for (const pkg of packages) {
        if (pkg.hasEntryFile) {
            console.log(`\n解析组件包: ${pkg.name}`)
            const parseResult = await BuildParse.src(pkg.name).parse()
            console.log(`成功: ${parseResult.success}`)
            console.log(`入口文件: ${parseResult.entryFile}`)
            console.log(`使用TypeScript: ${parseResult.useType}`)
            console.log(`Vite配置文件: ${parseResult.viteConfig}`)
            console.log(`Vite配置对象: ${parseResult.viteConfigObject ? '已生成' : '未生成'}`)
            console.log(`有package.json: ${parseResult.packageJson !== null}`)
            console.log(`有自定义配置: ${parseResult.config !== null}`)
            console.log(`日志数量: ${parseResult.logs.length}`)
            
            // 显示详细的Vite配置信息
            if (parseResult.viteConfigObject) {
                console.log('Vite配置详情:')
                console.log(`  - 根目录: ${parseResult.viteConfigObject.root}`)
                console.log(`  - 入口: ${parseResult.viteConfigObject.build?.lib?.entry}`)
                console.log(`  - 库名: ${parseResult.viteConfigObject.build?.lib?.name}`)
                console.log(`  - 输出目录: ${parseResult.viteConfigObject.build?.outDir}`)
                console.log(`  - 插件数量: ${parseResult.viteConfigObject.plugins?.length || 0}`)
            }
        }
    }
}

main().catch(console.error)