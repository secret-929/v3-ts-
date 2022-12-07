<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="!isEdit ? '新建部门' : '编辑部门'"
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <el-form-item label="部门名称" prop="name">
            <el-input v-model="formData.name" placeholder="请输入部门名称" />
          </el-form-item>
          <el-form-item label="部门领导" prop="leader">
            <el-input v-model="formData.leader" placeholder="请输入部门领导" />
          </el-form-item>
          <el-form-item label="选择部门" prop="parentId">
            <el-select v-model="formData.parentId" placeholder="请选择部门" style="width: 100%">
              <template v-for="item in entireDepartments" :key="item.id">
                <el-option :value="item.id" :label="item.name" />
              </template>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import useMainStore from '@/store/main/main'
import useSystemStore from '@/store/main/system/system'
import { storeToRefs } from 'pinia'
import { reactive, ref } from 'vue'

const dialogVisible = ref(false)
const formData = reactive<any>({
  name: '',
  leader: '',
  parentId: ''
})
const isEdit = ref(true)
const editData = ref()

const mainStore = useMainStore()
const systemStore = useSystemStore()
const { entireDepartments } = storeToRefs(mainStore)

// 确定按钮
function handleConfirmClick() {
  dialogVisible.value = false
  if (isEdit.value && editData.value) {
    // 编辑
    systemStore.editPageDataAction('department', editData.value.id, formData)
  } else {
    // 新增
    systemStore.newPageDataAction('department', formData)
  }
}

// 定义设置dialogVisible方法
function setModalVisible(isNew: boolean = true, itemData?: any) {
  dialogVisible.value = true
  isEdit.value = !isNew
  if (!isNew && itemData) {
    for (const key in formData) {
      formData[key] = itemData[key]
      editData.value = itemData
    }
  } else {
    for (const key in formData) {
      formData[key] = ''
    }
    editData.value = null
  }
}

defineExpose({ setModalVisible })
</script>

<style lang="less" scoped>
.form {
  padding: 10px 30px;
}
</style>
