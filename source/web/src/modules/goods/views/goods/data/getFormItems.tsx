import type { MaFormItem } from '@mineadmin/form'

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
      label: '商品图片URL',
      prop: 'image',
      render: 'input',
      cols: { md: 24, xs: 24 },
      renderProps: {
        placeholder: '请输入商品图片URL地址',
      },
      itemProps: {
        rules: [{ required: true, message: '商品图片URL不能为空' }],
      },
    },
    {
      label: '上架状态',
      prop: 'status',
      render: 'select',
      cols: { md: 12, xs: 24 },
      renderProps: {
        placeholder: '请选择上架状态',
        options: [
          { label: '已上架', value: 1 },
          { label: '未上架', value: 2 },
        ],
      },
      itemProps: {
        rules: [{ required: true, message: '请选择上架状态' }],
      },
    },
  ]
}
