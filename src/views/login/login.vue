<template>
  <div class="login flex-center">
    <div
      class="
        login-panel
        animate__animated animate__bounceInDown
        flex-column
        animate__bounceOutDown
      "
    >
      <header class="flex-column-left">
        <i class="iconfont icon-login"></i>
        <span>终端登录</span>
      </header>
      <el-form
        ref="formRef"
        :model="account"
        label-width="70px"
        label-position="left"
        :rules="rules"
        @click="handleAnimationClick"
      >
        <el-form-item prop="name" class="flex-column">
          <el-input
            v-model="account.name"
            :index="1"
            :class="{
              animation: currentIndex === 1,
              'animation-prefix': account.name
            }"
          >
            <template #prefix> 账号</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password" class="flex-column">
          <el-input
            v-model="account.password"
            :index="2"
            type="password"
            :class="{
              animation: currentIndex === 2,
              'animation-prefix': account.password
            }"
          >
            <template #prefix> 密码</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="validation" class="validation">
          <el-input
            v-model="account.validation"
            :index="3"
            :class="{
              animation: currentIndex === 3,
              'animation-prefix': account.validation
            }"
          >
            <template #prefix> 验证码</template>
          </el-input>
          <loginValidation @identify="identify" />
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="handleLoginClick"
            class="login-btn"
            :loading="loading"
            >立即登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
  <loginBackground />
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onBeforeUnmount } from 'vue'

import loginBackground from './cpns/login-background.vue'
import loginValidation from './cpns/login-validation.vue'

import localCache from '@/utils/cache'

import { rules } from './config/account-config'
import index from '@/store'

export default defineComponent({
  name: 'login',
  components: {
    loginBackground,
    loginValidation
  },
  setup() {
    const currentIndex = ref(0)
    const isKeepPassword = ref(true)
    const loading = ref(false)
    const formRef = ref()
    const identifyCode = ref('')
    const account = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? '',
      validation: ''
    })
    //获取验证码
    const identify = (identify: string) => {
      identifyCode.value = identify
    }
    //选中input出现动画效果
    const handleAnimationClick = (e: any) => {
      currentIndex.value = parseInt(e.target.getAttribute('index'))
    }
    const handleLoginClick = () => {
      console.log(account.validation, identifyCode.value)
      formRef.value?.validate((valid: never) => {
        if (valid) {
          if (account.validation === identifyCode.value) {
            loading.value = true
            // 1.判断是否需要记住密码
            if (isKeepPassword.value) {
              // 本地缓存
              localCache.setCache('name', account.name)
              localCache.setCache('password', account.password)
            } else {
              localCache.deleteCache('name')
              localCache.deleteCache('password')
            }

            // 2.开始进行登录验证
            // store.dispatch('login/accountLoginAction', { ...account })
          }
        }
      })
    }
    return {
      currentIndex,
      isKeepPassword,
      loading,
      formRef,
      account,
      rules,
      identify,
      handleAnimationClick,
      handleLoginClick
    }
  }
})
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: linear-gradient(
    to top,
    rgb(238, 238, 238) 60%,
    rgb(78, 100, 217) 40%
  );

  .login-panel {
    width: 360px;
    height: 425px;
    margin-bottom: 90px;
    box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2),
      0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 3px;
    animation-duration: 1s;
    background-color: #ffffff;
    transition: box-shadow 0.25s;

    &:hover {
      box-shadow: 1px 4px 8px 0 rgba(0, 0, 0, 0.2),
        1px 3px 6px 0 rgba(0, 0, 0, 0.19) !important;
    }
  }
}

.animate__bounceInDown {
  animation: bounceInDown;
}

.animate__bounceOutDown {
  animation: bounceOutDown;
}

header {
  flex: 0 0 25%;
  padding-left: 25px;
  background-color: rgb(63, 81, 181);
  color: #ffffff;

  .icon-login {
    width: 40px;
    height: 40px;

    &::before {
      font-size: 40px;
    }
  }

  span {
    font-weight: bold;
    padding-top: 8px;
    display: inline-block;
    font-size: 12px;
  }
}

.animation {
  &::before {
    transform: scale(1, 0.8) !important;
  }

  ::v-deep .el-input__prefix {
    top: -45%;
    color: #3f51b5;
    font-size: 12px;
  }
}

.animation-prefix {
  ::v-deep .el-input__prefix {
    top: -45%;
    font-size: 12px;
  }
}

.el-form {
  padding: 25px;
  flex: 0 0 80%;

  .el-input {
    position: relative;

    &::before {
      content: '';
      display: inline-block;
      position: absolute;
      top: 99%;
      width: 100%;
      transform: scale(0);
      height: 2px;
      z-index: 999;
      border-radius: 2px;
      background: rgb(63, 81, 181);
      transition: all ease-in-out 0.2s;
    }

    ::v-deep .el-input__prefix {
      left: 0;
      transition: all ease 0.3s;
    }
  }

  ::v-deep .el-form-item__content {
    margin-left: 0 !important;
  }

  ::v-deep .el-form-item__label {
    position: absolute;
    z-index: 999;
  }

  ::v-deep .el-input__inner {
    border-top: none;
    border-left: none;
    border-right: none;
    border-radius: 0;
    padding: 0;
    z-index: 1;
    position: relative;
    background: transparent;

    &:hover {
      border-color: #dcdfe6;
    }

    &:focus {
      border-color: #dcdfe6;
    }
  }

  .validation {
    ::v-deep .el-form-item__content {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .login-btn {
    width: 100%;
    background-color: rgb(78, 100, 217);
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 14%),
      0 3px 1px -2px rgba(0, 0, 0, 20%), 0 1px 5px 0 rgba(0, 0, 0, 12%);
  }
}
</style>
