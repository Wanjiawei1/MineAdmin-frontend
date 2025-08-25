<script setup lang="tsx">
import { ref } from 'vue'
import type { MaProTableOptions, MaProTableSchema } from '@mineadmin/pro-table'
import { page } from '@/modules/goods/api/goods'

console.log('🔥 商品管理页面开始加载...')

const testData = ref([
  { id: 1, name: 'edfaed', price: '111.00', status: 1 }
])

// 正确的 MaProTable 配置（添加类型定义）
const options = ref<MaProTableOptions>({
  requestOptions: {
    api: page,
    beforeRequest: (params: any) => {
      console.log('📤 发起API请求，参数:', params)
      return params
    },
    afterRequest: (res: any) => {
      console.log('📥 API响应成功:', res)
      console.log('📊 数据列表:', res.data?.list)
      return res
    },
    onError: (error: any) => {
      console.error('❌ API请求失败:', error)
    },
  },
})

const schema = ref<MaProTableSchema>({
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

// 手动测试API（确保API本身工作正常）
setTimeout(async () => {
  try {
    console.log('🧪 手动测试API...')
    const result = await page({ page: 1, page_size: 10 })
    console.log('✅ 手动API测试成功:', result)
  } catch (error) {
    console.error('❌ 手动API测试失败:', error)
  }
}, 2000)
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
