import { request } from '@/utils/request.ts'

const prefix = '/goods/goods'

export interface GoodsRecord {
  id?: number
  name: string
  price: number
  status: 1 | 2
  image: string
  [key: string]: any
}

export function page(params: any) {
  return request({
    url: `${prefix}/page`,
    method: 'get',
    params,
  })
}

export function getById(id: number) {
  return request({
    url: `${prefix}/get`,
    method: 'get',
    params: { id },
  })
}

export function add(data: GoodsRecord) {
  return request({
    url: `${prefix}/add`,
    method: 'post',
    data,
  })
}

export function edit(data: GoodsRecord) {
  return request({
    url: `${prefix}/edit`,
    method: 'put',
    data,
  })
}

export function deleteByIds(ids: number[]) {
  return request({
    url: `${prefix}/delete`,
    method: 'delete',
    data: { ids },
  })
}

export function changeStatus(id: number, status: 1 | 2) {
  return request({
    url: `${prefix}/changeStatus`,
    method: 'put',
    data: { id, status },
  })
}
