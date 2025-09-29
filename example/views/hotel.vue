<template>
  <div class="hotel-demo">
    <h1>酒店管理系统演示</h1>
    <HotelManagement />
  </div>
</template>

<script setup lang="ts">
import { HotelManagement } from '../../src/index'
</script>

<style >
.hotel-demo {
  padding: 10px;
}

.hotel-demo h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}
</style>