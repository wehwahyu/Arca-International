<template>
  <div
    class="flex items-center justify-between px-6 py-3 bg-primary border-b-4 border-neutral-500"
  >
    <div class="flex items-center">
      <button
        class="text-white focus:outline-none"
        v-if="!isOpen"
        @click="isOpen = true"
      >
        <svg
          class="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6H20M4 12H20M4 18H11"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
        <template v-for="(item, index) in routeList" :key="index">
          <el-breadcrumb-item class="custom-breadcrumb" v-if="item">
            <router-link :to="item.path">
              {{ camelPad(item.name) }}
            </router-link>
          </el-breadcrumb-item>
        </template>
      </el-breadcrumb>

    </div>
<!--    <div class="flex items-center">-->
<!--      <div class="relative">-->
<!--        <button-->
<!--          class="relative z-10 block w-10 h-10 overflow-hidden rounded-full shadow focus:outline-none focus:ring focus:border-white"-->
<!--          @click="dropdownUserOpen = !dropdownUserOpen"-->
<!--        >-->
<!--          <img-->
<!--          v-if="user.profile_photo_url"-->
<!--          :src="user.profile_photo_url"-->
<!--          alt="User Profile"-->
<!--          class="w-10 h-10 overflow-hidden rounded-full shadow bg-gray-100"-->
<!--          style="object-fit: cover; color: gray"-->
<!--          />-->
<!--          <img-->
<!--            v-else-->
<!--            src="/src/assets/images/default.png"-->
<!--            alt="Default User Profile"-->
<!--            class="w-10 h-10 overflow-hidden rounded-full shadow bg-gray-100"-->
<!--            style="object-fit: cover; color: gray"-->
<!--          />-->
<!--        </button>-->

<!--        <div-->
<!--          v-show="dropdownUserOpen"-->
<!--          class="fixed inset-0 z-10 w-full h-full"-->
<!--          @click="dropdownUserOpen = false"-->
<!--        />-->

<!--        <transition-->
<!--          enter-active-class="transition duration-150 ease-out transform"-->
<!--          enter-from-class="scale-95 opacity-0"-->
<!--          enter-to-class="scale-100 opacity-100"-->
<!--          leave-active-class="transition duration-150 ease-in transform"-->
<!--          leave-from-class="scale-100 opacity-100"-->
<!--          leave-to-class="scale-95 opacity-0"-->
<!--        >-->
<!--          <div-->
<!--            v-show="dropdownUserOpen"-->
<!--            class="absolute right-0 z-20 w-80 bg-white rounded-md shadow-xl"-->
<!--          >-->
<!--            <profile />-->
<!--            <div-->
<!--              @click="logout"-->
<!--              class="block px-6 py-2 text-base text-gray-700 hover:rounded-b-lg hover:bg-gray-500 hover:text-white cursor-pointer"-->
<!--            >-->
<!--            <v-icon name="md-logout-outlined" />-->
<!--              Log out-->
<!--            </div>-->
<!--          </div>-->
<!--        </transition>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useSidebar } from '../composables/useSidebar';
import { useRouter } from 'vue-router';
import { ArrowRight } from '@element-plus/icons-vue';
import { camelPad, getCurrentRoute } from '/@/helper/Helper';
// import authStore from '/@/store/module/auth';
import Profile from './Profile.vue';

// const store = authStore();
const router = useRouter();
const routeList = ref([]);
const dropdownBellOpen = ref(false);
const dropdownUserOpen = ref(false);
const { isOpen } = useSidebar();

// const logout = () => {
//   store.logout(() => {
//     router.push('/login').then(() => {});
//   });
// };

const user = ref({
  profile_photo_url: '',
});

// watch(
//   () => router.currentRoute.value,
//   (to, from) => {
//     routeList.value = getCurrentRoute(router);
//     dropdownBellOpen.value = false;
//     dropdownUserOpen.value = false;
//   }
// );

onMounted(() => {
  // store.getProfile();
  routeList.value = getCurrentRoute(router);
});

// watch(() => store.user, (newUser) => {
//   user.value = {
//     profile_photo_url: newUser.profile_photo_url || '',
//   };
// });
</script>

<style>
.el-breadcrumb__inner {
  @apply text-gray-600 duration-200 !important;
}

.el-breadcrumb__inner a, .el-breadcrumb__inner.is-link {
  @apply text-gray-600 !important;
}

.el-breadcrumb__inner:hover {
  @apply text-gray-600 !important;
}

.el-breadcrumb__separator {
  @apply text-gray-600 !important;
}
</style>