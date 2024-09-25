<template>
  <div class="flex flex-col w-full gap-2 px-4 pb-4" v-loading="store.loading">
    <el-table
      :data="store.transactions"
      :fit="true"
      :table-layout="'auto'"
      stripe
    >
      <el-table-column prop="no" label="No"/>
      <el-table-column prop="totalPrice" label="Tanggal & Jam">
        <template #default="scope">
          {{  formatDate(new Date(scope.row.createdAt), "D MMM YYYY HH:mm") }}
        </template>
      </el-table-column>
      <el-table-column prop="totalProduct" label="Total Product" align="right">
        <template #default="scope">
          {{ currencyFormat(scope.row.totalProduct) }}
        </template>
      </el-table-column>
      <el-table-column prop="totalQuantity" label="Total Quantity" align="right">
        <template #default="scope">
          {{ currencyFormat(scope.row.totalQuantity) }}
        </template>
      </el-table-column>
      <el-table-column prop="totalPrice" label="Sub Total" align="right">
        <template #default="scope">
          {{ currencyFormat(scope.row.totalPrice) }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import {ref,} from 'vue'
import useEventsBus from '/@/composables/useEventsBus'
import saleStore from '/@/store/module/sale'
import {currencyFormat} from "/@/helper/FormattedValue";
import {formatDate} from "@vueuse/core";

const store = saleStore()
const {bus} = useEventsBus()
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const order = ref('asc');
</script>