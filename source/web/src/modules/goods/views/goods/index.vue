<script setup lang="tsx">
import { ref } from 'vue'
import type { MaProTableOptions, MaProTableSchema } from '@mineadmin/pro-table'

defineOptions({ name: 'goods:goods' })

// 模拟数据API
function mockAPI() {
  return Promise.resolve({
    code: 200,
    message: "成功",
    data: {
      list: [
        {
          id: 1,
          name: 'edfaed',
          price: '111.00',
          status: 1,
          created_at: '2025-08-25 02:01:06'
        }
      ],
      total: 1
    }
  })
}

// 最简单的 MaProTable 配置
const options = ref<MaProTableOptions>({
  requestOptions: {
    api: mockAPI,
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

console.log('MaProTable 配置加载完成')
</script>

<template>
  <div class="mine-layout pt-3">
    <h2>商品管理 - MaProTable 测试</h2>
    
    <div style="margin: 20px 0;">
      <p>使用最简单的 MaProTable 配置，只有商品名称和价格两列</p>
    </div>

    <!-- 使用 MaProTable -->
    <MaProTable :options="options" :schema="schema" />
  </div>
</template>

<style scoped lang="scss">

</style>
