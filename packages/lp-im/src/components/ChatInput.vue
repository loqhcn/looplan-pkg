<template>
    <div class="lp-im-chat-input">
        <input
            v-model="inputValue"
            class="lp-im-chat-input__field"
            type="text"
            placeholder="输入消息..."
            @keyup.enter="handleSend"
        />
        <button class="lp-im-chat-input__button" :disabled="!inputValue.trim()" @click="handleSend">
            发送
        </button>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { MessageItem } from '../types'

const props = withDefaults(
    defineProps<{ userId?: string | number; userName?: string; avatar?: string }>(),
    {
        userId: 0,
        userName: '',
        avatar: ''
    }
)
const emit = defineEmits<{ (e: 'send', item: MessageItem): void }>()
const inputValue = ref('')

const handleSend = () => {
    const content = inputValue.value.trim()
    if (!content) return
    const message: MessageItem = {
        id: Date.now(),
        type: 'text',
        content,
        time: new Date().toLocaleString(),
        userId: props.userId
    }
    if (props.userName) {
        message.userName = props.userName
    }
    if (props.avatar) {
        message.avatar = props.avatar
    }
    emit('send', message)
    inputValue.value = ''
}
</script>
<script lang="ts">
export default {
    name: 'ChatInput',
}
</script>
<style lang="scss">
.lp-im-chat-input {
    display: flex;
    gap: 8px;
    padding: 12px;
    background: #ffffff;
    border-top: 1px solid #e5e7eb;
}

.lp-im-chat-input__field {
    flex: 1;
    height: 36px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 0 12px;
    font-size: 14px;
    outline: none;
}

.lp-im-chat-input__field:focus {
    border-color: #3b82f6;
}

.lp-im-chat-input__button {
    height: 36px;
    padding: 0 16px;
    border: none;
    border-radius: 8px;
    background: #3b82f6;
    color: #ffffff;
    font-size: 14px;
    cursor: pointer;
}

.lp-im-chat-input__button:disabled {
    background: #9ca3af;
    cursor: not-allowed;
}
</style>
