<template>
  <div class="search" v-if="isQuery">
    <el-form
      :model="searchForm"
      ref="formRef"
      :label-width="searchConfig.labelWidth ?? '90px'"
      size="large"
    >
      <el-row :gutter="20">
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input v-model="searchForm[item.prop]" :placeholder="item.placeholder" />
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="searchForm[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value"></el-option>
                  </template>
                </el-select>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="btn">
      <el-button icon="Refresh" @click="handleResetClick">重置</el-button>
      <el-button type="primary" icon="Search" @click="handleQueryClick"> 查询 </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import usePermissions from '@/hooks/usePermissions'
import type { ElForm } from 'element-plus'
import { ref, reactive } from 'vue'

interface Iprops {
  searchConfig: {
    pageName: string
    labelWidth?: string
    formItems: any[]
  }
}
// 定义自定义事件
const emit = defineEmits(['queryClick', 'resetClick'])
const props = defineProps<Iprops>()

// 获取权限
const isQuery = usePermissions(`${props.searchConfig.pageName}:query`)

// 定义form数据
const initialForm: any = {}
for (const item of props.searchConfig.formItems) {
  initialForm[item.prop] = item.initialValue ?? ''
}
const searchForm = reactive(initialForm)

// 重置
const formRef = ref<InstanceType<typeof ElForm>>()
const handleResetClick = () => {
  formRef.value?.resetFields()
  emit('resetClick')
}
// 查询
const handleQueryClick = () => {
  emit('queryClick', searchForm)
}
</script>

<style lang="less" scoped>
.search {
  background-color: #fff;
  padding: 20px;

  .el-form-item {
    padding: 20px;
    margin-bottom: 0;
  }
}

.btn {
  text-align: right;
  padding-right: 20px;
}
</style>
