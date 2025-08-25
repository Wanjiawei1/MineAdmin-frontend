<!-- 该文件已根据项目规范完全重写 -->
<script setup lang="ts">
import { ref } from 'vue'
import type { GoodsRecord } from '@/modules/goods/api/goods'
import { add, edit } from '@/modules/goods/api/goods'
import type { MaFormExpose, MaFormItem } from '@mineadmin/form'
import useForm from '@/hooks/useForm.ts'
import { ResultCode } from '@/utils/ResultCode.ts'

console.log('--- [Goods Form]：组件 setup 开始 ---')

defineOptions({ name: 'goods:goods:form' })

const props = defineProps<{
  formType: 'add' | 'edit'
  data?: GoodsRecord
}>()

const goodsForm = ref<MaFormExpose>()
const goodsModel = ref<Partial<GoodsRecord>>({})

// 定义表单列 (返回一个包含 formItems 的对象)
function getFormItems(): { formItems: MaFormItem[] } {
  console.log('--- [Goods Form]：getFormItems() 函数被调用 ---')
  return {
    formItems: [
      {
        formType: 'grid',
        columns: [
          {
            span: 24,
            formItems: [
              {
                label: '商品名称',
                dataIndex: 'name',
                formType: 'input',
                rules: [{ required: true, message: '商品名称不能为空' }],
              },
              /* {
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
              }, */
              {
                label: '上架状态',
                dataIndex: 'status',
                formType: 'radio-group',
                initialValue: 1, // 默认值为 "上架"
                rules: [{ required: true, message: '请选择上架状态' }],
                options: [
                  { label: '上架', value: 1 },
                  { label: '下架', value: 2 },
                ],
              },
            ],
          },
        ],
      },
    ],
  }
}

// 使用 useForm 钩子初始化表单
useForm('goodsForm').then((form: MaFormExpose) => {
  console.log('--- [Goods Form]：useForm 的 .then() 回调已执行 ---')
  if (props.formType === 'edit' && props.data) {
    Object.assign(goodsModel.value, props.data)
  }
  const items = getFormItems().formItems
  console.log('--- [Goods Form]：准备设置的表单项(items):', items)
  // 正确地传入 getFormItems() 返回对象中的 formItems 数组
  form.setItems(items)
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
