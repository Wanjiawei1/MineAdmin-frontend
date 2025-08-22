import type { MaProTableColumn } from '@mineadmin/pro-table'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'
import type { Ref } from 'vue'
import type { TransType } from '@/hooks/auto-imports/useTrans.ts'
import { changeStatus, deleteByIds } from '@/modules/goods/api/goods'
import { useMessage } from '@/hooks/useMessage.ts'
import { ResultCode } from '@/utils/ResultCode.ts'

const msg = useMessage()

function getTableColumns(maDialog: UseDialogExpose, formRef: Ref, t: TransType['globalTrans']): MaProTableColumn[] {
  const tableColumns: MaProTableColumn[] = [
    {
      label: '商品名称',
      dataIndex: 'name',
    },
    {
      label: '商品图片',
      dataIndex: 'image',
      formType: 'upload',
    },
    {
      label: '商品价格',
      dataIndex: 'price',
    },
    {
      label: '上架状态',
      dataIndex: 'status',
      formType: 'dict-switch',
      dict: {
        // 与后端的约定需要保持一致
        data: [
          { label: '已上架', value: 1 },
          { label: '未上架', value: 2 },
        ],
        props: {
          label: 'label',
          value: 'value',
        },
      },
      change: async (val: any, record: any) => {
        const response = await changeStatus(record.id, val)
        if (response.code === ResultCode.SUCCESS)
          msg.success(t('crud.updateSuccess'))
      },
    },
    {
      label: '创建时间',
      dataIndex: 'created_at',
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
          auth: ['goods:goods:update'],
          onClick: ({ record }) => {
            maDialog.setTitle(t('crud.edit'))
            maDialog.open({ formType: 'edit', data: record })
          },
        },
        {
          text: t('crud.delete'),
          type: 'danger',
          link: true,
          auth: ['goods:goods:delete'],
          onClick: async ({ record }) => {
            const response = await deleteByIds([record.id])
            if (response.code === ResultCode.SUCCESS)
              msg.success(t('crud.delSuccess'))
          },
        },
      ],
    },
  ]
  return tableColumns
}

export default getTableColumns
