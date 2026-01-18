<template>
  <div 
    class="looplan-text" 
    :class="{
      'text-disabled': disabled,
      'text-copyable': copyable
    }"
    @click="handleClick"
  >
    <span 
      :class="[
        sizeClass, 
        colorClass,
        {
          'text-bold': bold,
          'text-italic': italic,
          'text-underline': underline
        }
      ]"
    >
      {{ text }}
    </span>
    <button 
      v-if="copyable" 
      class="copy-btn"
      @click.stop="copyText"
      :title="'复制文本'"
    >
      📋
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { TextProps, TextEmits } from '../types'

const props = withDefaults(defineProps<TextProps>(), {
  text: 'Hello Looplan Text',
  size: 'medium',
  color: 'default',
  bold: false,
  italic: false,
  underline: false,
  copyable: false,
  disabled: false
})

const emit = defineEmits<TextEmits>()

const sizeClass = computed(() => `text-${props.size}`)
const colorClass = computed(() => props.color !== 'default' ? `color-${props.color}` : '')

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event)
  }
}

const copyText = async () => {
  try {
    await navigator.clipboard.writeText(props.text)
    emit('copy', props.text)
    console.log('文本已复制到剪贴板')
  } catch (err) {
    console.error('复制失败:', err)
  }
}

const handleChange = (value: string) => {
  emit('change', value)
}
</script>

<style scoped>
.looplan-text {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.looplan-text:hover:not(.text-disabled) {
  opacity: 0.8;
}

.text-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.text-copyable {
  border-radius: 4px;
  padding: 2px 4px;
}

.text-copyable:hover {
  background-color: #f5f5f5;
}

/* 尺寸 */
.text-small {
  font-size: 12px;
}

.text-medium {
  font-size: 14px;
}

.text-large {
  font-size: 18px;
}

/* 颜色 */
.color-primary {
  color: #007bff;
}

.color-success {
  color: #28a745;
}

.color-danger {
  color: #dc3545;
}

.color-warning {
  color: #ffc107;
}

.color-info {
  color: #17a2b8;
}

/* 样式 */
.text-bold {
  font-weight: bold;
}

.text-italic {
  font-style: italic;
}

.text-underline {
  text-decoration: underline;
}

/* 复制按钮 */
.copy-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 2px;
  border-radius: 2px;
  font-size: 12px;
  opacity: 0.6;
  transition: all 0.2s ease;
}

.copy-btn:hover {
  opacity: 1;
  background-color: #e9ecef;
}
</style>