<template>
  <div class="user">
    <user-search @query-click="handleQueryClick" @reset-click="handleResetClick" />
    <user-content ref="contentRef" @new-click="handleNewClick" @edit-click="handleEditClick" />
    <user-modal ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="user">
import { ref } from 'vue'
import UserContent from './components/user-content.vue'
import UserSearch from './components/user-search.vue'
import UserModal from './components/user-modal.vue'

const contentRef = ref<InstanceType<typeof UserContent>>()
const modalRef = ref<InstanceType<typeof UserModal>>()

function handleQueryClick(formData: any) {
  contentRef.value?.fetchUserListData(formData)
}

function handleResetClick() {
  contentRef.value?.fetchUserListData()
}

function handleNewClick() {
  modalRef.value?.setModalVisible()
}

function handleEditClick(itemData: any) {
  modalRef.value?.setModalVisible(false, itemData)
}
</script>

<style lang="less" scoped>
.user {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;

  .el-form-item {
    padding: 20px 40px;
    margin-bottom: 0;
  }
}
</style>
