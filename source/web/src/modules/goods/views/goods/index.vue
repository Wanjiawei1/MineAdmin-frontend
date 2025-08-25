<script setup>
import { ref } from 'vue'

console.log('🔥 商品管理页面开始加载...')

const testData = ref([
  { id: 1, name: 'edfaed', price: '111.00', status: 1 }
])

console.log('🔥 组件数据准备完成:', testData.value)
</script>

<template>
  <div class="mine-layout pt-3">
    <h1 style="color: red; font-size: 24px;">🔥 这里是商品管理页面测试 🔥</h1>
    
    <div style="margin: 20px 0; padding: 20px; border: 2px solid red;">
      <h2>路由测试信息</h2>
      <p>当前路径: {{ $route.path }}</p>
      <p>路由名称: {{ $route.name }}</p>
      <p>页面加载时间: {{ new Date().toLocaleString() }}</p>
    </div>

    <div style="margin: 20px 0; padding: 20px; border: 2px solid blue;">
      <h2>测试数据</h2>
      <ul>
        <li v-for="item in testData" :key="item.id">
          ID: {{ item.id }}, 名称: {{ item.name }}, 价格: {{ item.price }}
        </li>
      </ul>
    </div>

    <div style="margin: 20px 0;">
      <el-button type="primary" size="large">测试按钮</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
