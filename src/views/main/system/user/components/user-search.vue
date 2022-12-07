<template>
  <div class="search">
    <el-form :model="searchForm" ref="formRef" label-width="90px" size="large">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="用户名：" prop="name">
            <el-input v-model="searchForm.name" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名：" prop="realname">
            <el-input v-model="searchForm.realname" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="电话号码：" prop="cellphone">
            <el-input v-model="searchForm.cellphone" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态：" prop="enable">
            <el-select v-model="searchForm.enable" placeholder="请选择" style="width: 100%">
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间：" prop="createAt">
            <el-date-picker
              v-model="searchForm.createAt"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="btn">
      <el-button icon="Refresh" @click="handleResetClick">重置</el-button>
      <el-button type="primary" icon="Search" @click="handleQueryClick"> 查询 </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ElForm } from 'element-plus'
import { ref, reactive } from 'vue'

// 定义自定义事件
const emit = defineEmits(['queryClick', 'resetClick'])

// 定义form数据
const searchForm = reactive({
  name: '',
  realname: '',
  cellphone: '',
  enable: 1,
  createAt: ''
})

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
