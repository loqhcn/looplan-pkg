# 多组件库开发模板

这是一个支持多组件开发的 Vue 3 组件库模板，使用 Vite + TypeScript + Vue 3。

## 🚀 特性

- ✨ 支持多个组件包开发
- 📦 统一打包系统，支持 UMD, ES Module 格式
- 🔧 TypeScript 支持
- 🎯 每个组件都可以独立打包
- 📝 自动生成类型声明文件
- 🛠 支持自定义组件配置

## 📁 项目结构

```
├── packages/              # 组件包目录
│   ├── looplan-text/      # 文本组件(示例)
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   └── looplan-text.ts
│   │   │   └── index.ts   # 组件入口
│   │   ├── config.ts      # 组件配置（可选）
│   │   └── package.json   # 组件包信息（可选）
│   └── looplan-emoji/     # 表情组件(示例)
├── dist/                  # 打包输出目录
│   ├── looplan-text/      # 打包后的文本组件
│   │   ├── looplan-text.es.js
│   │   ├── looplan-text.umd.js
│   │   └── package.json
│   └── looplan-emoji/     # 打包后的表情组件
├── scripts/               # 构建脚本
│   ├── build.js          # 组件打包脚本
│   └── build.ts          # TypeScript 源码
└── example/              # 示例代码
```

## 🔧 使用方式

### 打包单个组件

```bash
# 打包 looplan-text 组件
node scripts/build.js --pkg looplan-text

# 打包 looplan-emoji 组件  
node scripts/build.js --pkg looplan-emoji
```

或者使用 npm script：

```bash
npm run build:pkg -- --pkg looplan-text
```

### 创建新组件

1. 在 `packages/` 目录下创建新的组件文件夹
2. 创建基本的文件结构：

```
packages/your-component/
├── src/
│   ├── components/
│   │   └── your-component.ts  # 组件实现
│   └── index.ts               # 导出文件
├── config.ts                  # 组件配置（可选）
└── package.json               # 包信息（可选）
```

3. 运行打包命令：

```bash
node scripts/build.js --pkg your-component
```

## 📝 组件配置

每个组件可以通过 `config.ts` 文件进行自定义配置：

```typescript
// packages/your-component/config.ts
export default {
    name: 'your-component',
    external: ['vue', 'axios'],  // 外部依赖
    globals: {                   // 全局变量映射
        vue: 'Vue',
        axios: 'axios'
    }
}
```

如果没有提供配置文件，系统将使用默认配置。

## 📦 输出格式

每个组件打包后会生成以下文件：

- `{component-name}.es.js` - ES Module 格式
- `{component-name}.umd.js` - UMD 格式  
- `package.json` - 包信息文件

## 🎯 已实现的组件

### LooplanText 文本组件

```javascript
import { LooplanText } from 'dist/looplan-text/looplan-text.es.js'

// 使用
<LooplanText text="Hello World" size="large" />
```

属性：
- `text`: 文本内容
- `size`: 尺寸 (`small` | `medium` | `large`)

### LooplanEmoji 表情组件

```javascript
import { LooplanEmoji } from 'dist/looplan-emoji/looplan-emoji.es.js'

// 使用
<LooplanEmoji emoji="🚀" label="火箭" animated size="large" />
```

属性：
- `emoji`: 表情符号
- `label`: 标签文本
- `animated`: 是否启用动画
- `size`: 尺寸 (`small` | `medium` | `large`)

## 🛠 开发说明

### 组件开发

- 使用 Vue 3 Composition API
- 支持 TypeScript
- 使用 defineComponent 创建组件
- 支持 Props 类型定义

### 构建系统

- 基于 Vite 构建
- 支持 Tree Shaking
- 自动生成类型声明
- 支持多种输出格式

## 🔍 故障排除

1. **Vue 文件解析错误**: 目前系统支持 TypeScript 组件，如需使用 .vue 文件，请确保正确的文件编码
2. **路径问题**: 确保所有路径使用正确的分隔符
3. **依赖问题**: 检查 package.json 中的依赖是否正确安装

## 📄 许可证

MIT License