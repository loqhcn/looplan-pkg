<template>
  <div class="test-component" :class="[variantClass, { 'animated': animated }]">
    <div class="component-header">
      <h2 v-if="title" class="test-title" :class="sizeClass">{{ title }}</h2>
      <div class="header-actions">
        <span class="tech-badge">TS</span>
        <span class="version-badge">v2.0</span>
      </div>
    </div>
    
    <div class="component-content">
      <slot></slot>
      
      <div class="feature-showcase">
        <h3>🎯 TypeScript 特性演示</h3>
        <div class="features-grid">
          <div class="feature-card">
            <h4>🔍 类型安全</h4>
            <p>完整的 TypeScript 类型支持，编译时错误检查</p>
          </div>
          <div class="feature-card">
            <h4>📦 Vite 构建</h4>
            <p>使用自定义 Vite 配置进行优化构建</p>
          </div>
          <div class="feature-card">
            <h4>⚡ 热重载</h4>
            <p>开发时快速热重载，提升开发体验</p>
          </div>
        </div>
      </div>
      
      <div v-if="showStats" class="stats-panel">
        <h3>📊 运行时统计</h3>
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-label">点击次数:</span>
            <span class="stat-value">{{ clickCount }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">组件状态:</span>
            <span class="stat-value">{{ componentStatus }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">最后更新:</span>
            <span class="stat-value">{{ lastUpdate }}</span>
          </div>
        </div>
      </div>
      
      <div class="button-group">
        <button 
          class="test-button primary"
          :class="[sizeClass, { 'disabled': disabled }]"
          :disabled="disabled"
          @click="handleClick"
        >
          🚀 测试 TypeScript
        </button>
        <button 
          class="test-button secondary"
          :class="[sizeClass, { 'disabled': disabled }]"
          :disabled="disabled"
          @click="handleStatsToggle"
        >
          📊 {{ showStats ? '隐藏' : '显示' }}统计
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import type { TestProps, TestEmits } from '../types'
import axios from 'axios'

const props = withDefaults(defineProps<TestProps>(), {
  title: 'TypeScript 测试组件',
  variant: 'primary',
  size: 'medium',
  disabled: false,
  showStats: false,
  animated: true
})

const emit = defineEmits<TestEmits>()

// 响应式状态
const clickCount = ref(0)
const componentStatus = ref('active')
const lastUpdate = ref('')

const variantClass = computed(() => `variant-${props.variant}`)
const sizeClass = computed(() => `size-${props.size}`)

// 组件挂载时初始化
onMounted(() => {
  lastUpdate.value = new Date().toLocaleTimeString()
  componentStatus.value = 'ready'
})

const handleClick = () => {
  if (!props.disabled) {
    clickCount.value++
    lastUpdate.value = new Date().toLocaleTimeString()
    componentStatus.value = 'active'
    
    emit('click', '🚀 TypeScript 按钮被点击')
    emit('change', `状态变更: ${lastUpdate.value}`)
    emit('stats', { type: 'click', value: clickCount.value })
    
    // 模拟 API 调用
    axios.post('http://localhost:9002/test-func1').then(res => {
      console.log('TypeScript 组件 API 响应:', res.data)
    }).catch(err => {
      console.warn('API 调用失败:', err.message)
    })
  }
}

const handleStatsToggle = () => {
  if (!props.disabled) {
    const newShowStats = !props.showStats
    emit('change', `统计面板${newShowStats ? '显示' : '隐藏'}`)
    emit('stats', { type: 'toggle', value: newShowStats })
  }
}
</script>

<style scoped>
.test-component {
  padding: 24px;
  border-radius: 12px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.test-component.animated {
  animation: slideInUp 0.6s ease-out;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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

.variant-gradient {
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4);
  background-size: 400% 400%;
  animation: gradientShift 4s ease infinite;
  color: white;
}

.variant-glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #333;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.component-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.test-title {
  margin: 0;
  font-weight: 600;
}

.header-actions {
  display: flex;
  gap: 8px;
}

.tech-badge, .version-badge {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: bold;
  letter-spacing: 1px;
}

.version-badge {
  background: rgba(0, 255, 0, 0.2);
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

.component-content {
  margin-bottom: 16px;
}

.feature-showcase {
  margin: 20px 0;
}

.feature-showcase h3 {
  margin: 0 0 16px 0;
  font-size: 1.1rem;
  font-weight: 500;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.feature-card {
  background: rgba(255, 255, 255, 0.1);
  padding: 12px;
  border-radius: 8px;
  backdrop-filter: blur(5px);
}

.feature-card h4 {
  margin: 0 0 8px 0;
  font-size: 0.9rem;
  font-weight: 600;
}

.feature-card p {
  margin: 0;
  font-size: 0.8rem;
  opacity: 0.9;
  line-height: 1.4;
}

.stats-panel {
  background: rgba(255, 255, 255, 0.1);
  padding: 16px;
  border-radius: 8px;
  margin: 16px 0;
  backdrop-filter: blur(5px);
}

.stats-panel h3 {
  margin: 0 0 12px 0;
  font-size: 1rem;
  font-weight: 500;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  text-align: center;
}

.stat-label {
  font-size: 0.8rem;
  opacity: 0.8;
  margin-bottom: 4px;
}

.stat-value {
  font-size: 1.1rem;
  font-weight: bold;
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 8px;
  border-radius: 4px;
}

.button-group {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 20px;
}

.test-button {
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
}

.test-button.primary {
  background: rgba(255, 255, 255, 0.9);
  color: #1f2937;
}

.test-button.secondary {
  background: rgba(255, 255, 255, 0.1);
  color: currentColor;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.test-button:hover:not(.disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.test-button.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>