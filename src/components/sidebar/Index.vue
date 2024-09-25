<template>
  <div class="flex">
    <!-- Backdrop -->
    <div
      :class="isOpen ? 'block' : 'hidden'"
      class="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden"
      @click="isOpen = false"
    />
    <!-- End Backdrop -->

    <div
      :class="isOpen ? 'translate-x-0 ease-in ease-out static inset-0 fixed lg:relative' : '-translate-x-full fixed'"
      class="flex flex-col gap-4 inset-y-0 left-0 z-30 w-64 transition duration-300 bg-gray-800"
    >
      <div class="flex items-center justify-center">
        <div class="flex items-center p-4">
          <!-- <img :src='logo' class="h-12" /> -->
          <span class="mx-2 text-2xl font-semibold text-primary mr-3">{{ appName }}</span>
        </div>
        <div class="relative -right-7 -top-0 z-10 rounded-full hidden lg:block" @click="isOpen = false" v-if="isOpen">
          <el-button
            class="collapse-button"
            type="primary"
            size="small"
            :icon="ArrowLeftBold"
            circle
          />
        </div>
      </div>
      <nav v-loading="store.loading" :class="{'overflow-y-auto h-auto mb-5': store.menuItems.length > 0}">
        <el-menu
          text-color="black"
          :default-active="activePath"
          :collapse="!isOpen"
          :router="true"
          @open="handleOpen"
          @close="handleClose"
        >
          <template v-for="(menu, index) of store.menuItems" :key="index">
            <menu-item
              :label="menu.title"
              :index="menu.id"
              :children="menu.children"
              :url="menu.url"
              :icon="menu.icon"
            />
          </template>
        </el-menu>
      </nav>
      <div class="flex justify-center absolute inset-x-0 bottom-0 bg-neutral-600 p-2">
        <p class="text-white font-semibold text-xs">&#169;Copyright 2024 </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useSidebar } from '/@/composables/useSidebar';
import MenuItem from "@/components/Sidebar/MenuItem.vue";
import {
  ArrowLeftBold
} from '@element-plus/icons-vue';
import { useRoute } from 'vue-router';
import menuStore from '/@/store/module/menu'; // Import your store

const route = useRoute();
const activeRoute = ref(route);
const activePath = ref("");
const store = menuStore();
const appName = import.meta.env.VITE_APP_TITLE;
const { isOpen } = useSidebar();
 // Initialize your store

function handleOpen(key: string, keyPath: string[]) {
  console.log(key, keyPath);
}

function handleClose(key: string, keyPath: string[]) {
  console.log(key, keyPath);
}

watch(() => activeRoute.value, (routeVal) => {
  const removedPaths = [
    "/create",
    "/update",
    "/detail",
  ];
  activePath.value = routeVal.path;
  for (let path of removedPaths) {
    activePath.value = activePath.value.split(path)[0];
  }
}, { deep: true });
</script>