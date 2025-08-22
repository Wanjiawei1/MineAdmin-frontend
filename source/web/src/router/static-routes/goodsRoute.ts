import type { RouteRecordRaw } from 'vue-router'

const goodsRoute: RouteRecordRaw[] = [
  {
    path: '/goods',
    name: 'goods',
    component: () => import('@/layouts/index.tsx'),
    meta: {
      title: '商品管理',
      icon: 'icon-park-outline:commodity',
    },
    children: [
      {
        path: 'list',
        name: 'goodsList',
        component: () => import('@/modules/goods/views/goods/index.vue'),
        meta: {
          title: '商品列表',
          auth: ['goods:goods:page'],
        },
      },
    ],
  },
]

export default goodsRoute
