<template>
  <div class="looplan-text" @click="handleClick">
    <span :class="[sizeClass, colorClass]">{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { TextProps, TextEmits } from '../types'

const props = withDefaults(defineProps<TextProps>(), {
  text: 'Hello Looplan Text',
  size: 'medium',
  color: 'default'
})

const emit = defineEmits<TextEmits>()

const sizeClass = computed(() => `text-${props.size}`)
const colorClass = computed(() => props.color ? `color-${props.color}` : '')

const handleClick = (event: MouseEvent) => {
  emit('click', event)
}

const handleChange = (value: string) => {
  emit('change', value)
}
</script>

<style scoped>
.looplan-text {
  font-family: Arial, sans-serif;
  cursor: pointer;
}

.text-small {
  font-size: 12px;
}

.text-medium {
  font-size: 14px;
}

.text-large {
  font-size: 18px;
}

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
</style>