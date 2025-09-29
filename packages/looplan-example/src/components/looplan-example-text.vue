<template>
  <div class="text-component">
    <div class="component-header">
      <h3>🔤 高级文本组件</h3>
      <span class="component-badge">Enhanced</span>
    </div>
    
    <p class="description">
      这是一个功能丰富的文本组件，展示了 Vue 3 + TypeScript 的高级用法。
      支持多种样式、交互功能和动态效果。
    </p>
    
    <div class="demo-area">
      <div class="controls-grid">
        <div class="control-group">
          <label>文本内容：</label>
          <input 
            v-model="currentText" 
            type="text" 
            placeholder="输入文本..."
            class="text-input"
            @input="handleTextChange"
          >
        </div>
        
        <div class="control-group">
          <label>尺寸：</label>
          <select v-model="currentSize" class="select-input">
            <option value="small">小</option>
            <option value="medium">中</option>
            <option value="large">大</option>
          </select>
        </div>
        
        <div class="control-group">
          <label>颜色：</label>
          <select v-model="currentColor" class="select-input">
            <option value="default">默认</option>
            <option value="primary">主色</option>
            <option value="success">成功</option>
            <option value="danger">危险</option>
            <option value="warning">警告</option>
            <option value="info">信息</option>
          </select>
        </div>
      </div>
      
      <div class="style-toggles">
        <label class="toggle-item">
          <input type="checkbox" v-model="isBold">
          <span>💪 粗体</span>
        </label>
        <label class="toggle-item">
          <input type="checkbox" v-model="isItalic">
          <span>🎨 斜体</span>
        </label>
        <label class="toggle-item">
          <input type="checkbox" v-model="hasUnderline">
          <span>🔗 下划线</span>
        </label>
        <label class="toggle-item">
          <input type="checkbox" v-model="isCopyable">
          <span>📋 可复制</span>
        </label>
        <label class="toggle-item">
          <input type="checkbox" v-model="isDisabled">
          <span>🚫 禁用</span>
        </label>
      </div>
      
      <div class="preview-section">
        <h4>预览效果：</h4>
        <div class="preview-container">
          <div 
            class="looplan-text" 
            :class="{
              'text-disabled': isDisabled,
              'text-copyable': isCopyable
            }"
            @click="handleClick"
          >
            <span 
              :class="[
                sizeClass, 
                colorClass,
                {
                  'text-bold': isBold,
                  'text-italic': isItalic,
                  'text-underline': hasUnderline
                }
              ]"
            >
              {{ currentText || '请输入文本...' }}
            </span>
            <button 
              v-if="isCopyable" 
              class="copy-btn"
              @click.stop="copyText"
              :title="'复制文本'"
            >
              📋
            </button>
          </div>
        </div>
      </div>
      
      <div class="actions-section">
        <button @click="generateSample" class="btn btn-primary">
          ✨ 生成示例
        </button>
        <button @click="resetAll" class="btn btn-secondary">
          🔄 重置
        </button>
        <button @click="exportConfig" class="btn btn-outline">
          📤 导出配置
        </button>
      </div>
      
      <div v-if="eventLog.length > 0" class="event-log">
        <h4>📈 事件日志：</h4>
        <div class="log-container">
          <div v-for="(log, index) in eventLog" :key="index" class="log-item">
            <span class="log-time">{{ log.time }}</span>
            <span class="log-event">{{ log.event }}</span>
          </div>
        </div>
      </div>
    </div>
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

// 响应式状态
const currentText = ref(props.text)
const currentSize = ref(props.size)
const currentColor = ref(props.color)
const isBold = ref(props.bold)
const isItalic = ref(props.italic)
const hasUnderline = ref(props.underline)
const isCopyable = ref(props.copyable)
const isDisabled = ref(props.disabled)
const eventLog = ref<{ time: string, event: string }[]>([])

const sizeClass = computed(() => `text-${currentSize.value}`)
const colorClass = computed(() => currentColor.value !== 'default' ? `color-${currentColor.value}` : '')

// 方法
const addLog = (event: string) => {
  eventLog.value.unshift({
    time: new Date().toLocaleTimeString(),
    event
  })
  if (eventLog.value.length > 5) {
    eventLog.value.pop()
  }
}

const handleClick = (event: MouseEvent) => {
  if (!isDisabled.value) {
    emit('click', event)
    addLog('🖡️ 文本被点击')
  }
}

const handleTextChange = () => {
  emit('change', currentText.value)
  addLog(`📝 文本变更: ${currentText.value}`)
}

const copyText = async () => {
  try {
    await navigator.clipboard.writeText(currentText.value)
    emit('copy', currentText.value)
    addLog(`📋 文本已复制: ${currentText.value}`)
    console.log('文本已复制到剪贴板')
  } catch (err) {
    console.error('复制失败:', err)
    addLog('❌ 复制失败')
  }
}

