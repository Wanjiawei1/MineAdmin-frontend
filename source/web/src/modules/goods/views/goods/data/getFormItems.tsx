import type { MaFormItem } from '@mineadmin/form'

export default function getFormItems(): { formItems: MaFormItem[] } {
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
