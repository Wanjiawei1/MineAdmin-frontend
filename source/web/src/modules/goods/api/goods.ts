import request from '@/utils/http.ts'

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
  return request.http.get(`${prefix}/page`, { params })
}

export function getById(id: number) {
  return request.http.get(`${prefix}/get`, { params: { id } })
}

export function add(data: GoodsRecord) {
  return request.http.post(`${prefix}/add`, { data })
}

export function edit(data: GoodsRecord) {
  return request.http.put(`${prefix}/edit`, { data })
}

export function deleteByIds(ids: number[]) {
  return request.http.delete(`${prefix}/delete`, { data: { ids } })
}

export function changeStatus(id: number, status: 1 | 2) {
  return request.http.put(`${prefix}/changeStatus`, { data: { id, status } })
}
