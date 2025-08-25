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
      render: 'input-number',
      cols: { md: 12, xs: 24 },
      renderProps: {
        placeholder: '请输入商品价格',
      },
      itemProps: {
        rules: [{ required: true, message: '商品价格不能为空' }],
      },
    },
  ]
}
