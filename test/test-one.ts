import { BuildParse } from '../scripts/BuildParse'

async function testBuild() {
    console.log('🧪 Testing build system...')
    
    // 测试解析系统
    console.log('\n=== 测试解析系统 ===')
    const testResult = await BuildParse.src('looplan-button').parse()
    console.log('解析结果:', {
        success: testResult.success,
        useType: testResult.useType,
        entryFile: testResult.entryFile,
        hasViteConfig: testResult.viteConfig !== null
    })
    
    console.log('\n=== 测试具有自定义配置的组件 ===')
    const customConfigResult = await BuildParse.src('test-vite-config').parse()
    console.log('自定义配置解析结果:', {
        success: customConfigResult.success,
        useType: customConfigResult.useType,
        viteConfigFile: customConfigResult.viteConfig,
        customLibName: customConfigResult.viteConfigObject?.build?.lib?.name
    })
    
    console.log('\n✅ 解析系统测试完成!')
}

testBuild().catch(console.error)