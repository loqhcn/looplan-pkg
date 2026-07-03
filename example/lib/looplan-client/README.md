注入客户端功能, 用于开发调试

# 客户端介绍

- PC 或 移动应用客户端, 会暴露一些方法
- 在浏览器中, 没有这些方法
- 这里的客户端主要作用就是模拟这些方法, 用于开发调试

# 开发实现
制作一个 web 端运行的客户端函数模拟

作用是本地开发完的组件, 最终是要放在客户端运行的
- 如果判断到 `window.looplanClient` 不存在, 就创建 web 模拟 client
- 实现入口: `index.ts`
- 核心类: `LooplanClient.ts`
- 命令实现: `commands.ts`

参考pc端实现: 
- preload: D:\work\looplan\looplan-pc\src\preload\index.ts
- LooplanClient: D:\work\looplan\looplan-pc\src\preload\lib\LooplanClient.ts
- main commands: D:\work\looplan\looplan-pc\src\main\lib\looplan-client\commands.ts

需要做到一样的使用效果


# 使用方式

```ts
import { setupDevClient } from './lib/looplan-client'

setupDevClient()

await window.looplanClient.command('ai.models', {
  modelType: 'llm'
})
```

`setupDevClient()` 会把 `LooplanClient` 挂到 `window.looplanClient`

# 实现的 command

- `ai.chat`
- `ai.models`
- `ai.agent.chat`

## ai.models

- 直接返回内置默认模型数组
- 默认指向本地测试服务 `http://localhost:3007`

## ai.chat

- 访问 `POST http://localhost:3007/api/chat`
- 支持普通返回和流式返回
- 流式时会把每一行协议文本透传给 `onChunk`

## ai.agent.chat

- 访问 `POST http://localhost:3007/api/agent/chat`
- 按 `agent-DefaultResponse` 流协议逐行转发给 `onChunk`
- 最终 `data` 会整理为命令返回值
