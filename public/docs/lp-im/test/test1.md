test1

# 消息列表

[component]{
@render
```vue
<template>
    <lp-component is="lp-container@MobileContainer">
        <lp-component is="lp-im@MessageList" :messages="messages" />
        <lp-component is="lp-im@ChatInput" @send="sendMessage" />
    </lp-component>
</template>
<script>
export default {
    data() {
        return {
            messages: [
                {
                    id: 1,
                    content: '你好'
                },
                {
                    id: 2,
                    content: '你好，我是用户'
                }
            ]
        }
    },
    mounted() {
       console.log('组件挂载完成')
       
    },
    methods: {
        sendMessage(item) {
            this.messages.push(item)
        }
    },
    setup() {
       
    }
}
</script>
```
}


