import {
  deletePageById,
  deleteUserById,
  editPageData,
  editUserData,
  newPageData,
  newUserData,
  postPageListData,
  postUserListData
} from '@/service/main/system/system'
import { defineStore } from 'pinia'
import useMainStore from '../main'
import type { ISystemState } from './type'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0,
    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    async postUsersListAction(queryInfo: any) {
      const usersListResult = await postUserListData(queryInfo)
      const { totalCount, list } = usersListResult.data
      this.usersTotalCount = totalCount
      this.usersList = list
    },
    async deleteUserByIdAction(id: number) {
      const deleteResult = await deleteUserById(id)
      console.log(deleteResult)
      this.postUsersListAction({ offset: 0, size: 10 })
    },
    async newUserDataAction(userInfo: any) {
      const newResult = await newUserData(userInfo)
      console.log(newResult)
      this.postUsersListAction({ offset: 0, size: 10 })
    },
    async editUserDataAction(id: number, userInfo: any) {
      const editResult = await editUserData(id, userInfo)
      console.log(editResult)
      this.postUsersListAction({ offset: 0, size: 10 })
    },
    /**针对页面数据：增删改查 */
    async postPageListAction(pageName: string, queryInfo: any) {
      const pageListResult = await postPageListData(pageName, queryInfo)
      const { totalCount, list } = pageListResult.data
      this.pageTotalCount = totalCount
      this.pageList = list
    },
    async deletePageByIdAction(pageName: string, id: number) {
      const deletePageResult = await deletePageById(pageName, id)
      console.log(deletePageResult)
      this.postPageListAction(pageName, { offset: 0, size: 10 })

      // 获取完整数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },
    async newPageDataAction(pageName: string, pageInfo: any) {
      const newResult = await newPageData(pageName, pageInfo)
      console.log(newResult)
      this.postPageListAction(pageName, { offset: 0, size: 10 })

      // 获取完整数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },
    async editPageDataAction(pageName: string, id: number, pageInfo: any) {
      const editResult = await editPageData(pageName, id, pageInfo)
      console.log(editResult)
      this.postPageListAction(pageName, { offset: 0, size: 10 })

      // 获取完整数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    }
  }
})

export default useSystemStore
