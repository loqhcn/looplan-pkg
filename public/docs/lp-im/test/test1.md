test1

# 消息列表

[component]{
@render
```vue
<template>
    <lp-component is="lp-container@MobileContainer">
        <div class="message-list" style="flex: 1;overflow: auto;height:0;overflow: hidden;">
            <lp-component is="lp-im@MessageList" :messages="messages" :users="users" :userId="uid" />
        </div>
        <lp-component
            is="lp-im@ChatInput"
            :userId="uid"
            :userName="users.find(user => user.id === uid)?.name"
            @send="sendMessage"
        />
    </lp-component>
</template>
<script>
export default {
    data() {
        return {
            uid: 1, // 当前用户ID
            users: [
                {
                    id: 1,
                    name: '用户1'
                },
                {
                    id: 2,
                    name: '用户2'
                }
            ],
            messages: [
                {
                    id: 1,
                    type: 'text',
                    content: '你好',
                    time: '2023-08-15 10:00:00',
                    userId: 2
                },
                {
                    id: 2,
                    type: 'text',
                    content: '你好，我是用户',
                    time: '2023-08-15 10:00:01',
                    userId: 1
                },
                {
                    id: 3,
                    type: 'img',
                    content: 'https://img.looplan.com/2023/08/15/1692085322000.png',
                    time: '2023-08-15 10:00:02',
                    userId: 2
                },
                {
                    id: 4,
                    type: 'markdown',
                    content: `
# 这是一个标题
这是一个段落。

## 这是一个二级标题
这是一个段落。
`,
                    time: '2023-08-15 10:00:03',
                    userId: 1
                },
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


