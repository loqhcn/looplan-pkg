# 云组件

looplan包主要负责云组件的加载

## lp-component加载云组件


- 加载规则是`包名@组件名`

```vue

<template>
  <div>
    <lp-component is="LooplanAppDemo@Demo1"></lp-component>
  </div>
</template>

```


## 导入异步组件方式加载


```vue
<template>
  <div>
    <div class="text h1">
      Home
    </div>

    <lp-component is="LooplanAppDemo@Demo1"></lp-component>

    <button @click="openDemo1Dialog">打开Demo1弹窗</button>

  </div>
</template>

<script setup lang="ts">
import { registerPackage, loadComponent } from 'looplan';



</script>


```