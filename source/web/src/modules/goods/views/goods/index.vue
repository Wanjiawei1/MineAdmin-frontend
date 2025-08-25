<script setup lang="tsx">
import { ref } from 'vue'

defineOptions({ name: 'goods:goods' })

// 模拟数据
const tableData = ref([
  {
    id: 1,
    name: 'edfaed',
    price: '111.00',
    status: 1,
    created_at: '2025-08-25 02:01:06'
  }
])

console.log('测试页面加载，数据:', tableData.value)
</script>

<template>
  <div class="mine-layout pt-3">
    <h2>商品管理测试页面</h2>
    
    <div style="margin: 20px 0;">
      <h3>调试信息：</h3>
      <p>数据加载状态：已加载</p>
      <p>数据条数：{{ tableData.length }}</p>
    </div>

    <!-- 简单的表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="name" label="商品名称" />
      <el-table-column prop="price" label="价格" />
      <el-table-column prop="status" label="状态">
        <template #default="{ row }">
          {{ row.status === 1 ? '已上架' : '未上架' }}
        </template>
      </el-table-column>
      <el-table-column prop="created_at" label="创建时间" />
    </el-table>

    <div style="margin-top: 20px;">
      <el-button type="primary">新增商品（测试）</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
