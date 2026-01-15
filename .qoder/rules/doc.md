---
trigger: always_on
---


当前项目使用`looplan-doc`进行编写example和文档
使用了`looplan`注册和加载组件

# 文档规范


## 编写组件文档

- 基础使用代码块
- Props? (使用ts代码块的interface作为插槽规则, 通常为`interface 组件名Props`)
- - 如果有更多ts类型需要使用者了解, 需要把类型写在Props后面
- Slots?
- Events?
- Exposes?


可以查看 [按钮组件文档演示](/docs/examples/button.md)

## 文档插件

- 通过`[插件名称]`开始,[!插件名称]结束
- 也可以通过`~~~[插件名称]`开始, `~~~`结束
- 有些是单行插件, 不需要匹配结束, 例如:添加`[TOC]`可以开启本页目录
- 插件内, 通过`@参数名`, 下面跟上内容, 可以给插件传参

### 组件演示插件

- @render会被编译渲染,script只能使用普通js, 不能使用ts和setup
- @code内的, 只用于显示, 这样做到显示和渲染分离
  

下面是演示代码: 

[component]
@render
```vue
<template>
    <div>
        <p>这是一个组件演示</p>
        <button @click="handleClick">点击我</button>
    </div>
</template>
<script>
export default {
  methods: {
    handleClick() {
      console.log('按钮被点击了')
    }
  }
}
</script>
```
@code
```vue
<template>
    <div>
        <p>这是一个组件演示</p>
        <button @click="handleClick">点击我</button>
    </div>
</template>
<script setup>
import { ref } from 'vue'
const count = ref(0)
const handleClick = () => {
  count.value++
  console.log('按钮被点击了，当前计数:', count.value)
}
</script>
```
[!component]