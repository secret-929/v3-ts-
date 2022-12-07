<template>
  <div class="role">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <page-content
      :content-config="contentConfig"
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handelEditClick"
    />
    <page-modal :modal-config="modalConfig" ref="modalRef" :other-info="otherInfo">
      <template #menuList>
        <el-tree
          ref="treeRef"
          :data="entireMenus"
          show-checkbox
          node-key="id"
          :props="{ value: 'id', label: 'name' }"
          @check="handeleELTreeCheck"
        />
      </template>
    </page-modal>
  </div>
</template>

<script setup lang="ts" name="role">
import PageSearch from '@/components/page-search/page-search.vue'
import searchConfig from './config/search.config'

import PageContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/content.config'

import PageModal from '@/components/page-modal/page-modal.vue'
import modalConfig from './config/modal.config'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'
import useMainStore from '@/store/main/main'
import { storeToRefs } from 'pinia'
import { nextTick, ref } from 'vue'
import type { ElTree } from 'element-plus'
import { mapMenuListToIds } from '@/utils/map-menus'

// 逻辑关系
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
const { modalRef, handleNewClick, handelEditClick } = usePageModal(newCallback, editCallback)

// 获取完整菜单
const mainStore = useMainStore()
const { entireMenus } = storeToRefs(mainStore)
const otherInfo = ref({})
const treeRef = ref<InstanceType<typeof ElTree>>()
function handeleELTreeCheck(data1: any, data2: any) {
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  otherInfo.value = { menuList }
}

// el-tree回显
function newCallback() {
  nextTick(() => {
    treeRef.value?.setCheckedKeys([])
  })
}

function editCallback(itemData: any) {
  nextTick(() => {
    const menuIds = mapMenuListToIds(itemData.menuList)
    treeRef.value?.setCheckedKeys(menuIds)
  })
}
</script>

<style scoped></style>
