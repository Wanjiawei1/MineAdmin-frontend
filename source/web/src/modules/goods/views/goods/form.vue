<!-- 该文件已根据项目规范完全重写 -->
<script setup lang="ts">
import { ref } from 'vue'
import type { GoodsRecord } from '@/modules/goods/api/goods'
import { add, edit } from '@/modules/goods/api/goods'
import type { MaFormExpose } from '@mineadmin/form'
import useForm from '@/hooks/useForm.ts'
import { ResultCode } from '@/utils/ResultCode.ts'
import getFormItems from './data/getFormItems.tsx'

defineOptions({ name: 'goods:goods:form' })

const props = defineProps<{
  formType: 'add' | 'edit'
  data?: GoodsRecord
}>()

const goodsForm = ref<MaFormExpose>()
const goodsModel = ref<Partial<GoodsRecord>>({})

// 使用 useForm 钩子初始化表单
useForm('goodsForm').then((form: MaFormExpose) => {
  if (props.formType === 'edit' && props.data) {
    Object.assign(goodsModel.value, props.data)
  }
  // 正确地传入 getFormItems() 返回对象中的 formItems 数组
  form.setItems(getFormItems().formItems)
  form.setOptions({
    labelWidth: '80px',
  })
})

// 创建操作
function addRequest(): Promise<any> {
  return new Promise((resolve, reject) => {
    add(goodsModel.value as GoodsRecord).then((res: any) => {
      res.code === ResultCode.SUCCESS ? resolve(res) : reject(res)
    }).catch((err) => {
      reject(err)
    })
  })
}

// 更新操作
function editRequest(): Promise<any> {
  return new Promise((resolve, reject) => {
    edit(goodsModel.value as GoodsRecord).then((res: any) => {
      res.code === ResultCode.SUCCESS ? resolve(res) : reject(res)
    }).catch((err) => {
      reject(err)
    })
  })
}

defineExpose({
  add: addRequest,
  edit: editRequest,
  maForm: goodsForm,
})
</script>

<template>
  <ma-form ref="goodsForm" v-model="goodsModel" />
</template>

<style scoped lang="scss">
</style>
