<template>
  <div class="department">
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
    >
      <template #leader="scope">
        <span style="color: red">-{{ scope.row[scope.prop] }}-</span>
      </template>
      <template #parent="scope">-{{ scope.row[scope.prop] }}-</template>
    </page-content>
    <page-modal :modal-config="modalConfigRef" ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="department">
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageModal from '@/components/page-modal/page-modal.vue'

import searchConfig from './config/serach.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'

import { computed } from 'vue'
import useMainStore from '@/store/main/main'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'

// 对modalConfig进行操作
const modalConfigRef = computed(() => {
  const mainStore = useMainStore()
  const departments = mainStore.entireDepartments.map((item) => {
    return { label: item.name, value: item.id }
  })
  modalConfig.formItems.forEach((item: any) => {
    if (item.prop === 'parentId') {
      item.options.push(...departments)
    }
  })
  return modalConfig
})

// setup相同逻辑的抽取:hooks
// 点击查询，重置操作
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()

// 点击新建，编辑操作
const { modalRef, handleNewClick, handelEditClick } = usePageModal()
</script>

<style scoped></style>
