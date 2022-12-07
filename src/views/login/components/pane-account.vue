<template>
  <div class="pane-account">
    <el-form ref="formRef" :model="account" :rules="accountRules" label-width="60px" status-icon>
      <el-form-item label="帐号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { ElForm, FormRules } from 'element-plus'
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import useLoginStore from '@/store/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'

const CACHE_NAME = 'name'
const CACHE_PASSWORD = 'password'

const account = reactive<IAccount>({
  name: localCache.getCache('name') ?? '',
  password: localCache.getCache('password') ?? ''
})

const accountRules: FormRules = {
  name: [
    { required: true, message: '填帐号', trigger: 'blur' },
    { pattern: /^[a-z0-9]{3,12}$/, message: '3-12位数字字母', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '填密码', trigger: 'blur' },
    { pattern: /^[a-z0-9]{3,}$/, message: '三位以上', trigger: 'blur' }
  ]
}

const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()
const loginAction = (isRemPwd: boolean) => {
  formRef.value?.validate((vaild) => {
    if (vaild) {
      const name = account.name
      const password = account.password
      loginStore.loginAccountAction({ name, password }).then(() => {
        // 记住密码
        if (isRemPwd) {
          localCache.setCache(CACHE_NAME, name)
          localCache.setCache(CACHE_PASSWORD, password)
        } else {
          localCache.removeCache(CACHE_NAME)
          localCache.removeCache(CACHE_PASSWORD)
        }
      })
    } else {
      ElMessage.error('Oops, 输入有问题')
    }
  })
}

defineExpose({
  loginAction
})
</script>

<style lang="less" scoped>
.pane-account {
  color: red;
}
</style>
