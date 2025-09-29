import { resolve, join } from 'path'
import fs from 'fs'
import { promisify } from 'util'

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
export async function generatePackageJson(pkgName: string, distDir: string) {
  const packageJsonPath = join(distDir, 'package.json')
  
  const componentName = toPascalCase(pkgName.replace('looplan-', ''))
  
  const packageJson = {
    name: pkgName,
    version: '1.0.0',
    description: `${componentName} component for Vue 3`,
    main: `${pkgName}.umd.js`,
    module: `${pkgName}.es.js`,
    types: 'types/index.d.ts',
    files: ['*.js', '*.css', 'types'],
    keywords: ['vue', 'component', componentName.toLowerCase()],
    author: 'Your Name',
    license: 'MIT',
    peerDependencies: {
      vue: '^3.0.0'
    }
  }
  
  await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2))
  console.log(`📄 Generated package.json for ${pkgName}`)
}

// 处理类型文件
export async function handleTypeFiles(pkgName: string, pkgRoot: string, distDir: string) {
  const typesDir = join(distDir, 'types')
  
  // 确保types目录存在
  await ensureDir(typesDir)
  
  // 检查是否已有类型文件生成
  const typeFiles = await readdir(typesDir).catch(() => [])
  
  if (typeFiles.length === 0) {
    console.log(`⚠️ No type files found, creating Vue component type declaration...`)
    
    const componentName = toPascalCase(pkgName.replace('looplan-', ''))
    
    // 从组件的types.ts文件读取接口定义
    const typesFilePath = join(pkgRoot, 'src', 'types.ts')
    
    let typesContent = ''
    try {
      if (fs.existsSync(typesFilePath)) {
        typesContent = await readFile(typesFilePath, 'utf-8')
      }
    } catch (error: any) {
      console.log(`⚠️ Could not read types file: ${error.message}`)
    }
    
    // 如果没有找到types.ts，生成默认的Props接口
    if (!typesContent) {
      if (pkgName.includes('text')) {
        typesContent = `export interface ${componentName}Props {
  text?: string
  size?: 'small' | 'medium' | 'large'
  color?: string
}

export interface ${componentName}Emits {
  (e: 'click', event: MouseEvent): void
  (e: 'change', value: string): void
}`
      } else if (pkgName.includes('emoji')) {
        typesContent = `export interface ${componentName}Props {
  emoji?: string
  label?: string
  animated?: boolean
  size?: 'small' | 'medium' | 'large'
  clickable?: boolean
}

export interface ${componentName}Emits {
  (e: 'click', emoji: string): void
  (e: 'hover', emoji: string): void
}`
      } else if (pkgName.includes('button')) {
        typesContent = `export interface ${componentName}Props {
  type?: 'primary' | 'secondary' | 'danger' | 'success'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  loading?: boolean
}

export interface ${componentName}Emits {
  (e: 'click', event: MouseEvent): void
}`
      } else {
        typesContent = `export interface ${componentName}Props {
  [key: string]: any
}

export interface ${componentName}Emits {
  [key: string]: (...args: any[]) => void
}`
      }
    }
    
    const vueComponentTypes = `import type { DefineComponent } from 'vue'

// Re-export component types
${typesContent}

// Vue component type
declare const ${componentName}: DefineComponent<${componentName}Props, {}, any>

// Named export
export { ${componentName} }
export { ${componentName} as ${pkgName.replace(/-/g, '')} }

// Default export
export default ${componentName}
`
    
    await writeFile(join(typesDir, 'index.d.ts'), vueComponentTypes)
    console.log(`📝 Created type declaration for ${pkgName}`)
  }
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