<template>
  <div class="js-component" :class="variantClass">
    <div class="component-header">
      <h2 class="component-title">📦 JavaScript 组件示例</h2>
      <span class="component-badge">JS</span>
    </div>
    
    <div class="component-content">
      <p class="component-description">
        这是一个使用 JavaScript (非 TypeScript) 开发的 Vue 3 组件示例。
        它展示了如何在不使用 TypeScript 的情况下创建功能完整的组件。
      </p>
      
      <div class="feature-list">
        <h3>✨ 特性展示</h3>
        <ul>
          <li>📝 响应式状态管理</li>
          <li>🎨 多种视觉主题</li>
          <li>⚡ 事件处理</li>
          <li>🔄 动态样式切换</li>
          <li>📊 计数器功能</li>
        </ul>
      </div>
      
      <div class="interactive-demo">
        <h3>🎮 交互演示</h3>
        <div class="counter-section">
          <span class="counter-label">计数器: </span>
          <span class="counter-value">{{ count }}</span>
          <div class="counter-controls">
            <button @click="increment" class="btn btn-primary">+1</button>
            <button @click="decrement" class="btn btn-secondary">-1</button>
            <button @click="reset" class="btn btn-outline">重置</button>
          </div>
        </div>
        
        <div class="theme-section">
          <span class="theme-label">主题切换: </span>
          <div class="theme-controls">
            <button 
              v-for="theme in themes" 
              :key="theme.name"
              @click="switchTheme(theme.name)"
              :class="['theme-btn', { active: currentTheme === theme.name }]"
              :style="{ backgroundColor: theme.color }"
            >
              {{ theme.name }}
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="component-footer">
      <small>⚡ 由 Vite + Vue 3 强力驱动</small>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 响应式状态
const count = ref(0)
const currentTheme = ref('blue')

// 主题配置
const themes = [
  { name: 'blue', color: '#3b82f6' },
  { name: 'green', color: '#10b981' },
  { name: 'purple', color: '#8b5cf6' },
  { name: 'pink', color: '#ec4899' }
]

// 计算属性
const variantClass = computed(() => `theme-${currentTheme.value}`)

// 方法
const increment = () => {
  count.value++
  console.log('计数器增加:', count.value)
}

const decrement = () => {
  count.value--
  console.log('计数器减少:', count.value)
}

const reset = () => {
  count.value = 0
  console.log('计数器重置')
}

const switchTheme = (themeName) => {
  currentTheme.value = themeName
  console.log('切换主题:', themeName)
}
</script>

<style scoped>
.js-component {
  padding: 24px;
  border-radius: 12px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.theme-blue {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
}

.theme-green {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.theme-purple {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
}

.theme-pink {
  background: linear-gradient(135deg, #ec4899 0%, #db2777 100%);
}

.component-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.component-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.component-badge {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 1px;
}

.component-content {
  margin-bottom: 24px;
}

.component-description {
  line-height: 1.6;
  margin-bottom: 20px;
  opacity: 0.9;
}

.feature-list h3,
.interactive-demo h3 {
  margin: 16px 0 12px 0;
  font-size: 1.1rem;
  font-weight: 500;
}

.feature-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-list li {
  padding: 4px 0;
  opacity: 0.9;
}

.interactive-demo {
  background: rgba(255, 255, 255, 0.1);
  padding: 16px;
  border-radius: 8px;
  margin-top: 16px;
}

.counter-section,
.theme-section {
  margin: 16px 0;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.counter-label,
.theme-label {
  font-weight: 500;
  min-width: 80px;
}

.counter-value {
  font-size: 1.2rem;
  font-weight: bold;
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 12px;
  border-radius: 6px;
  min-width: 40px;
  text-align: center;
}

.counter-controls,
.theme-controls {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.btn {
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.btn-primary {
  background: rgba(255, 255, 255, 0.9);
  color: #1f2937;
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.7);
  color: #1f2937;
}

.btn-outline {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.5);
  color: white;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.theme-btn {
  width: 60px;
  height: 30px;
  border: 2px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: white;
  font-size: 12px;
  font-weight: bold;
}

.theme-btn.active {
  border-color: rgba(255, 255, 255, 0.8);
  transform: scale(1.05);
}

.theme-btn:hover {
  transform: scale(1.1);
}

.component-footer {
  text-align: center;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  opacity: 0.7;
}
</style>