import type { MaFormItem } from '@mineadmin/pro-components'
import type { TransType } from '@/hooks/auto-imports/useTrans.ts'

function getSearchItems(t: TransType['globalTrans']) {
  const searchItems: MaFormItem[] = [
    {
      label: '商品名称',
      formType: 'input',
      dataIndex: 'name',
      placeholder: '请输入商品名称',
      style: { width: '200px' },
    },
    {
      label: '上架状态',
      formType: 'select',
      dataIndex: 'status',
      placeholder: '请选择上架状态',
      style: { width: '200px' },
      options: [
        { label: '已上架', value: 1 },
        { label: '未上架', value: 2 },
      ],
    },
  ]
  return searchItems
}

export default getSearchItems
