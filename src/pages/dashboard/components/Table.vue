<template>
  <div class="flex flex-col w-full gap-2 px-4 pb-4" v-loading="store.loading">
    <el-table
      :data="store.saleData.items"
      :fit="true"
      :table-layout="'auto'"
      :summary-method="getSummaries"
      :show-summary="store.saleData.items.length > 0"
      stripe
    >
      <el-table-column prop="no" label="No"/>
      <el-table-column prop="product.productName" label="Nama Produk"/>
      <el-table-column prop="qty" label="QTY"/>
      <el-table-column prop="totalPrice" label="Total Harga">
        <template #default="scope">
          {{ currencyFormat(scope.row.totalPrice) }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Action" width="120">
        <template #default="scope">
          <el-tooltip
            class="box-item"
            effect="dark"
            content="Remove Data"
            placement="top"
          >
            <el-button
              type="danger"
              :icon="Delete"
              size="small"
              @click="handleDelete(scope.row.no)"
            >
              Delete
            </el-button>

          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import {
  defineProps,
  onMounted,
  PropType,
  ref, VNode,
  watch,
} from 'vue'
import type { TableColumnCtx } from 'element-plus'
import {
  Delete,
  Edit,
  View,
} from '@element-plus/icons-vue'
import useEventsBus from '/@/composables/useEventsBus'
import saleStore from '/@/store/module/sale'
import RemoveDataDialog from '/@/components/dialog/RemoveDataDialog.vue'
import { apiRoute, modulePath } from './FormHelper'
import {currencyFormat} from "/@/helper/FormattedValue";
import {SaleItem} from "/@/types/sale";
import {h} from "vue-demi";

const store = saleStore()
const {bus} = useEventsBus()
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const order = ref('asc');
const dialogVisible = ref(false)
const deletedId = ref()

interface SummaryMethodProps<T = SaleItem> {
  columns: TableColumnCtx<T>[]
  data: T[]
}
const getSummaries = (param: SummaryMethodProps) => {
  const { columns, data } = param
  const sums: (string | VNode)[] = []

  if (store.saleData.items.length > 0) {
    columns.forEach((column, index) => {
      if (index === 0) {
        sums[index] = h('div', {style: {textDecoration: 'underline'}}, [
          'Sub Total',
        ])
        return
      }
      const values = data.map((item) => Number(item[column.property]))
      if (!values.every((value) => Number.isNaN(value))) {
        const sum = values.reduce((prev, curr) => {
          const value = Number(curr)
          if (!Number.isNaN(value)) {
            return prev + curr
          } else {
            return prev
          }
        }, 0);
        sums[index] = currencyFormat(sum)
      } else {
        sums[index] = ''
      }
    })
  }
  return sums
}

/**
 * Show delete confirmation
 * @param rowId
 */
const handleDelete = (rowId: number) => {
  store.saleData.items = store.saleData.items.filter(x => x.no != rowId)
  store.rewriteSummary()
}

/**
 * fetch data
 */
const fetchData = () => {
  // set dialog visibility to false
  dialogVisible.value = false;
}

watch(() => bus.value.get('reloadTable'), () => {
  fetchData()
})

// trigger when mounted
onMounted(() => fetchData())
</script>


<style>
.el-table__body-footer tr td {
  @apply bg-gray-100/50 !important;
}
</style>