<template>
  <page-wrapper>
    <template #buttons>
      <el-button
        type="default"
        class="[&&]:px-14"
        @click="clearFormData"
      >
        Clear
      </el-button>
      <el-button
        type="success"
        class="[&&]:px-14"
        @click="saveData"
        v-if="metaData.mode !== 'detail'"
      >
        Save
      </el-button>
    </template>
    <template #content>
      <el-card body-class="flex flex-col gap-4 w-full [&&]:p-0">
        <FormData
          :id="detailId"
          :mode="metaData.mode"
          :pageTitle="metaData.pageTitle"
        />
        <Table />
      </el-card>
    </template>
  </page-wrapper>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {useRoute} from 'vue-router'

import useEventsBus from '/@/composables/useEventsBus'

import PageWrapper from '@/components/PageWrapper.vue'

/*Component*/
import Table from "./components/Table.vue";
import saleStore from "/@/store/module/sale";
import {ElMessage} from "element-plus";
import FormData from "/@/pages/dashboard/components/FormData.vue";

const {emit} = useEventsBus()

const route = useRoute()
const metaData = ref(route.meta)
const detailId = ref(route.params.id)
const store = saleStore()

const clearFormData = () => {
  store.clearData()
  ElMessage.success("Data Cleared!")
}
const saveData = () => {
  store.saveData()
  ElMessage.success("Data Saved!")
}
</script>
