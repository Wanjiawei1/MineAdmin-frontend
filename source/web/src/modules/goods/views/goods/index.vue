<script setup>
import { ref } from 'vue'
import { page } from '@/modules/goods/api/goods'

console.log('🔥 商品管理页面开始加载...')

const testData = ref([
  { id: 1, name: 'edfaed', price: '111.00', status: 1 }
])

// 最简单的 MaProTable 配置
const options = ref({
  requestOptions: {
    api: page,
    beforeRequest: (params) => {
      console.log('📤 发起API请求，参数:', params)
      return params
    },
    afterRequest: (res) => {
      console.log('📥 API响应成功:', res)
      console.log('📊 数据列表:', res.data?.list)
      return res
    },
    onError: (error) => {
      console.error('❌ API请求失败:', error)
    },
  },
})

const schema = ref({
  tableColumns: [
    {
      label: '商品名称',
      dataIndex: 'name',
    },
    {
      label: '商品价格', 
      dataIndex: 'price',
    }
  ],
})

console.log('🔥 组件数据准备完成:', testData.value)
console.log('🔥 MaProTable配置已准备:', { options: options.value, schema: schema.value })
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
      <h2>MaProTable 测试</h2>
      <MaProTable :options="options" :schema="schema" />
    </div>

    <div style="margin: 20px 0;">
      <el-button type="primary" size="large">测试按钮</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
