import type { MaFormItem } from '@mineadmin/form'
import MaUploadImage from '@/components/ma-upload-image/index.vue'
import MaDictRadio from '@/components/ma-dict-picker/ma-dict-radio.vue'

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
                prop: 'name', // 修正: dataIndex -> prop
                render: 'input', // 修正: formType -> render
                itemProps: { // 修正: rules 包装在 itemProps 中
                  rules: [{ required: true, message: '商品名称不能为空' }],
                },
              },
              {
                label: '商品图片',
                prop: 'image', // 修正: dataIndex -> prop
                render: () => MaUploadImage, // 修正: formType -> render
                itemProps: { // 修正: rules 包装在 itemProps 中
                  rules: [{ required: true, message: '请上传商品图片' }],
                },
              },
              {
                label: '商品价格',
                prop: 'price', // 修正: dataIndex -> prop
                render: 'input-number', // 修正: formType -> render
                itemProps: { // 修正: rules 包装在 itemProps 中
                  rules: [{ required: true, message: '商品价格不能为空' }],
                },
              },
              {
                label: '上架状态',
                prop: 'status', // 修正: dataIndex -> prop
                render: () => MaDictRadio, // 修正: formType -> render
                renderProps: { // 修正：使用 renderProps 传递字典和选项
                  dictName: 'system-status', // 假设存在一个名为 'system-status' 的字典
                  // 或者直接提供 options
                  // options: [
                  //   { label: '上架', value: 1 },
                  //   { label: '下架', value: 2 },
                  // ],
                },
                itemProps: { // 修正: rules 包装在 itemProps 中
                  rules: [{ required: true, message: '请选择上架状态' }],
                },
              },
            ],
          },
        ],
      },
    ],
  }
}
