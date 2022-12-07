<template>
  <div class="main-header">
    <div class="menu-icon" @click="handleMenuIconClick">
      <el-icon size="24px">
        <component :is="isFold ? 'Expand' : 'Fold'"></component>
      </el-icon>
    </div>
    <div class="content">
      <header-breadcrumb />
      <header-info />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HeaderBreadcrumb from './components/header-breadcrumb.vue'
import HeaderInfo from './components/header-info.vue'

// 内部自定义事件
const emit = defineEmits(['foldChange'])

const isFold = ref(false)
const handleMenuIconClick = () => {
  // 改变状态
  isFold.value = !isFold.value

  // 事件和状态传递出去
  emit('foldChange', isFold.value)
}
</script>

<style lang="less" scoped>
.main-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;

  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>
