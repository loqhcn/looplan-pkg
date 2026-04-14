import { BuildParse } from '../scripts/BuildParse'

async function testBuild() {
    const testResult = await BuildParse.src('lp-im').parse()
    console.log('Vite Config:')
    console.log(JSON.stringify(testResult.viteConfigObject, null, 2))
}

testBuild().catch(console.error)