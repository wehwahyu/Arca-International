<template>
  <el-button :icon="Search" @click="visible = true" class="mr-2" round>Quick Search...</el-button>

  <el-dialog v-model="visible" :show-close="false">
    <template #header="{ close, titleId, titleClass }">
      <div class="grid grid-cols-4 bg-[#2c2e83]">
        <el-input
          v-model="searchTerm"
          :id="titleId" 
          :class="titleClass"
          class="col-span-3 w-12 h-12 px-2 mt-4 ml-4 m,m, mmm"
          size="large"
          placeholder="Search"
          :prefix-icon="Search"
          @input="filterItems"
        />
        <div class="grid justify-items-end p-7">
          <el-button type="danger" size="small" @click="close">esc
          </el-button>
        </div>
      </div>
    </template>
    <div class="text-[#2c2e83]">
      <p class="flex font-semibold text-lg ml-3 my-1 items-center">
        <v-icon name="bi-clock-history" class="w-6 h-6 mr-1" />
        Recent
      </p>
    </div>
    <!-- Body of the dialog -->
    <el-scrollbar height="400px" class="mb-8">
      <div v-for="item in filteredItems" :key="item" class="bg-white rounded-md shadow-xl my-2 mx-3 hover:bg-[#00A2E9] hover:text-white">
        <p class="flex items-center h-16 mx-3 text-sm justify-between">
          <span>{{ item }}</span>
          <button class="focus:outline-none"><v-icon name="bi-x" class="w-8 h-8" /></button>
        </p>
      </div>
    </el-scrollbar>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { ElButton, ElDialog } from 'element-plus';
import { Search } from '@element-plus/icons-vue';

const visible = ref(false);
const items = ref(['SAMHUMAT', 'SHP01', 'SHP05', 'Samhumat Premium', 'Borohumat Liquid', 'BRH01', 'BRH05', 'ARTHAHUAMAT', 'ART001', 'ART005']);
const searchTerm = ref('');

const filteredItems = computed(() => {
  const term = searchTerm.value.toLowerCase();
  return items.value.filter(item => item.toLowerCase().includes(term));
});

function filterItems() {
  // The filteredItems computed property will automatically update based on the searchTerm
}

</script>

<style scoped>
.el-input__wrapper {
  @apply shadow-none !important;
}
</style>
