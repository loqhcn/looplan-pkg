import { BuildParse } from '../scripts/BuildParse'

async function testBuild() {
    const testResult = await BuildParse.src('test-vite-config').parse()
    console.log(JSON.stringify(testResult.viteConfigObject))
}

testBuild().catch(console.error)