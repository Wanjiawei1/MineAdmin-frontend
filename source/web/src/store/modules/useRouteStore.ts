import type { Plugin, SystemSettings } from '#/global'
/**
 * MineAdmin is committed to providing solutions for quickly building web applications
 * Please view the LICENSE file that was distributed with this source code,
 * For the full copyright and license information.
 * Thank you very much for using MineAdmin.
 *
 * @Author X.Mo<root@imoi.cn>
 * @Link   https://github.com/mineadmin
 */
import type { Router, RouteRecordRaw } from 'vue-router'
import dashboardRoute from '@/router/static-routes/dashboardRoute'
import welcomeRoute from '@/router/static-routes/welcomeRoute'
import usePluginStore from '@/store/modules/usePluginStore.ts'

const useRouteStore = defineStore(
  'useRouteStore',
  () => {
    const defaultSetting = ref<SystemSettings.all>(useDefaultSetting())
    // 原始路由
    const routesRaw = ref<RouteRecordRaw[]>([])
    const flatteningRoutesList = ref<RouteRecordRaw[]>([])
    async function initRoutes(router: Router, routes: any[]) {
      const MineRootLayoutRoute = getMineRootLayoutRoute()

      router.hasRoute('MineRootLayoutRoute') && router.removeRoute('MineRootLayoutRoute')
      router.addRoute(MineRootLayoutRoute)
      routesRaw.value = router.getRoutes()
      routes = menuToRoutes(routes)

      router.getRoutes().find((route, key) => {
        if (route.name === 'MineRootLayoutRoute') {
          // @ts-expect-error eslint-disable-next-line ts/ban-ts-comment
          routesRaw.value[key].children.push(...routes)
        }
      })
      flatteningRoutesList.value = flatteningRoutes(routes)
      flatteningRoutesList.value.map((routeItem: RouteRecordRaw) => router.addRoute('MineRootLayoutRoute', routeItem))
      const plugins = usePluginStore().getPluginConfig() as { [ key: string ]: Plugin.PluginConfig }
      Object.keys(plugins).map((name: string) => {
        const plugin = plugins[name] as Plugin.PluginConfig
        if (plugin.config?.enable === true && plugin?.views) {
          plugin.views.map((item: Plugin.Views) => {
            const route = toRecordRawRoute(item)
            MineRootLayoutRoute.children?.push(route)
            router.addRoute('MineRootLayoutRoute', route)
          })
        }
      })
      await usePluginStore().callHooks('registerRoute', router, routesRaw.value)
    }

    function getMineRootLayoutRoute(): RouteRecordRaw {
      const welcomePage: SystemSettings.welcomePage = defaultSetting.value.welcomePage
      return {
        name: 'MineRootLayoutRoute',
        path: '/',
        component: () => import('@/layouts'),
        redirect: welcomePage.path,
        children: [
          Object.assign(welcomeRoute, {
            name: welcomePage.name,
            path: welcomePage.path,
            meta: {
              title: welcomePage.title,
              i18n: 'menu.welcome',
              icon: welcomePage.icon,
              type: 'M',
              affix: true,
              breadcrumbEnable: true,
              copyright: true,
              cache: true,
            },
          }),
          toRecordRawRoute(dashboardRoute),
          toRecordRawRoute({
            path: '/:pathMatch(.*)*',
            name: 'MineSystemError',
            component: () => import(('@/layouts/[...all].tsx')),
            meta: {
              hidden: true,
              i18n: 'menu.pageError',
            },
          }),
        ],
      }
    }

    /**
     * 扁平化为一层路由
     */
    function flatteningRoutes(routes: any[] = [], breadcrumb: any[] = []) {
      const res: any = []
      routes.forEach((route) => {
        const tmp = { ...route }
        if (tmp.children) {
          const childrenBreadcrumb = [...breadcrumb]
          childrenBreadcrumb.push(route)
          const tmpRoute = { ...route }
          tmpRoute.meta = tmpRoute?.meta ?? {}
          tmpRoute.meta.breadcrumb = childrenBreadcrumb
          delete tmpRoute.children
          res.push(tmpRoute)
          const childrenRoutes = flatteningRoutes(tmp.children, childrenBreadcrumb)
          childrenRoutes.map((item: any) => res.push(item))
        }
        else {
          const tmpBreadcrumb = [...breadcrumb]
          tmpBreadcrumb.push(tmp)
          tmp.meta = tmp?.meta ?? {}
          tmp.meta.breadcrumb = tmpBreadcrumb
          res.push(tmp)
        }
      })
      return res
    }

    function toRecordRawRoute(route: any) {
      return flatteningRoutes([route])[0].meta.breadcrumb[0]
    }

    const moduleViews = import.meta.glob('../../modules/**/views/**/**.{vue,jsx,tsx}')
    const pluginViews = import.meta.glob('../../plugins/*/**/views/**/**.{vue,jsx,tsx}')

    /**
     * 菜单转路由
     * @param routerMap
     */
    function menuToRoutes(routerMap: any[]) {
      const accessedRouters: any = []
      routerMap.forEach((item: any) => {
        // 忽略按钮类型的菜单
        if (item.type === 'B') {
          return
        }

        // --- 核心修正开始 ---
        // 1. 创建 meta 对象，从后端返回的顶层字段映射过来
        const meta = {
          title: item.name, // 菜单标题
          icon: item.icon,
          type: item.type,
          hidden: item.is_hidden === 1,
          // 您可以根据需要，在这里添加后端返回的其他字段
        }

        // 2. 动态加载组件
        let component: any | null = null
        if (item.component) {
          const componentPath = `../../modules/${item.component}.vue`
          if (moduleViews[componentPath]) {
            component = moduleViews[componentPath]
          } else {
            // 如果需要，可以添加 tsx/jsx 的支持
            const tsxPath = `../../modules/${item.component}.tsx`
            if (moduleViews[tsxPath]) {
              component = moduleViews[tsxPath]
            } else {
              console.warn(`组件未找到: ${componentPath} 或 ${tsxPath}`)
            }
          }
        }
        // --- 核心修正结束 ---

        // 3. 组装成一个正确的路由对象
        const route: RouteRecordRaw = {
          path: item.route, // 使用 `route` 字段作为路径
          name: item.code,  // 使用 `code` 字段作为唯一名称
          meta,             // 使用我们新创建的 meta 对象
          redirect: item.redirect,
          children: item.children && item.children.length > 0 ? menuToRoutes(item.children) : [],
          component,
        }
        accessedRouters.push(route)
      })
      return accessedRouters
    }
    return {
      initRoutes,
      toRecordRawRoute,
      flatteningRoutes,
      routesRaw,
      flatteningRoutesList,
    }
  },
)

export default useRouteStore
