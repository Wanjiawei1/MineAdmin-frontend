import type { MaProTableColumn } from '@mineadmin/pro-table'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'
import type { Ref } from 'vue'
import type { TransType } from '@/hooks/auto-imports/useTrans.ts'
import { changeStatus, deleteByIds } from '@/modules/goods/api/goods'
import { useMessage } from '@/hooks/useMessage.ts'
import { ResultCode } from '@/utils/ResultCode.ts'

function getTableColumns(maDialog: UseDialogExpose, formRef: Ref, t: TransType['globalTrans']): MaProTableColumn[] {
  const msg = useMessage()
  const tableColumns: MaProTableColumn[] = [
    {
      label: '商品名称',
      dataIndex: 'name',
    },
    {
      label: '商品价格',
      dataIndex: 'price',
    },
    {
      label: '上架状态',
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
          text: t('crud.edit'),
          type: 'primary',
          link: true,
          onClick: ({ record }) => {
            maDialog.setTitle(t('crud.edit'))
            maDialog.open({ formType: 'edit', data: record })
          },
        },
        {
          text: t('crud.delete'),
          type: 'danger',
          link: true,
          onClick: async ({ record }) => {
            const response = await deleteByIds([record.id])
            if (response.code === ResultCode.SUCCESS) {
              msg.success(t('crud.delSuccess'))
              // 刷新表格
              window.location.reload()
            }
          },
        },
      ],
    },
  ]
  return tableColumns
}

export default getTableColumns
