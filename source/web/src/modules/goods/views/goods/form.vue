<script setup lang="ts">
import type { GoodsRecord } from '~/modules/goods/api/goods'
import type { MaFormInstance } from '@mineadmin/pro-components'
import { ref } from 'vue'
import { add, edit, getById } from '~/modules/goods/api/goods'

const props = defineProps<{
  formType: 'add' | 'edit'
  data?: GoodsRecord
}>()
const maForm = ref<MaFormInstance>()

// 初始化
if (props.formType === 'edit' && props.data?.id) {
  getById(props.data.id).then((res) => {
    maForm.value?.setFormModel(res.data)
  })
}

function addRequest(data: GoodsRecord) {
  return add(data)
}
function editRequest(data: GoodsRecord) {
  return edit(data)
}

defineExpose({
  add: () => maForm.value?.handleSubmit(addRequest),
  edit: () => maForm.value?.handleSubmit(editRequest),
  maForm,
})
</script>

<template>
  <MaForm
    ref="maForm"
    :initial-values="{ status: 1 }"
    :columns="[
      {
        label: '商品名称',
        dataIndex: 'name',
        formType: 'input',
        rules: [{ required: true, message: '商品名称不能为空' }],
      },
      {
        label: '商品图片',
        dataIndex: 'image',
        formType: 'upload',
        rules: [{ required: true, message: '请上传商品图片' }],
      },
      {
        label: '商品价格',
        dataIndex: 'price',
        formType: 'input-number',
        rules: [{ required: true, message: '商品价格不能为空' }],
      },
      {
        label: '上架状态',
        dataIndex: 'status',
        formType: 'radio-group',
        rules: [{ required: true, message: '请选择上架状态' }],
        options: [
          { label: '上架', value: 1 },
          { label: '下架', value: 2 },
        ],
      },
    ]"
  />
</template>
