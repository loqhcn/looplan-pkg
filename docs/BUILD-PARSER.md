# 构建解析系统 (BuildParser)

## 概述

新的构建解析系统将构建配置的解析逻辑从实际构建流程中分离出来，提供了更清晰的架构和更好的可测试性。

## 核心特性

### ✅ 已实现的功能

1. **自动组件发现** - 扫描 `packages/` 目录，自动发现所有有效组件
2. **入口文件检测** - 支持 `.ts` 和 `.js` 入口文件（优先 `.ts`）
3. **Vite配置检测** - 支持 `.ts` 和 `.js` vite配置文件（优先 `.ts`）
4. **构建配置生成** - 为每个组件生成完整的构建配置
5. **详细日志记录** - 记录所有解析过程，便于调试
6. **错误处理** - 完善的错误处理和验证
7. **单元测试** - 完整的测试覆盖

### 🏗️ 系统架构

```
scripts/
├── buildParse.ts       # 核心解析逻辑
└── build.ts           # 构建执行逻辑（待重构）

src/build/
├── vite.base.ts       # 精简的基础Vite配置
└── utils.ts           # 构建工具函数

tests/
└── buildParse.spec.ts # 解析逻辑测试
```

## 使用方式

### 基本用法

```typescript
import { parseBuildConfig } from './scripts/buildParse'

// 解析所有组件
const result = await parseBuildConfig()

// 解析特定组件
const result = await parseBuildConfig({ pkg: 'looplan-button' })

// 自定义项目根目录
const result = await parseBuildConfig({ projectRoot: '/path/to/project' })
```

### 解析结果

```typescript
interface ParseResult {
  components: ComponentInfo[]      // 发现的所有组件
  targetComponent?: ComponentInfo  // 目标组件（如果指定）
  buildConfigs: BuildConfig[]     // 生成的构建配置
  logs: ParseLog[]               // 解析日志
}
```

### 运行测试

```bash
# 运行解析逻辑测试
bun test tests/buildParse.spec.ts

# 查看详细日志输出
bun test tests/buildParse.spec.ts --verbose
```

## 测试结果

✅ **6个测试全部通过**

- 组件发现测试 - 成功发现4个组件
- 构建配置解析测试 - 正确生成构建配置
- 完整解析测试 - 批量解析所有组件
- 特定组件解析测试 - 单个组件解析
- 错误处理测试 - 无效组件名处理
- Vite配置检测测试 - 正确识别配置文件

### 发现的组件

当前系统成功识别了以下组件：

1. **looplan-button** - 按钮组件（无独立Vite配置）
2. **looplan-emoji** - 表情组件（无独立Vite配置）
3. **looplan-text** - 文本组件（无独立Vite配置）
4. **test-vite-config** - 测试组件（有独立Vite配置）

### 日志示例

```
[INFO] Scanning packages directory: D:\work\looplan-pkg\looplan-pkg\packages
[INFO] Found TypeScript entry: D:\work\looplan-pkg\looplan-pkg\packages\looplan-button\src\index.ts
[INFO] No vite config found in: D:\work\looplan-pkg\looplan-pkg\packages\looplan-button
[INFO] Added component: looplan-button
[INFO] Found TypeScript vite config: D:\work\looplan-pkg\looplan-pkg\packages\test-vite-config\vite.config.ts
[INFO] Discovered 4 components: looplan-button, looplan-emoji, looplan-text, test-vite-config
```

## 配置规则

### 组件发现规则

1. 必须是 `packages/` 下的目录
2. 必须包含 `src/index.ts` 或 `src/index.js` 入口文件
3. 优先使用 `.ts` 文件

### Vite配置检测规则

1. 检查 `vite.config.ts`（优先）
2. 检查 `vite.config.js`（备选）
3. 记录配置类型和路径

### 构建配置生成规则

1. **库名称**: 将包名转换为PascalCase（去除 `looplan-` 前缀）
2. **输出格式**: 默认 `['es', 'umd']`
3. **外部依赖**: 默认 `['vue']`
4. **输出目录**: `dist/{包名}/`
5. **类型目录**: `dist/{包名}/types/`

## 下一步计划

1. 🔄 **重构构建脚本** - 基于解析结果实现实际构建
2. 🔄 **Vite配置注入** - 在运行时动态注入必要配置
3. 🔄 **并行构建支持** - 支持多组件并行构建
4. 🔄 **配置覆盖机制** - 支持组件级配置覆盖

## 当前状态

✅ **解析逻辑完成并经过测试**  
🔄 **构建执行逻辑待重构**

解析系统已经稳定可用，为后续的构建流程优化打下了坚实基础。