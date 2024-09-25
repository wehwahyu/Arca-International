<template>
  <div v-loading="loading">
    <el-form-item :label="label" :prop="id" v-if="displayLabel">
      <el-select
        class="w-full"
        v-model="inputValue"
        :aria-abel="label"
        :placeholder="placeholder"
        :disabled="disabled"
        clearable
        filterable
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          @change="onChange"
        >
          <div class="flex w-full justify-between items-center">
            <span class="">{{ item.label }}</span>
            <span class="text-xs font-bold">Stock {{ item.data.qty }}</span>
          </div>
        </el-option>
      </el-select>
    </el-form-item>
    <div v-else>
      <el-select class="w-full" v-model="inputValue" :aria-abel="label" :placeholder="placeholder" clearable filterable>
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          @change="onChange"
        >

          <div class="flex w-full justify-between items-center">
            <span class="">{{ item.label }}</span>
            <span class="text-xs font-bold">Stock {{ item.data.qty }}</span>
          </div>
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref, watch,} from 'vue'

import productStore from "/@/store/module/product";
import {Product} from "/@/types/product";

interface Option {
  label: string;
  value: any;
  data: any;
}

const store = productStore()
const emits = defineEmits(['update:modelValue'])
const props = defineProps({
  id: {
    type: String,
    default: 'product_id'
  },
  modelValue: {
    type: [String, Number, Object],
    required: true,
  },
  label: {
    type: String,
    default: 'Produk',
  },
  displayLabel: {
    type: Boolean,
    default: true,
  },
  placeholder: {
    type: String,
    default: 'Pilih Produk',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const loading = ref();
const inputValue = ref(props.modelValue);
const options = ref<Option[]>([])
const fetchData = () => {
  options.value = store.data.map((x: Product) => ({
    label: x.productName,
    value: x.id,
    data: x,
  }))
}

// Computed property to update inputValue when modelValue changes
const updateInputValue = () => {
  inputValue.value = props.modelValue;
};
// Emit input event on value change
watch(() => props.modelValue, updateInputValue);
watch(() => inputValue.value, (newValue) => {
    emits('update:modelValue', newValue);
    emits('onSelected', options.value.find(x => x.value === newValue)?.data);
  }
);

// Handle input event
const onChange = (event: any) => {
  inputValue.value = event.target.value;
};

onMounted(() => fetchData())
</script>
