<script setup lang="tsx">
import { ref } from 'vue'
import type { MaProTableExpose, MaProTableOptions, MaProTableSchema } from '@mineadmin/pro-table'
import type { Ref } from 'vue'
import { page } from '@/modules/goods/api/goods'

console.log('🔥 商品管理页面开始加载...')

const testData = ref([
  { id: 1, name: 'edfaed', price: '111.00', status: 1 }
])

// 创建一个响应式的数据，用于验证数据绑定
const staticData = ref([
  {
    id: 1,
    name: 'edfaed',
    price: '111.00',
    status: 1,
    created_at: '2025-08-25 02:01:06'
  },
  {
    id: 2, 
    name: '测试商品2',
    price: '299.99',
    status: 2,
    created_at: '2025-08-25 03:15:22'
  }
])

// 添加表格引用
const proTableRef = ref<MaProTableExpose>() as Ref<MaProTableExpose>

// 完整的 MaProTable 配置（参考用户管理页面）
const options = ref<MaProTableOptions>({
  // 表格距离底部的像素偏移适配
  adaptionOffsetBottom: 161,
  header: {
    mainTitle: () => '商品管理',
    subTitle: () => '管理所有商品信息',
  },
  // 表格参数
  tableOptions: {
    on: {
      // 表格选择事件
      onSelectionChange: (selection: any[]) => console.log('选择变化:', selection),
    },
  },
  // 搜索参数
  searchOptions: {
    fold: true,
    text: {
      searchBtn: () => '搜索',
      resetBtn: () => '重置',
      isFoldBtn: () => '展开',
      notFoldBtn: () => '收起',
    },
  },
  // 搜索表单参数
  searchFormOptions: { labelWidth: '90px' },
  // 请求配置 - 添加数据路径配置
  requestOptions: {
    api: () => {
      console.log('🎯 使用静态数据API')
      const result = {
        code: 200,
        message: '成功',
        data: {
          list: [
            {
              id: 1,
              name: 'edfaed',
              price: '111.00',
              status: 1,
              created_at: '2025-08-25 02:01:06'
            },
            {
              id: 2, 
              name: '测试商品2',
              price: '299.99',
              status: 2,
              created_at: '2025-08-25 03:15:22'
            }
          ],
          total: 2
        }
      }
      console.log('🎯 API返回数据:', result)
      return Promise.resolve(result)
    },
    // 指定数据路径
    dataPath: 'data.list',
    totalPath: 'data.total', 
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
  // 搜索项（空数组，但必须有）
  searchItems: [],
  // 表格列
  tableColumns: [
    {
      label: 'ID',
      dataIndex: 'id',
      width: 80,
    },
    {
      label: '商品名称',
      dataIndex: 'name',
    },
    {
      label: '商品价格', 
      dataIndex: 'price',
    },
    {
      label: '状态',
      dataIndex: 'status',
    },
    {
      label: '创建时间',
      dataIndex: 'created_at',
    }
  ],
})

console.log('🔥 组件数据准备完成:', testData.value)
console.log('🔥 MaProTable配置已准备:', { options: options.value, schema: schema.value })

// 手动测试API和表格刷新
setTimeout(async () => {
  try {
    console.log('🧪 手动测试API...')
    const result = await page({ page: 1, page_size: 10 })
    console.log('✅ 手动API测试成功:', result)
    
    // 尝试手动刷新表格
    if (proTableRef.value && proTableRef.value.refresh) {
      console.log('🔄 尝试手动刷新表格...')
      await proTableRef.value.refresh()
      console.log('✅ 表格刷新完成')
    } else {
      console.log('❌ 表格引用未找到或没有refresh方法')
    }
  } catch (error) {
    console.error('❌ 测试失败:', error)
  }
}, 3000)
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
      <MaProTable ref="proTableRef" :options="options" :schema="schema" />
    </div>

    <div style="margin: 20px 0; border: 2px solid green; padding: 20px;">
      <h2>原生 Element Plus 表格测试（相同数据）</h2>
      <el-table :data="staticData" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="商品名称" />
        <el-table-column prop="price" label="商品价格" />
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            {{ row.status === 1 ? '已上架' : '未上架' }}
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="创建时间" />
      </el-table>
      <p style="margin-top: 10px;">如果这个表格能显示数据，说明数据本身没问题，问题出在MaProTable上。</p>
    </div>

    <div style="margin: 20px 0;">
      <el-button type="primary" size="large">测试按钮</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
