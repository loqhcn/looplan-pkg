# AI聊天测试


[component]{
@render
```vue
<template>
    <lp-component is="lp-container@MobileContainer">
        <lp-component is="lp-im@AiChat" :api="apiUrl" />
    </lp-component>
</template>
<script>
export default {
    data() {
        return {
            apiUrl: 'http://localhost:9000/AiTest.chat',
        }
    },
    mounted() {
       console.log('组件挂载完成')
    },
    methods: {
       
    },
    setup() {
       
    }
}
</script>
```
}

