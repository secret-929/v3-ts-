<template>
  <div class="chart-card">
    <el-card class="box-card" :header="header">
      <slot>默认内容</slot>
    </el-card>
  </div>
</template>

<script setup lang="ts">
interface Iprops {
  header?: string
}

withDefaults(defineProps<Iprops>(), {
  header: '标题'
})
</script>

<style lang="less" scoped>
.chart-card {
  color: red;
}
</style>
