<template>
  <div class="department">
    <page-search @query-click="handleQueryClick" @reset-click="handleResetClick" />
    <page-content ref="contentRef" @new-click="handleNewClick" @edit-click="handelEditClick" />
    <page-model ref="modelRef" />
  </div>
</template>

<script setup lang="ts" name="department">
import PageSearch from './components/page-search.vue'
import PageContent from './components/page-content.vue'
import PageModel from './components/page-modal.vue'
import { ref } from 'vue'

const contentRef = ref<InstanceType<typeof PageContent>>()
// 查询
function handleQueryClick(queryInfo: any) {
  contentRef.value?.fetchPageListData(queryInfo)
}

// 重置
function handleResetClick() {
  contentRef.value?.fetchPageListData()
}

const modelRef = ref<InstanceType<typeof PageModel>>()
// 新建
function handleNewClick() {
  modelRef.value?.setModalVisible()
}

// 编辑
function handelEditClick(itemData: any) {
  modelRef.value?.setModalVisible(false, itemData)
}
</script>

<style scoped>
.department {
}
</style>
