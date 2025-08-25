import type { MaFormItem } from '@mineadmin/form'
import MaUploadImage from '@/components/ma-upload-image/index.vue'
import MaDictRadio from '@/components/ma-dict-picker/ma-dict-radio.vue'

export default function getFormItems(formType: 'add' | 'edit' = 'add', t: any = (key: string) => key, model: any = {}): MaFormItem[] {
  return [
    {
      label: '商品名称',
      prop: 'name',
      render: 'input',
      cols: { md: 12, xs: 24 },
      renderProps: {
        placeholder: '请输入商品名称',
      },
      itemProps: {
        rules: [{ required: true, message: '商品名称不能为空' }],
      },
    },
    {
      label: '商品价格',
      prop: 'price',
      render: 'input',
      cols: { md: 12, xs: 24 },
      renderProps: {
        placeholder: '请输入商品价格（元）',
        type: 'number',
      },
      itemProps: {
        rules: [{ required: true, message: '商品价格不能为空' }],
      },
    },
    {
      label: '商品图片',
      prop: 'image',
      render: () => MaUploadImage,
      cols: { md: 24, xs: 24 },
      itemProps: {
        rules: [{ required: true, message: '请上传商品图片' }],
      },
    },
    {
      label: '上架状态',
      prop: 'status',
      render: () => MaDictRadio,
      cols: { md: 12, xs: 24 },
      renderProps: {
        renderMode: 'button',
        placeholder: '请选择上架状态',
        dictName: 'system-status',
      },
      itemProps: {
        rules: [{ required: true, message: '请选择上架状态' }],
      },
    },
  ]
}
