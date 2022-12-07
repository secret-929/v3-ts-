import { defineStore } from 'pinia'
import { accountLoginRequest, getUserInfoById, getUserMenusByRoleId } from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { LOGIN_TOKEN } from '@/global/constants'
import { mapMenusToRoutes, mapMenuToPermissions } from '@/utils/map-menus'
import useMainStore from '../main/main'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
  permissions: string[]
}

const useLoginStore = defineStore('login', {
  // 指定state类型
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenus: [],
    permissions: []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      const loginResult = await accountLoginRequest(account)
      const id = loginResult.data.id
      this.token = loginResult.data.token
      localCache.setCache(LOGIN_TOKEN, this.token)

      // 获取登录用户的详细信息
      const userInfoResult = await getUserInfoById(id)
      const userInfo = userInfoResult.data
      this.userInfo = userInfo

      // 根据角色请求用户得权限（菜单）
      const userMenusResult = await getUserMenusByRoleId(this.userInfo.role.id)
      const userMenus = userMenusResult.data
      this.userMenus = userMenus

      // 进行本地缓存
      localCache.setCache('userInfo', userInfo)
      localCache.setCache('userMenus', userMenus)

      // 请求roles/departments数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()

      // 重要:获取登录用户的所有按钮的权限
      const permissions = mapMenuToPermissions(userMenus)
      this.permissions = permissions

      // 重要:动态添加路由
      const routes = mapMenusToRoutes(userMenus)
      routes.forEach((route) => router.addRoute('main', route))

      // 页面跳转
      router.push('/main')
    },
    loadLocalCacheAction() {
      // 用户刷新默认加载数据
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus

        // 请求roles/departments数据
        const mainStore = useMainStore()
        mainStore.fetchEntireDataAction()

        // 获取登录用户的所有按钮的权限
        const permissions = mapMenuToPermissions(userMenus)
        this.permissions = permissions

        // 动态添加路由
        const routes = mapMenusToRoutes(userMenus)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})

export default useLoginStore
