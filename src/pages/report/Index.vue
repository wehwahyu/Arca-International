<template>
  <page-wrapper>
    <div class="flex flex-col w-full gap-4">
      <div class="flex flex-col w-full gap-2 py-2">
        <div class="w-full flex gap-2">
          <div class="flex-none">
            <el-button @click="exportToExcel" type="primary" class="w-20" >
              Export<el-icon class="el-icon--right"><Upload /></el-icon>
            </el-button>
          </div>
        </div>
      </div>
      <div class="border rounded-lg overflow-hidden">
        <Table :search-value="searchValue" />
      </div>
    </div>
  </page-wrapper>
</template>

<script setup lang="ts">
import {Upload} from '@element-plus/icons-vue'
import PageWrapper from '@/components/PageWrapper.vue'
import Table from './components/Table.vue'
</script>