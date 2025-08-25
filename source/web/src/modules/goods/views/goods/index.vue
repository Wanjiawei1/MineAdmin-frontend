<script setup lang="tsx">
import { ref } from 'vue'
import type { MaProTableOptions, MaProTableSchema } from '@mineadmin/pro-table'
import { page } from '@/modules/goods/api/goods'

defineOptions({ name: 'goods:goods' })

// 最简单的 MaProTable 配置
const options = ref<MaProTableOptions>({
  requestOptions: {
    api: page,
  },
})

const schema = ref<MaProTableSchema>({
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
      render: ({ record }) => {
        return record.status === 1 ? '已上架' : '未上架'
      },
    },
  ],
})

console.log('MaProTable 配置加载完成，使用真实API')
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
