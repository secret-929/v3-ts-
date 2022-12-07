<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="!isEdit ? modalConfig.header.newTitle : modalConfig.header.editTitle"
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <template v-for="item in modalConfig.formItems" :key="item.prop">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input v-model="formData[item.prop]" :placeholder="item.placeholder" />
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="formData[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value"></el-option>
                  </template>
                </el-select>
              </template>
              <template v-if="item.type === 'custom'">
                <slot :name="item.slotName"></slot>
              </template>
            </el-form-item>
          </template>
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
import useSystemStore from '@/store/main/system/system'
import { reactive, ref } from 'vue'
// import type { IModalProps } from './type'

interface IModalProps {
  modalConfig: {
    pageName: string
    header: {
      newTitle: string
      editTitle: string
    }
    formItems: any[]
  }
  otherInfo?: any
}
const props = defineProps<IModalProps>()

// 定义内部属性
const initialData: any = {}
for (const item of props.modalConfig.formItems) {
  initialData[item.prop] = item.initialValue ?? ''
}
const dialogVisible = ref(false)
const formData = reactive<any>(initialData)

const isEdit = ref(true)
const editData = ref()

// 获取department数据
const systemStore = useSystemStore()

// 确定按钮
function handleConfirmClick() {
  dialogVisible.value = false

  let infoData = { ...formData }
  if (props.otherInfo) {
    infoData = { ...infoData, ...props.otherInfo }
  }

  if (isEdit.value && editData.value) {
    // 编辑
    systemStore.editPageDataAction(props.modalConfig.pageName, editData.value.id, infoData)
  } else {
    // 新增
    systemStore.newPageDataAction(props.modalConfig.pageName, infoData)
  }
}

// 定义设置dialogVisible方法
function setModalVisible(isNew: boolean = true, itemData?: any) {
  dialogVisible.value = true
  isEdit.value = !isNew
  if (!isNew && itemData) {
    // 编辑
    for (const key in formData) {
      formData[key] = itemData[key]
      editData.value = itemData
    }
  } else {
    for (const key in formData) {
      const item = props.modalConfig.formItems.find((item) => item.prop === key)
      formData[key] = item ? item.initialValue : ''
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
