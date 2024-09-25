<template>
  <div class="flex flex-col w-full gap-2" v-loading="store.loading">
    <el-table :data="store.tableData.data" :fit="true" :table-layout="'auto'" stripe>
      <el-table-column prop="kode" label="Kode Item" width="100px"/>
      <el-table-column prop="nama" label="Nama Produk" width="160px"/>
      <el-table-column prop="deskripsi" label="Deskripsi Produk" width="180px"/>
      <el-table-column prop="harga_rent" label="Harga Rent" width="100px">
        <template #default="scope">
          {{ (scope.row.harga_rent) ?currencyFormat(scope.row.harga_rent) : 0 }}
        </template>
      </el-table-column>
      <el-table-column prop="size_label" label="Size" width="60px" /> 
      <el-table-column label="Ukuran" align="center">
        <el-table-column 
          align="right" 
          v-for="(param) in measurementStore.list"
          :key="param.id"
          :label="param.name" 
          prop="measurement"
        >
          <template #header>
            <div class="flex flex-col h-20 justify-between">
              <div class="text-sm font-bold">{{ param['name'] }}</div>
            </div>
          </template>
          <template #default="scope">
            <div>
              {{ getHasilUji(param.id, scope.row.measurements).result}}
            </div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="note" label="Note" />
    </el-table>
    <el-pagination
      v-model:current-page="store.tableData.current_page"
      v-model:page-size="store.tableData.per_page"
      :page-sizes="[10, 50, 100, 200, 500]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="store.tableData.total"
      @size-change="sizeChange"
      @current-change="changePage"
    />
    <remove-data-dialog
      :api-route="apiRoute"
      :id="deletedId"
      :visible="dialogVisible"
      v-on:update:visible="(e) => { dialogVisible = e}"
      @reloadData="fetchData"
    />
  </div>
</template>

<script setup lang="ts">
import {
  defineProps,
  onBeforeMount,
  onMounted,
  PropType,
  ref,
  watch,
} from 'vue'

import useEventsBus from '/@/composables/useEventsBus'
import { SearchFilter } from '/@/types/searchFilter'
import katalogStore from '/@/store/module/katalog'
import RemoveDataDialog from '/@/components/dialog/RemoveDataDialog.vue'
import measurementUnitStore from '/@/store/module/measurementUnit'
import { apiRoute } from './FormHelper'
import { currencyFormat } from '/@/helper/FormattedValue'

const measurementStore = measurementUnitStore()
const store = katalogStore()
const {bus} = useEventsBus()
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const order = ref('asc');
const dialogVisible = ref(false)
const deletedId = ref()

const { searchValue }: SearchFilter = defineProps(['searchValue']);

/**
 * Change the page.
 * @param pageNumber
 */
const changePage = (pageNumber: number) => {
  store.tableData.current_page = pageNumber
  fetchData()
}
const sizeChange = (number: number) => {
  store.tableData.per_page = number
  fetchData()
}

/**
 * fetch data
 */
const fetchData = () => {
  // set dialog visibility to false
  dialogVisible.value = false;
  // set query params
  let formData = {
    page: store.tableData.current_page,
    // column: sortedColumn,
    order: order.value,
    per_page: store.tableData.per_page,
    nama_produk: searchValue.nama_produk,
    harga_rent: searchValue.harga_rent,
    ukuran: searchValue.ukuran,
    kode: searchValue.kode,
    product_category_id: searchValue.product_category_id,
    measurements: searchValue.measurements,
  }
  // call data
  store.fetchDataTable(formData)
  measurementStore.fetchList()
}
function getHasilUji(measurementsId: any, ukuran: any[]) {
  const lookupResult = ukuran.find(x => x.id === measurementsId);
  if (lookupResult) {
    return {
      result: (lookupResult.value) ? currencyFormat(lookupResult.value): 0,
    }
  } else {
    return {
      result: "-",
    }
  }
}
watch(() => searchValue, () => {
  fetchData()
}, {deep: true});

watch(() => bus.value.get('reloadTable'), () => {
  fetchData()
})

// trigger when mounted
onMounted(() => fetchData())
</script>