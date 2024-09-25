<template>
  <el-form :model="saleStore.formData" :rules="formRules" :disabled="mode === 'detail'" ref="formRef" label-position="left"
    label-width="150px" class="w-full gap-2 flex flex-col" v-if="!store.loading" @submit.prevent="addProduct">
    <div class="flex w-full gap-4 items-center bg-slate-800 p-4 text-white  justify-between">
      <div class="flex gap-4 w-8/12">
        <ProductDropdown
          v-model="saleStore.formData.productId"
          @onSelected="onProductSelected"
          placeholder="Select product"
          :display-label="false"
          class="w-10/12"
        />
        <input-number-v2
          v-model="saleStore.formData.qty"
          class="w-2/12"
        />
      </div>
      <div class="flex flex-col text-sm leading-5 text-right">
        <div>Total Harga</div>
        <div class="font-bold">{{ currencyFormat(saleStore.formData.totalPrice) }}</div>
      </div>
      <el-button
        type="warning"
        class="w-2/12"
        :disabled="!saleStore.formData.productId || !saleStore.formData.qty || saleStore.formData.qty == 0"
        @click="addProduct"
      >
        + Add
      </el-button>
    </div>
  </el-form>
  <el-spinner v-else></el-spinner>
</template>

<script setup lang="ts">
import {
  defineProps,
  onBeforeMount, onMounted,
  ref,
  watch,
} from 'vue'
import { useRouter } from 'vue-router'
import useEventsBus from '/@/composables/useEventsBus'
import { wrapFormData } from '/@/helper/Helper'
import { FormProp } from '/@/types/pageProps'
import {
  formRules,
  pageRoute,
  setRules
} from './FormHelper'
import { useRoute } from 'vue-router'
import productStore from "/@/store/module/product";
import ProductDropdown from "/@/components/dropdown/ProductDropdown.vue";
import useSaleStore from "/@/store/module/sale";
import InputNumberV2 from "/@/components/form/Inputs/InputNumberV2.vue";
import {Product} from "/@/types/product";
import {currencyFormat} from "/@/helper/FormattedValue";
import {SaleItem} from "/@/types/sale";

const route = useRoute()
const store = productStore()
const saleStore = useSaleStore()
const { emit, bus } = useEventsBus()
const router = useRouter()
const loading = ref(false)
const props = defineProps<FormProp>()
const formRef = ref()
const selectedProduct = ref<Product>()

const calculateTotalPrice = () => {
  if (selectedProduct.value?.price && saleStore.formData.qty) {
    saleStore.formData.totalPrice = selectedProduct.value?.price * saleStore.formData.qty;
  } else {
    saleStore.formData.totalPrice = 0;
  }
}

const addProduct = () => {
  saleStore.saleData.items = [saleStore.formData].concat(saleStore.saleData.items)
  saleStore.rewriteSummary()
  saleStore.formData = {price: 0, product: undefined, productId: null, qty: 0, totalPrice: 0}
}

const onProductSelected = (arg: Product) => {
  selectedProduct.value = arg
  saleStore.formData.product = arg
  saleStore.formData.qty = 1
}

watch(() => [saleStore.formData.qty, saleStore.formData.productId], () => {
  calculateTotalPrice();
}, {deep: true})

onMounted(async () => {
  setRules(props.mode === 'update')
})
</script>