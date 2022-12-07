<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="!isEdit ? '新建用户' : '编辑用户'"
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="formData.name" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="真实姓名" prop="realname">
            <el-input v-model="formData.realname" placeholder="请输入真实姓名" />
          </el-form-item>
          <el-form-item label="登录密码" prop="password" v-if="!isEdit">
            <el-input v-model="formData.password" placeholder="请输入登录密码" type="password" />
          </el-form-item>
          <el-form-item label="手机号码" prop="cellphone">
            <el-input v-model="formData.cellphone" placeholder="请输入手机号码" />
          </el-form-item>
          <el-form-item label="选择角色" prop="roleId">
            <el-select v-model="formData.roleId" placeholder="请选择角色" style="width: 100%">
              <template v-for="item in entireRoles" :key="item.id">
                <el-option :value="item.id" :label="item.name" />
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="选择部门" prop="deparmentId">
            <el-select v-model="formData.departmentId" placeholder="请选择部门" style="width: 100%">
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
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
})
const isEdit = ref(true)
const editData = ref()

const mainStore = useMainStore()
const systemStore = useSystemStore()
const { entireRoles, entireDepartments } = storeToRefs(mainStore)

// 确定按钮
function handleConfirmClick() {
  dialogVisible.value = false
  if (isEdit.value && editData.value) {
    systemStore.editUserDataAction(editData.value.id, formData)
  } else {
    systemStore.newUserDataAction(formData)
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
