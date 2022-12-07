import type { RouteRecordRaw } from 'vue-router'

function loadLocalRoutes() {
  // 1.获取所有路由对象,放到数组中
  const localRoutes: RouteRecordRaw[] = []
  // 1.1读取router/main所有ts文件
  const files: Record<string, any> = import.meta.glob('../router/main/**/*.ts', {
    eager: true
  })
  // 1.2将加载的对象放到localRoutes
  for (const key in files) {
    const module = files[key]
    localRoutes.push(module.default)
  }
  return localRoutes
}

export let firstMenu: any = null
export function mapMenusToRoutes(userMenus: any[]) {
  // 1.加载本地路由
  const localRoutes = loadLocalRoutes()

  // 2.根据菜单匹配路由
  const routes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.url)
      if (route) {
        // 一级菜单重定向到二级菜单第一个
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route.path })
        }
        // 二级菜单注册路由
        routes.push(route)
      }
      if (!firstMenu && route) firstMenu = submenu
    }
  }
  return routes
}

/**
 * 根据路径匹配需要显示的菜单
 * @param path 需要匹配的路径
 * @param userMenus 所有菜单
 */

export function mapPathToMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        return submenu
      }
    }
  }
}

interface IBreadcurmbs {
  name: string
  path: string
}

export function mapPathToBreadcrumbs(path: string, userMenus: any[]) {
  const breadcrumbs: IBreadcurmbs[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        breadcrumbs.push({ name: menu.name, path: menu.url })
        breadcrumbs.push({ name: submenu.name, path: submenu.url })
      }
    }
  }
  return breadcrumbs
}

/**
 * 菜单映射到id得列表
 * @param menuList
 */
export function mapMenuListToIds(menuList: any[]) {
  const ids: number[] = []

  function recurseGetId(menus: any[]) {
    for (const item of menus) {
      if (item.children) {
        recurseGetId(item.children)
      } else {
        ids.push(item.id)
      }
    }
  }

  recurseGetId(menuList)

  return ids
}

/**
 * 从菜单映射到按钮的权限
 * @param menuList 菜单列表
 * @returns 权限数组
 */
export function mapMenuToPermissions(menuList: any[]) {
  const permissions: string[] = []
  function recurseGetPermission(menus: any[]) {
    for (const item of menus) {
      if (item.type === 3) {
        permissions.push(item.permission)
      } else {
        recurseGetPermission(item.children ?? [])
      }
    }
  }
  recurseGetPermission(menuList)

  return permissions
}
