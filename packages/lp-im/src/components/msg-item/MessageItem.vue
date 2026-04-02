<template>
    <div class="lp-im-message-item" :class="{ 'is-self': isSelf }">
        <div class="lp-im-message-item__meta">
            <div class="lp-im-message-item__avatar">
                <img v-if="avatarUrl" :src="avatarUrl" alt="avatar" />
                <div v-else class="lp-im-message-item__avatar-fallback">{{ avatarText }}</div>
            </div>
            <div class="lp-im-message-item__name">{{ displayName }}</div>
        </div>
        <div class="lp-im-message-item__content" :class="{ 'is-markdown': message.type === 'markdown' }">
            <TextMsg v-if="message.type === 'text'" :message="message" :isSelf="isSelf" />
            <ImgMsg v-else-if="message.type === 'img'" :message="message" :isSelf="isSelf" />
            <MarkdownMsg v-else-if="message.type === 'markdown'" :message="message" :isSelf="isSelf" />
        </div>
    </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import TextMsg from './TextMsg.vue'
import ImgMsg from './ImgMsg.vue'
import MarkdownMsg from './MarkdownMsg.vue'
import type { MessageItem, MessageUser } from '../../types'

const props = withDefaults(
    defineProps<{ message: MessageItem; users?: MessageUser[]; currentUserId?: string | number }>(),
    {
        users: () => [],
        currentUserId: undefined
    }
)

const isSelf = computed(() => props.currentUserId !== undefined && props.message.userId === props.currentUserId)
const matchedUser = computed(() => props.users.find(user => user.id === props.message.userId))
const displayName = computed(() => props.message.userName || matchedUser.value?.name || '未知用户')
const avatarUrl = computed(() => props.message.avatar || matchedUser.value?.avatar || '')
const avatarText = computed(() => {
    const name = displayName.value
    return name ? name.slice(0, 1) : ''
})
</script>
<script lang="ts">
export default {
    name: 'MessageItem',
}
</script>
<style lang="scss">
.lp-im-message-item {
    display: flex;
    gap: 8px;
    align-items: flex-start;
    flex-direction: column;
}

.lp-im-message-item.is-self {
    align-items: flex-end;
}

.lp-im-message-item__meta {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
}

.lp-im-message-item.is-self .lp-im-message-item__meta {
    justify-content: flex-end;
}

.lp-im-message-item__avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    overflow: hidden;
    background: #e5e7eb;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.lp-im-message-item__avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.lp-im-message-item__avatar-fallback {
    font-size: 12px;
    color: #374151;
}

.lp-im-message-item__name {
    font-size: 12px;
    color: #6b7280;
    text-align: left;
}

.lp-im-message-item.is-self .lp-im-message-item__name {
    text-align: right;
}

.lp-im-message-item__content {
    max-width: 100%;
}

.lp-im-message-item__content.is-markdown {
    width: 100%;
}
</style>
