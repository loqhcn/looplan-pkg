<template>
  <div class="test-component" >
    <h1 class="test-title">Test Component</h1>
  </div>
</template>

<script setup >
import { computed } from 'vue'
import axios from 'axios'


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