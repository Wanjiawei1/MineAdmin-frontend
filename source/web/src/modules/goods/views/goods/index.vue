<script setup lang="tsx">
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { page, deleteByIds } from '@/modules/goods/api/goods'
import useDialog from '@/hooks/useDialog.ts'
import { useMessage } from '@/hooks/useMessage.ts'
import { ResultCode } from '@/utils/ResultCode.ts'
import GoodsForm from './form.vue'

// 商品列表数据
const goodsList = ref([])
const loading = ref(false)
const total = ref(0)

// 分页参数
const currentPage = ref(1)
const pageSize = ref(10)

// 搜索参数
const searchForm = ref({
  name: '',
  status: ''
})

// 选中的商品
const selectedGoods = ref([])

// 表单弹窗
const formRef = ref()
const msg = useMessage()

// 弹窗配置
const maDialog = useDialog({
  lgWidth: '750px',
  ok: ({ formType }, okLoadingState: (state: boolean) => void) => {
    okLoadingState(true)
    const elForm = formRef.value.maForm.getElFormRef()
    elForm.validate().then(() => {
      switch (formType) {
        case 'add':
          formRef.value.add().then((res: any) => {
            res.code === ResultCode.SUCCESS ? msg.success('创建成功') : msg.error(res.message)
            maDialog.close()
            loadGoodsList()
          }).catch((err: any) => {
            msg.alertError(err)
          })
          break
        case 'edit':
          formRef.value.edit().then((res: any) => {
            res.code === 200 ? msg.success('更新成功') : msg.error(res.message)
            maDialog.close()
            loadGoodsList()
          }).catch((err: any) => {
            msg.alertError(err)
          })
          break
      }
    }).catch()
    okLoadingState(false)
  },
})

// 加载商品列表
async function loadGoodsList() {
  loading.value = true
  try {
    const params = {
      page: currentPage.value,
      page_size: pageSize.value,
      ...searchForm.value
    }
    const result = await page(params)
    if (result.code === 200) {
      goodsList.value = result.data.list
      total.value = result.data.total
    }
  } catch (error) {
    console.error('加载商品列表失败:', error)
    ElMessage.error('加载失败')
  }
  loading.value = false
}

// 搜索
function handleSearch() {
  currentPage.value = 1
  loadGoodsList()
}

// 重置搜索
function handleReset() {
  searchForm.value = { name: '', status: '' }
  currentPage.value = 1
  loadGoodsList()
}

// 分页改变
function handlePageChange(page: number) {
  currentPage.value = page
  loadGoodsList()
}

function handleSizeChange(size: number) {
  pageSize.value = size
  currentPage.value = 1
  loadGoodsList()
}

// 新增商品
function handleAdd() {
  maDialog.setTitle('新增商品')
  maDialog.open({ formType: 'add' })
}

// 编辑商品
function handleEdit(row: any) {
  maDialog.setTitle('编辑商品')
  maDialog.open({ formType: 'edit', data: row })
}

// 删除商品
async function handleDelete(row: any) {
  try {
    await ElMessageBox.confirm('确定删除这个商品吗？', '确认删除', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
    
    const result = await deleteByIds([row.id])
    if (result.code === ResultCode.SUCCESS) {
      ElMessage.success('删除成功')
      loadGoodsList()
    }
  } catch (error) {
    console.log('取消删除')
  }
}

// 批量删除
async function handleBatchDelete() {
  if (selectedGoods.value.length === 0) {
    ElMessage.warning('请选择要删除的商品')
    return
  }
  
  try {
    await ElMessageBox.confirm(`确定删除选中的 ${selectedGoods.value.length} 个商品吗？`, '确认删除', {
      confirmButtonText: '确定',
      cancelButtonText: '取消', 
      type: 'warning',
    })
    
    const ids = selectedGoods.value.map((item: any) => item.id)
    const result = await deleteByIds(ids)
    if (result.code === ResultCode.SUCCESS) {
      ElMessage.success('删除成功')
      selectedGoods.value = []
      loadGoodsList()
    }
  } catch (error) {
    console.log('取消删除')
  }
}

// 处理表格选择
function handleSelectionChange(selection: any[]) {
  selectedGoods.value = selection
}

// 页面加载时获取数据
onMounted(() => {
  loadGoodsList()
})
</script>

<template>
  <div class="mine-layout pt-3">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1>商品管理</h1>
      <p>管理所有商品信息</p>
    </div>

    <!-- 搜索区域 -->
    <el-card class="search-card" shadow="never">
      <el-form :model="searchForm" inline>
        <el-form-item label="商品名称">
          <el-input 
            v-model="searchForm.name" 
            placeholder="请输入商品名称" 
            clearable 
            style="width: 200px;"
          />
        </el-form-item>
        <el-form-item label="上架状态">
          <el-select 
            v-model="searchForm.status" 
            placeholder="请选择状态" 
            clearable 
            style="width: 150px;"
          >
            <el-option label="已上架" :value="1" />
            <el-option label="未上架" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 操作按钮区域 -->
    <div class="toolbar">
      <el-button type="primary" @click="handleAdd">
        <el-icon><Plus /></el-icon>
        新增商品
      </el-button>
      <el-button 
        type="danger" 
        :disabled="selectedGoods.length === 0"
        @click="handleBatchDelete"
      >
        <el-icon><Delete /></el-icon>
        批量删除
      </el-button>
    </div>

    <!-- 商品列表表格 -->
    <el-card shadow="never">
      <el-table 
        :data="goodsList" 
        :loading="loading"
        @selection-change="handleSelectionChange"
        style="width: 100%"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="商品名称" min-width="150" />
        <el-table-column prop="price" label="商品价格" width="120">
          <template #default="{ row }">
            ¥{{ row.price }}
          </template>
        </el-table-column>
        <el-table-column prop="image" label="商品图片" width="120">
          <template #default="{ row }">
            <span class="image-placeholder">{{ row.image || '暂无图片' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="上架状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'warning'">
              {{ row.status === 1 ? '已上架' : '未上架' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="创建时间" width="180" />
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button 
              type="primary" 
              size="small" 
              link
              @click="handleEdit(row)"
            >
              编辑
            </el-button>
            <el-button 
              type="danger" 
              size="small" 
              link
              @click="handleDelete(row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-wrapper">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
        />
      </div>
    </el-card>

    <!-- 弹窗表单 -->
    <component :is="maDialog.Dialog">
      <template #default="{ formType, data }">
        <GoodsForm ref="formRef" :form-type="formType" :data="data" />
      </template>
    </component>
  </div>
</template>

<style scoped lang="scss">
.page-header {
  margin-bottom: 20px;
  
  h1 {
    margin: 0 0 8px 0;
    font-size: 24px;
    font-weight: 600;
    color: #303133;
  }
  
  p {
    margin: 0;
    color: #606266;
    font-size: 14px;
  }
}

.search-card {
  margin-bottom: 16px;
}

.toolbar {
  margin-bottom: 16px;
  
  .el-button {
    margin-right: 12px;
  }
}

.pagination-wrapper {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.image-placeholder {
  color: #909399;
  font-size: 12px;
}
</style>