const generateSample = () => {
  const samples = [
    '🚀 这是一个很棒的组件！',
    '💎 TypeScript 让开发更安全',
    '⚡ Vite 构建速度超快',
    '🎨 Vue 3 Composition API 很强大',
    '📦 组件化开发提高效率',
    '🎆 现代化的前端开发体验',
    '🔥 热重载开发更高效'
  ]
  currentText.value = samples[Math.floor(Math.random() * samples.length)]
  addLog('✨ 生成了新的示例文本')
}

const resetAll = () => {
  currentText.value = props.text
  currentSize.value = props.size
  currentColor.value = props.color
  isBold.value = props.bold
  isItalic.value = props.italic
  hasUnderline.value = props.underline
  isCopyable.value = props.copyable
  isDisabled.value = props.disabled
  eventLog.value = []
  addLog('🔄 所有设置已重置')
}

const exportConfig = () => {
  const config = {
    text: currentText.value,
    size: currentSize.value,
    color: currentColor.value,
    bold: isBold.value,
    italic: isItalic.value,
    underline: hasUnderline.value,
    copyable: isCopyable.value,
    disabled: isDisabled.value
  }
  console.log('📤 组件配置:', config)
  addLog('📤 配置已导出到控制台')
}
</script>

<style scoped>
.text-component {
  padding: 24px;
  background: linear-gradient(135deg, #f8faff 0%, #e8f4f8 100%);
  border-radius: 16px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.component-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid #e2e8f0;
}

.component-header h3 {
  margin: 0;
  color: #2d3748;
  font-weight: 600;
  font-size: 1.3rem;
}

.component-badge {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 0.5px;
}

.description {
  color: #4a5568;
  margin: 0 0 24px 0;
  line-height: 1.6;
  font-size: 14px;
}

.demo-area {
  background: white;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.controls-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.control-group label {
  font-weight: 500;
  color: #2d3748;
  font-size: 14px;
}

.text-input, .select-input {
  padding: 8px 12px;
  border: 1px solid #cbd5e0;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.2s ease;
  background: white;
}

.text-input:focus, .select-input:focus {
  outline: none;
  border-color: #3182ce;
  box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
}

.style-toggles {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.toggle-item {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 8px;
  transition: background-color 0.2s ease;
  font-size: 14px;
  color: #4a5568;
}

.toggle-item:hover {
  background-color: #f7fafc;
}

.toggle-item input[type="checkbox"] {
  margin: 0;
}

.preview-section {
  margin-bottom: 20px;
}

.preview-section h4 {
  margin: 0 0 12px 0;
  color: #2d3748;
  font-size: 16px;
  font-weight: 500;
}

.preview-container {
  background: #f7fafc;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.looplan-text {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 8px 12px;
  border-radius: 6px;
}

.looplan-text:hover:not(.text-disabled) {
  background-color: rgba(49, 130, 206, 0.1);
  transform: translateY(-1px);
}

.text-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.text-copyable {
  background-color: rgba(0, 0, 0, 0.02);
  border: 1px dashed #cbd5e0;
}

.text-copyable:hover {
  background-color: rgba(49, 130, 206, 0.05);
  border-color: #3182ce;
}

/* 尺寸样式 */
.text-small {
  font-size: 12px;
}

.text-medium {
  font-size: 16px;
}

.text-large {
  font-size: 20px;
}

/* 颜色样式 */
.color-primary {
  color: #3182ce;
}

.color-success {
  color: #38a169;
}

.color-danger {
  color: #e53e3e;
}

.color-warning {
  color: #dd6b20;
}

.color-info {
  color: #319795;
}

/* 样式修饰 */
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
  background: rgba(49, 130, 206, 0.1);
  border: 1px solid rgba(49, 130, 206, 0.2);
  border-radius: 4px;
  cursor: pointer;
  padding: 4px 6px;
  font-size: 12px;
  opacity: 0.7;
  transition: all 0.2s ease;
}

.copy-btn:hover {
  opacity: 1;
  background-color: rgba(49, 130, 206, 0.2);
  transform: scale(1.05);
}

.actions-section {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.btn {
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;
}

.btn-primary {
  background: linear-gradient(135deg, #3182ce 0%, #2c5aa0 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(49, 130, 206, 0.3);
}

.btn-secondary {
  background: #e2e8f0;
  color: #4a5568;
}

.btn-secondary:hover {
  background: #cbd5e0;
  transform: translateY(-1px);
}

.btn-outline {
  background: transparent;
  border: 1px solid #cbd5e0;
  color: #4a5568;
}

.btn-outline:hover {
  background: #f7fafc;
  border-color: #a0aec0;
  transform: translateY(-1px);
}

.event-log {
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;
}

.event-log h4 {
  margin: 0 0 12px 0;
  color: #2d3748;
  font-size: 14px;
  font-weight: 500;
}

.log-container {
  max-height: 120px;
  overflow-y: auto;
}

.log-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  border-bottom: 1px solid #e2e8f0;
  font-size: 12px;
}

.log-item:last-child {
  border-bottom: none;
}

.log-time {
  color: #718096;
  font-family: monospace;
  min-width: 80px;
}

.log-event {
  color: #2d3748;
  flex: 1;
  margin-left: 12px;
}
</style>