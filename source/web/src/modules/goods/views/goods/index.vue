<script setup lang="tsx">
import { ref } from 'vue'
import type { MaProTableExpose, MaProTableOptions, MaProTableSchema } from '@mineadmin/pro-table'
import type { Ref } from 'vue'
import { page, deleteByIds } from '@/modules/goods/api/goods'
import useDialog from '@/hooks/useDialog.ts'
import { useMessage } from '@/hooks/useMessage.ts'
import { ResultCode } from '@/utils/ResultCode.ts'
import GoodsForm from './form.vue'

defineOptions({ name: 'goods:goods' })

const proTableRef = ref<MaProTableExpose>() as Ref<MaProTableExpose>
const formRef = ref()
const msg = useMessage()
const i18n = useTrans()
const t = i18n.globalTrans

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
            proTableRef.value.refresh()
          }).catch((err: any) => {
            msg.alertError(err)
          })
          break
        case 'edit':
          formRef.value.edit().then((res: any) => {
            res.code === 200 ? msg.success('更新成功') : msg.error(res.message)
            maDialog.close()
            proTableRef.value.refresh()
          }).catch((err: any) => {
            msg.alertError(err)
          })
          break
      }
    }).catch()
    okLoadingState(false)
  },
})

// MaProTable 配置
const options = ref<MaProTableOptions>({
  requestOptions: {
    api: page,
    afterRequest: (res: any) => {
      console.log('🔍 API响应数据:', res)
      console.log('🔍 数据列表:', res.data?.list)
      console.log('🔍 数据总数:', res.data?.total)
      return res
    },
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
    {
      label: '操作',
      dataIndex: 'operation',
      width: 150,
      buttons: [
        {
          text: '编辑',
          type: 'primary',
          link: true,
          onClick: ({ record }) => {
            maDialog.setTitle('编辑商品')
            maDialog.open({ formType: 'edit', data: record })
          },
        },
        {
          text: '删除',
          type: 'danger',
          link: true,
          onClick: async ({ record }) => {
            const response = await deleteByIds([record.id])
            if (response.code === ResultCode.SUCCESS) {
              msg.success('删除成功')
              proTableRef.value.refresh()
            }
          },
        },
      ],
    },
  ],
})

console.log('MaProTable 配置加载完成，包含完整功能')
</script>

<template>
  <div class="mine-layout pt-3">
    <MaProTable ref="proTableRef" :options="options" :schema="schema">
      <template #actions>
        <el-button
          type="primary"
          @click="() => {
            maDialog.setTitle('新增商品')
            maDialog.open({ formType: 'add' })
          }"
        >
          新增商品
        </el-button>
      </template>
    </MaProTable>

    <!-- 弹窗表单 -->
    <component :is="maDialog.Dialog">
      <template #default="{ formType, data }">
        <GoodsForm ref="formRef" :form-type="formType" :data="data" />
      </template>
    </component>
  </div>
</template>

<style scoped lang="scss">

</style>
