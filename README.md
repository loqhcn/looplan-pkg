# 🚀 Looplan 组件库开发模板 v2.0.0

> 现代化的 Vue 3 + TypeScript 组件库开发模板

[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D.svg)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.x-646CFF.svg)](https://vitejs.dev/)
[![Bun](https://img.shields.io/badge/Bun-1.3-F472B6.svg)](https://bun.sh/)



## 🚀 快速开始

### 环境要求

- **Bun** >= 1.0.0
- **Vue** >= 3.3.0
- **TypeScript** >= 5.0.0
- **Vite** >= 5.0.0

### 安装依赖

```bash
# 使用 Bun 安装依赖（推荐）
bun install

# 或使用 npm
npm install
```

### 构建命令

```bash
# 🏗️ 构建指定包
bun run .\scripts\build.ts --pkg=组件包名称

```

### 开发模式

```bash
# 📊 启动演示页面 + 构建服务（同时启动）
npm run dev
```



# 如何开发组件

- 组件包根目录为`/packages`, 新建文件夹,文件夹路径为`组件包目录`
- 在`组件包目录/src/component/`新建组件文件
- 在`组件包目录/src/index.ts`导出新建的组件
- 在`/public/docs/组件包名/组件名.md`编写`组件文档`, [文档规范](http://doc.looplan.cn/LpDoc)
- 在`/public/docs/组件包名/README.md`里面添加`组件文档`的链接


## 编写文档与调试

- 项目使用`looplan-doc`进行文档渲染,使用`looplan`进行自动注册与加载
- 在`/public/docs/组件包名/组件名.md`编写组件文档
- 运行`npm run dev`后, 访问`http://192.168.31.101:7011/组件包名/文档名.md`


## 文档example

- 例如我开发一个`looplan-example`组件包
- 访问`http://192.168.31.101:7011/looplan-example/test1.md`

test1.md:
```markdown
[TOC]

# 渲染效果
- 可以直接使用组件标签访问文档
<lp-component is="looplan-example@LooplanExample"></lp-component>




```

## 📊 构建输出

每个组件包构建后会生成：

```
dist/${组件包名称}
├── ${组件包名称}.js          # ES Module 格式
├── ${组件包名称}.umd.js      # UMD 格式 (浏览器兼容)
├── index.d.ts        # TypeScript 类型定义
└── style.css         # 样式文件
```

**输出特点**：
- 📦 **多格式支持**：ES Module + UMD
- 🔷 **类型完整**：完整的 TypeScript 声明文件
- 🎨 **样式分离**：独立的 CSS 文件
- 🗜️ **代码压缩**：生产环境自动压缩
- 📏 **体积优化**：Tree-shaking 支持

## 🔧 配置说明

### vite.base.ts - 基础配置

```typescript
export const createBaseConfig = (): UserConfig => ({
  plugins: [
    vue(),
    dts({ rollupTypes: true })
  ],
  build: {
    lib: {
      name: 'Component',
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: { vue: 'Vue' }
      }
    }
  }
})
```

### 包级别配置扩展

```typescript
// packages/your-package/vite.config.ts
export default defineConfig({
  ...createBaseConfig(),
  // 🎛️ 自定义配置
  build: {
    rollupOptions: {
      external: ['axios', 'lodash'],  // 额外的外部依赖
    }
  },
  plugins: [
    // 🔌 额外的插件
  ]
})
```


## ✨ 特性亮点



### 📦 多包架构
- **Monorepo 管理**：统一管理多个组件包
- **独立构建**：每个包可独立构建和发布
- **自定义配置**：支持包级别的 Vite 配置扩展

### 🧠 智能解析系统
- **文件优先级检测**：自动优先读取 `.ts` 文件，`.js` 作为备选
- **配置智能合并**：避免依赖重复，智能处理 external 配置
- **自动类型推断**：根据入口文件类型自动启用 TypeScript 支持

## 🏗️ 项目结构

```
looplan-pkg/
├── packages/                    # 组件包目录
│   ├── looplan-example/         # TypeScript 高级文本组件
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── looplan-example.vue      # 主组件
│   │   │   │   └── looplan-example-text.vue # 增强文本组件
│   │   │   ├── types.ts         # TypeScript 类型定义
│   │   │   └── index.ts         # 组件导出
│   │   ├── package.json
│   │   └── config.ts           # 包配置
│   │
│   ├── looplan-example-vite/    # TypeScript + 自定义 Vite 配置
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   └── test-component.vue  # 高级测试组件
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   └── vite.config.ts      # 自定义 Vite 配置
│   │
│   └── looplan-example-vite-js/ # JavaScript 组件示例
│       ├── src/
│       │   ├── components/
│       │   │   └── test-component.vue  # JavaScript 交互组件
│       │   └── index.js
│       └── vite.config.js      # JavaScript Vite 配置
│
├── scripts/                     # 构建脚本
│   ├── BuildParse.ts           # 🧠 智能解析引擎
│   └── build.ts                # 🚀 构建执行器
│
├── vite.base.ts                # 基础 Vite 配置
├── demo.html                   # 📊 组件演示页面
└── README.md
```

## 🛠️ 核心技术架构

### 智能解析引擎 (BuildParse.ts)

```typescript
class BuildParse {
  // 🔍 智能文件发现
  private async discoverFiles(): Promise<void>
  
  // 🧠 配置智能合并
  private smartMergeConfig(base: UserConfig, custom: UserConfig): UserConfig
  
  // 📝 解析日志记录
  private addLog(message: string): void
  
  // ⚙️ TypeScript 支持检测
  private detectTypeScriptUsage(): boolean
}
```

**核心功能**：
- 📂 自动发现组件包
- 🔧 智能配置解析
- 🎯 依赖去重处理
- 📊 详细日志记录
- 🔄 错误恢复机制

### 构建执行器 (build.ts)

```typescript
// 🚀 使用 Bun 运行时
#!/usr/bin/env bun

async function buildComponent(pkgName: string): Promise<boolean> {
  const parser = BuildParse.src(pkgName)
  const result = await parser.parse()
  
  if (result.viteConfigObject) {
    await build(result.viteConfigObject)
    return true
  }
  return false
}
```

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

感谢以下项目的启发和支持：

- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [TypeScript](https://www.typescriptlang.org/) - JavaScript 的超集
- [Bun](https://bun.sh/) - 快速的 JavaScript 运行时

---
