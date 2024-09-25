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
import saleStore from "/@/store/module/sale";
const store = saleStore()
import * as XLSX from "xlsx";
import {formatDate} from "@vueuse/core";
import {currencyFormat} from "/@/helper/FormattedValue";

const exportToExcel = () => {
  const dataForExcel = store.transactions.map((x) => {
    const createdAt = formatDate(new Date(x.createdAt), "D MMM YYYY HH:mm");
    const totalProduct = x.totalProduct || 0;
    const totalQty = x.totalQty || 0;
    const totalPrice = x.totalPrice || 0;

    return {
      No: x.no, // Fix the numbering issue
      "Tanggal & Jam": createdAt,
      "Total Product": totalProduct, // Use raw numbers
      "Total Quantity": totalQty,
      "Total Sub Total": totalPrice, // Handle price as number
    };
  })
  const data = XLSX.utils.json_to_sheet(dataForExcel, {
    header: [
      "No",
      "Tanggal & Jam",
      "Total Product",
      "Total Quantity",
      "Total Sub Total",
    ],
  });

  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, data, 'Sale Data')
  XLSX.writeFile(wb,'Report Sale.xlsx')
}
</script>