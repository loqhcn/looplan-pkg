<template>
  <div class="test-component" :class="variantClass">
    <h2 v-if="title" class="test-title" :class="sizeClass">{{ title }}</h2>
    <slot></slot>
    <button 
      class="test-button"
      :class="[sizeClass, { 'disabled': disabled }]"
      :disabled="disabled"
      @click="handleClick"
    >
      测试按钮
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { TestProps, TestEmits } from '../types'
import axios from 'axios'


const props = withDefaults(defineProps<TestProps>(), {
  title: '测试组件',
  variant: 'primary',
  size: 'medium',
  disabled: false
})

const emit = defineEmits<TestEmits>()

const variantClass = computed(() => `variant-${props.variant}`)
const sizeClass = computed(() => `size-${props.size}`)

const handleClick = () => {
  if (!props.disabled) {
    emit('click', '按钮被点击')
    emit('change', `状态变更: ${new Date().toLocaleTimeString()}`)
    axios.post('http://localhost:9002/test-func1').then(res => {
      console.log(res.data)
    })
  }
}
</script>

<style scoped>
.test-component {
  padding: 20px;
  border-radius: 8px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.variant-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.variant-secondary {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.variant-outline {
  background: white;
  border: 2px solid #667eea;
  color: #667eea;
}

.test-title {
  margin: 0 0 16px 0;
  font-weight: 600;
}

.size-small {
  font-size: 14px;
}

.size-medium {
  font-size: 16px;
}

.size-large {
  font-size: 18px;
}

.test-button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.2);
  color: currentColor;
  cursor: pointer;
  transition: all 0.2s ease;
}

.test-button:hover:not(.disabled) {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
}

.test-button.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>