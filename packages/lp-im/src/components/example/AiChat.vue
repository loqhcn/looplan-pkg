<template>
    <div class="lp-im-ai-chat">
        <MessageList :messages="messageList" :users="users" :userId="currentUserId" />
        <div v-if="thinkingText" class="lp-im-ai-chat__thinking">{{ thinkingText }}</div>
        <ChatInput
            :userId="currentUserId"
            :userName="currentUserName"
            :avatar="currentUserAvatar"
            @send="handleSend"
        />
    </div>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'
import MessageList from '../MessageList.vue'
import ChatInput from '../ChatInput.vue'
import type { MessageItem, MessageUser } from '../../types'

interface AiChatItem {
    role: 'user' | 'assistant' | 'system'
    content: string
}

interface AiChatProps {
    api: string
    data?: Record<string, any>
    context?: AiChatItem[]
    messages?: AiChatItem[]
}

const props = withDefaults(defineProps<AiChatProps>(), {
    api: 'http://localhost:9000/AiTest.chat',
    data: () => ({}),
    context: () => [],
    messages: () => []
})

const currentUserId = 1
const assistantUserId = 2
const currentUserName = '我'
const currentUserAvatar = ''
const users = ref<MessageUser[]>([
    {
        id: currentUserId,
        name: currentUserName
    },
    {
        id: assistantUserId,
        name: 'AI'
    }
])
const messageList = ref<MessageItem[]>([])
const aiMessages = ref<AiChatItem[]>([])
const isLoading = ref(false)
const thinkingText = ref('')
const errorText = ref('')

const syncFromProps = (value: AiChatItem[]) => {
    aiMessages.value = [...value]
    messageList.value = value.map((item, index) => ({
        id: `${Date.now()}-${index}`,
        type: item.role === 'assistant' ? 'markdown' : 'text',
        content: item.content,
        userId: item.role === 'user' ? currentUserId : assistantUserId
    }))
}

syncFromProps(props.messages)

watch(
    () => props.messages,
    value => {
        syncFromProps(value)
    }
)

const appendAssistantText = (aiIndex: number, listIndex: number, content: string) => {
    aiMessages.value[aiIndex].content += content
    messageList.value[listIndex].content += content
}

const parsePayload = (text: string) => {
    try {
        return JSON.parse(text)
    } catch {
        return null
    }
}

const handleStreamLine = (
    line: string,
    assistantAiIndex: number,
    assistantListIndex: number,
    resContent: { value: string }
) => {
    const trimmed = line.trim()
    if (!trimmed) return
    if (trimmed.startsWith('say:')) {
        const payload = parsePayload(trimmed.slice(4))
        if (payload?.content) {
            appendAssistantText(assistantAiIndex, assistantListIndex, payload.content)
        }
        return
    }
    if (trimmed.startsWith('think:')) {
        const payload = parsePayload(trimmed.slice(6))
        if (payload?.content) {
            thinkingText.value += payload.content
        }
        return
    }
    if (trimmed.startsWith('data:')) {
        return
    }
    if (trimmed.startsWith('res:')) {
        const payload = parsePayload(trimmed.slice(4))
        if (payload?.data?.content) {
            resContent.value += payload.data.content
        }
    }
}

const streamResponse = async (payloadMessages: AiChatItem[], assistantAiIndex: number, assistantListIndex: number) => {
    const response = await fetch(props.api, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            messages: payloadMessages,
            ...props.data
        })
    })
    if (!response.ok) {
        throw new Error(`请求失败: ${response.status}`)
    }
    const resContent = { value: '' }
    if (!response.body) {
        const text = await response.text()
        const lines = text.split('\n')
        for (const line of lines) {
            handleStreamLine(line, assistantAiIndex, assistantListIndex, resContent)
        }
        if (!messageList.value[assistantListIndex].content && resContent.value) {
            messageList.value[assistantListIndex].content = resContent.value
            aiMessages.value[assistantAiIndex].content = resContent.value
        }
        return
    }
    const reader = response.body.getReader()
    const decoder = new TextDecoder('utf-8')
    let buffer = ''
    while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const parts = buffer.split('\n')
        buffer = parts.pop() || ''
        for (const line of parts) {
            handleStreamLine(line, assistantAiIndex, assistantListIndex, resContent)
        }
    }
    if (buffer) {
        handleStreamLine(buffer, assistantAiIndex, assistantListIndex, resContent)
    }
    if (!messageList.value[assistantListIndex].content && resContent.value) {
        messageList.value[assistantListIndex].content = resContent.value
        aiMessages.value[assistantAiIndex].content = resContent.value
    }
}

const handleSend = async (item: MessageItem) => {
    if (isLoading.value) return
    const userMessage: AiChatItem = { role: 'user', content: item.content }
    aiMessages.value.push(userMessage)
    messageList.value.push(item)
    const payloadMessages = [...props.context, ...aiMessages.value]
    const assistantMessage: AiChatItem = { role: 'assistant', content: '' }
    aiMessages.value.push(assistantMessage)
    const assistantAiIndex = aiMessages.value.length - 1
    const assistantListMessage: MessageItem = {
        id: Date.now(),
        type: 'markdown',
        content: '',
        time: new Date().toLocaleString(),
        userId: assistantUserId
    }
    messageList.value.push(assistantListMessage)
    const assistantListIndex = messageList.value.length - 1
    isLoading.value = true
    thinkingText.value = ''
    errorText.value = ''
    try {
        await streamResponse(payloadMessages, assistantAiIndex, assistantListIndex)
    } catch (error) {
        errorText.value = error instanceof Error ? error.message : '请求失败'
        messageList.value[assistantListIndex].content =
            messageList.value[assistantListIndex].content || errorText.value
        aiMessages.value[assistantAiIndex].content = aiMessages.value[assistantAiIndex].content || errorText.value
    } finally {
        isLoading.value = false
    }
}
</script>
<script lang="ts">
export default {
    name: 'AiChat',
}
</script>
<style lang="scss">
.lp-im-ai-chat {
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #f5f6f8;
}

.lp-im-ai-chat__thinking {
    font-size: 12px;
    color: #9ca3af;
    padding: 0 16px 8px;
}
</style>
