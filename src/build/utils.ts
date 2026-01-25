import { resolve, join } from 'path'
import fs from 'fs'
import { promisify } from 'util'
import type { ParseResult } from './../../scripts/BuildParse'


// 转换为Promise版本的fs方法
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const mkdir = promisify(fs.mkdir)
const readdir = promisify(fs.readdir)

// 递归创建目录
export const ensureDir = async (dir: string) => {
  try {
    await mkdir(dir, { recursive: true })
  } catch (error: any) {
    if (error.code !== 'EEXIST') {
      throw error
    }
  }
}

// 将kebab-case转换为PascalCase
function toPascalCase(str: string): string {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
    .replace(/^[a-z]/, (g) => g.toUpperCase())
}

// 生成package.json
export async function generatePackageJson(pkgName: string, distDir: string, parseResult: ParseResult) {
  const packageJsonPath = join(distDir, 'package.json')

  const componentName = toPascalCase(pkgName)

  const currentPackageJson = parseResult.packageJson

  const packageJson = Object.assign({
    name: pkgName,
    version: '1.0.0',
    description: `${componentName} component for Vue 3`,
    main: `${pkgName}.umd.js`,
    module: `${pkgName}.es.js`,
    types: 'types/index.d.ts',
    files: ['*.js', '*.css', 'types'],
    peerDependencies: {
      vue: '^3.0.0'
    }
  }, currentPackageJson)

  await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2))
  console.log(`📄 Generated package.json for ${pkgName}`)
}


// 递归删除目录
export const removeDir = async (dir: string) => {
  try {
    if (fs.promises.rm) {
      await fs.promises.rm(dir, { recursive: true, force: true })
    } else {
      // 兼容旧版本 Node.js
      const files = await readdir(dir).catch(() => [])
      for (const file of files) {
        const filePath = join(dir, file)
        const fileStat = await fs.promises.stat(filePath)
        if (fileStat.isDirectory()) {
          await removeDir(filePath)
        } else {
          await fs.promises.unlink(filePath)
        }
      }
      await fs.promises.rmdir(dir)
    }
  } catch (error: any) {
    // 忽略不存在的目录
    if (error.code !== 'ENOENT') {
      throw error
    }
  }
}