<template>
    <div class="lp-im-msg-content" :class="{ 'is-self': isSelf }">
        <div class="lp-im-msg-bubble lp-im-msg-markdown" :class="{ 'is-self': isSelf }">
            <DocView :content="message.content" />
        </div>
        <div v-if="message.time" class="lp-im-msg-time">{{ message.time }}</div>
    </div>
</template>
<script lang="ts" setup>
import { DocView } from 'looplan-doc'
import type { MessageItem } from '../../types'

withDefaults(defineProps<{ message: MessageItem; isSelf?: boolean }>(), {
    message: () => ({
        id: '',
        type: 'markdown',
        content: '',
        userId: ''
    })
})
</script>
<script lang="ts">
export default {
    name: 'vbase-ts',
}
</script>
<style lang="scss">
.lp-im-msg-content {
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: flex-start;
}

.lp-im-msg-content.is-self {
    align-items: flex-end;
}

.lp-im-msg-bubble {
    max-width: 70%;
    padding: 10px 12px;
    border-radius: 12px;
    background: #ffffff;
    color: #1f2937;
    font-size: 14px;
    line-height: 1.4;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.lp-im-msg-markdown {
    max-width: 100%;
    width: 100%;
}

.lp-im-msg-bubble.is-self {
    background: #3b82f6;
    color: #ffffff;
}

.lp-im-msg-time {
    font-size: 11px;
    color: #9ca3af;
}
</style>
