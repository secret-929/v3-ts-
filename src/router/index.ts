import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  // 映射关系:path=>component
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      component: () => import('../views/login/Login.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/main/main.vue')
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/not-found/NotFound.vue')
    }
  ]
})

// const localRoutes = [
//   {
//     path: '/main/analysis/overview',
//     component: () => import('../views/main/analysis/overview/overview.vue')
//   },
//   {
//     path: '/main/analysis/dashboard',
//     component: () => import('../views/main/analysis/dashboard/dashboard.vue')
//   },
//   {
//     path: '/main/system/user',
//     component: () => import('../views/main/system/user/user.vue')
//   },
//   {
//     path: '/main/system/role',
//     component: () => import('../views/main/system/role/role.vue')
//   }
// ]

// // 动态添加路由
// router.addRoute('main', localRoutes[0])
// router.addRoute('main', localRoutes[1])

// 导航守卫
// 返回值：返回值决定导航的路径
router.beforeEach((to) => {
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path.startsWith('/main') && !token) {
    return '/login'
  }

  // 如果进入到main,默认进入第一个路由
  if (to.path === '/main') {
    return firstMenu?.url
  }
})

export default router
