<template>
  <page-wrapper>
    <div class="flex flex-col w-full gap-4">
      <div class="flex flex-col w-full gap-2 py-2">
        <div class="w-full flex gap-2">
          <div class="grow">
            <el-popover placement="bottom-start" :width="800" :visible="visible">
              <template #reference>
                <el-button color="rgb(17 94 89)" @click="visible = !visible" plain><v-icon name="co-filter" />Filter Katalog</el-button>
              </template>
              <div class="pb-2">
                <div class="flex justify-between">
                  <p class="text-gray-600 text-base"><v-icon name="co-filter" />Filter Katalog</p>
                  <el-button type="danger" size="small" @click="visible = false">
                    <el-icon class="el-icon--left" ><CircleCloseFilled /></el-icon>
                    Close
                  </el-button>
                </div>
              </div>
              <div class="w-full border-t py-4">
                <el-form class="w-full dark:text-slate-100" label-position="top">
                  <div class="flex flex-col gap-4">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
                      <el-form-item label="Nama Produk">
                        <el-input v-model="searchValue.nama_produk" placeholder="Masukan Nama Produk"/>
                      </el-form-item>
                      <el-form-item label="Harga Rent" prop="harga_rent">
                        <InputNumberV2 v-model="searchValue.harga_rent" placeholder="Input Harga Rent" clearable
                        :style="{ width: '100%' }"
                        :disabled="mode === 'detail'"
                        />
                      </el-form-item>                      <el-form-item label="Kode">
                        <el-input v-model="searchValue.kode" placeholder="Masukan Kode"/>
                      </el-form-item>
                      <el-form-item label="Ukuran Detail"> 
                        <MeasurementUnitDropdown
                          class="w-full"
                          v-model="searchValue.ukuran"
                        />
                      </el-form-item>
                      <el-form-item
                        v-for="(param, index) in visibleMeasurements()"
                        :key="param.id"
                        :label="param.name"
                        prop="measurement"
                        label-width="130px"
                      >
                        <InputNumberV2
                          v-model="param.value"
                          placeholder="Input Ukuran"
                          clearable
                          :style="{ width: '100%' }"
                          :disabled="mode === 'detail'"
                          @change="onMeasurementChange(param.id, param.value)"
                        />
                      </el-form-item>
                      <el-form-item label="Kategori" prop="product_category_id">
                        <CategoryDropdown v-model="searchValue.product_category_id" :style="{ width: '100%' }" />
                      </el-form-item>
                    </div>
                  </div>
                </el-form>
              </div>
            </el-popover>
          </div>
          <div class="flex-none">
            <el-button @click="exportToExcel" type="primary" class="w-20" >
              Export<el-icon class="el-icon--right"><Upload /></el-icon>
            </el-button>
            <el-button :icon="Refresh" circle @click="emit('reloadTable')" />
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
import {
  defineProps,
  onBeforeMount,
  reactive,
  ref,
  watch,
} from 'vue'
import MeasurementUnitDropdown from '/@/components/dropdown/MeasurementUnitDropdown.vue'
import useEventsBus from '/@/composables/useEventsBus'
import { Refresh, Upload, CircleCloseFilled } from '@element-plus/icons-vue'
import { FormProp } from '/@/types/pageProps'
import { SearchFilterProp } from '/@/types/searchFilter'
import InputNumberV2 from "/@/components/form/Inputs/InputNumberV2.vue";
import PageWrapper from '@/components/PageWrapper.vue'
import Table from './components/Table.vue'
import katalogStore from '/@/store/module/katalog'
import measurementUnitStore from '/@/store/module/measurementUnit'
import {measurementUnit} from "/@/types/measurementUnit";
import CategoryDropdown from "/@/components/dropdown/CategoryDropdown.vue";

const measurementStore = measurementUnitStore()
const store = katalogStore()
const {emit} = useEventsBus()
const visible = ref(false)
const props = defineProps<FormProp>()
const measurementList = ref([] as Array<any>)
const searchValue = reactive({
  search: '',
  nama_produk: undefined,
  harga_rent: undefined,
  kode: undefined,
  ukuran: undefined,
  product_category_id: undefined,
  measurements: [],
} as SearchFilterProp);

const exportToExcel = () => {
  store.downloadFile(searchValue);
}

const onMeasurementChange = (param, value) => {
  if (value) {
    searchValue.measurements = searchValue.measurements.filter(measurement => measurement.id !== param);
    searchValue.measurements = [
      { id: param, value: value },
      ...searchValue.measurements
    ];
  }
};

const visibleMeasurements = () => {
  return measurementList.value.filter(x => searchValue?.ukuran?.includes(x.id))
}

watch(() => searchValue.ukuran, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    // Filter out measurements that are not in the new ukuran array
    searchValue.measurements = searchValue.measurements.filter(measurement => newValue.includes(measurement.id));
  }
});

onBeforeMount(() => {
  // if (visibleMeasurements) {
    measurementStore.fetchList((list: Array<measurementUnit>) => {
      measurementList.value = list.map(measurement => ({ ...measurement, value: 0 }))
      console.log(measurementList)
    })
  // }
})
</script>