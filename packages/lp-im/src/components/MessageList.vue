<template>
    <div class="lp-im-message-list" ref="listRef">
        <MsgItem v-for="item in messages" :key="item.id" :message="item" :users="users" :currentUserId="userId" />
    </div>
</template>
<script lang="ts" setup>
import { nextTick, ref, watch } from 'vue'
import MsgItem from './msg-item/MessageItem.vue'
import type { MessageItem, MessageUser } from '../types'

interface MessageListProps {
    messages: MessageItem[]
    users?: MessageUser[]
    userId?: string | number
}

const props = withDefaults(defineProps<MessageListProps>(), {
    messages: () => [],
    users: () => [],
    userId: undefined
});

const listRef = ref<HTMLElement | null>(null)

const scrollToBottom = async () => {
    await nextTick()
    if (listRef.value) {
        listRef.value.scrollTop = listRef.value.scrollHeight
    }
}

watch(
    () => props.messages.length,
    () => {
        scrollToBottom()
    },
    { immediate: true }
)
</script>
<script lang="ts">
export default {
    name: 'MessageList',
}
</script>
<style lang="scss">
.lp-im-message-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px;
    height: 100%;
    overflow-y: auto;
    background: #f5f6f8;
}
</style>
