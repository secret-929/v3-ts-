<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <div class="tabs">
      <el-tabs v-model="activeName" type="border-card" stretch>
        <el-tab-pane name="account">
          <template #label>
            <span class="custom-tabs-label">
              <el-icon><UserFilled /></el-icon>
              <span class="text">帐号登录</span>
            </span>
          </template>
          <PaneAccount ref="accountRef" />
        </el-tab-pane>
        <el-tab-pane name="phone">
          <template #label>
            <span class="custom-tabs-label">
              <el-icon><Cellphone /></el-icon>
              <span class="text">手机登录</span>
            </span>
          </template>
          <PanePhone />
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="controls">
      <el-checkbox v-model="isRemPwd" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button class="login-btn" type="primary" size="large" @click="handleLoginBtnClick"
      >立即登录
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { localCache } from '@/utils/cache'
import { ref, watch } from 'vue'
import PaneAccount from './pane-account.vue'
import PanePhone from './pane-phone.vue'

const isRemPwd = ref<boolean>(localCache.getCache('isRemPwd') ?? false)

watch(isRemPwd, (newValue) => {
  console.log(newValue)
  localCache.setCache('isRemPwd', newValue)
})
const activeName = ref('account')
const accountRef = ref<InstanceType<typeof PaneAccount>>() // 类的实例的类型

const handleLoginBtnClick = () => {
  if (activeName.value === 'account') {
    accountRef.value?.loginAction(isRemPwd.value)
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }

  .custom-tabs-label {
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      margin-left: 5px;
    }
  }

  .controls {
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
    // --el-button-size: 42px;
  }
}
</style>
