<template>
  <div class="flex items-center px-4 py-3 border-b-2 border-gray-200 bg-white w-full rounded-t-md">
      <img
        v-if="user.profile_photo_url"
        :src="user.profile_photo_url"
        alt="User Profile"
        class="w-16 h-16 overflow-hidden rounded-full shadow-xl"
        style="object-fit: cover; color: gray"
      />
      <img
          v-else
          src="/src/assets/images/default.png"
          alt="Default User Profile"
          class="w-16 h-16 overflow-hidden rounded-full bg-slate-300 shadow-xl"
          style="object-fit: cover; color: gray"
        />
    <div class="grid grid-cols-3 ml-4 gap-2">
      <p class="col-span-3 text-xl font-semibold">{{ user.name }}</p>
      <v-icon v-if="user.gudang_label" name="md-warehouse-outlined" />
      <p v-if="isAdminWarehouse" class="col-span-2 -ml-10">{{ user.gudang_label }}</p>
      <el-tag class="col-span-2" type="primary" effect="plain" size="large">
      {{ user.role_name.join(', ') }}
    </el-tag>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import authStore from '/@/store/module/auth';

const store = authStore();

const user = ref({
  name: '',
  gudang_label: '',
  role_name: [],
  profile_photo_url: '',
});

onMounted(() => {
  store.getProfile();
});

watch(() => store.user, (newUser) => {
  user.value = {
    name: newUser.name,
    gudang_label: newUser.gudang_label,
    role_name: newUser.role_name || [],
    profile_photo_url: newUser.profile_photo_url || '',
  };
});

const isAdminWarehouse = computed(() => user.value.role_name.includes('Admin Warehouse'));
// console.log(user.value)
</script>

