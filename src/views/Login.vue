<template>
  <div class="flex items-center justify-center h-screen bg-gradient-to-r from-second to-primary">
    <div class="flex bg-gray-800 rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl py-6">
      <div class="hidden lg:block lg:w-3/5 bg-cover pl-8 pt-6">
        <img :src="bg" />
      </div>
      <div class="w-full p-8 lg:w-1/2">
        <div class="flex items-center justify-center gap-2">
          <p class="text-2xl text-primary font-semibold">{{ appTitle }}</p>
        </div>
        <div class="mt-4 mb-2 flex items-center justify-between">
            <span class="border-b w-1/5 lg:w-1/4"></span>
            <a class="text-xs text-center text-gray-300 uppercase">login</a>
            <span class="border-b w-1/5 lg:w-1/4"></span>
        </div>
      <el-form
          :model="loginForm"
          :rules="loginRules"
          label-position="top"
          class="login-form"
          ref="formRef"
          v-loading="store.loading"
          @submit.prevent="submitLoginForm"
      >
        <el-form-item label="Username" prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="Username"
            size="large"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input
            v-model="loginForm.password"
            placeholder="Password"
            size="large"
            clearable
            :type="passwordVisible ? 'text' : 'password'"
          >
            <template #append>
              <el-button
                text
                :icon="passwordVisible ? Hide : View"
                @click="passwordVisible = !passwordVisible"
              />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <button
            class="w-full px-4 py-2 text-sm text-center text-white bg-blue-500 rounded-md focus:outline-none hover:bg-indigo-700"
          >
            Sign in
          </button>
        </el-form-item>
        <div class="text-xs text-gray-500 font-bold text-center">
          Version
          <span class="italic">{{ appVersion }}</span>
        </div>
      </el-form>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'
import { useRouter } from 'vue-router'
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus';
import { View, Hide } from '@element-plus/icons-vue'
import logo from '/@/assets/images/logo.png';
import bg from '/@/assets/images/login.png';
import authStore from "/@/store/module/auth";
import useStore from "/@/store/module/permission";

const appName = import.meta.env.VITE_APP_TITLE;
const router = useRouter()
const permissionStore = useStore();
const store = authStore();
const passwordVisible = ref(false);
const appTitle = import.meta.env.VITE_APP_TITLE || "Inventory";
const appVersion = import.meta.env.VITE_APP_VERSION || "v.0.0.0";

const formRef = ref()
const loginForm = ref({
  username: '',
  password: '',
});

const loginRules = {
  username: [
    { required: true, message: 'Username is required', trigger: 'change' },
    {
      pattern: /^[a-zA-Z0-9_]+$/,
      message: 'Username can only contain letters, numbers, and underscores',
      trigger: 'change',
    },
  ],
  password: [
    { required: true, message: 'Password is required', trigger: 'change' },
    {
      min: 3,
      message: 'Password must be at least 3 characters long',
      trigger: 'change',
    },
    {
      pattern: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d@#$%^&*()_+!-]*$/,
      message: 'Password must contain at least one letter and one number',
      trigger: 'change',
    }
  ],
};

const submitLoginForm = () => {
  formRef.value.validate((valid: any) => {
    if (!valid) return
    store.login(loginForm.value, (res: any) => {
      permissionStore.fetchAuthorizeData((res: any) => {
        if (res.isSuccess) {
          router.push('/')
        }
      })
    })
  })
};
</script>

<style>
  .login-form {
    @apply flex flex-col gap-4 !important;
  }
  .login-form label {
    @apply font-light !important;
  }
  .login-form label:before {
    content: "" !important;
    @apply mr-0 !important;
  }
  .login-form .el-form-item__error {
    @apply italic relative !important;
  }
</style>
