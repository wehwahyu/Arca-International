<!-- InputNumberV2.vue -->
<template>
  <div class="input-number text-right" :class="disabled ? 'disabled' : ''">
    <div v-if="viewMode">
      {{currencyFormat(maskedValue)}}
    </div>
    <div class="el-input" v-else>
      <div class="el-input__wrapper">
        <cleave
          v-model="maskedValue"
          name="card"
          class="el-input__inner text-right"
          :disabled="disabled"
          :placeholder="placeholder"
          :options="options"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import Cleave from 'vue-cleave-component';
import {currencyFormat} from "/@/helper/FormattedValue";

const emits = defineEmits(['update:modelValue', 'update:maskModel'])
const props = defineProps({
  showCurrency: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: [String, Number, Object],
    required: true,
  },
  viewMode: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  }
})

const maskedValue = ref(props.modelValue)
const options = {
  prefix: '',
  numeral: true,
  numeralPositiveOnly: true,
  noImmediatePrefix: true,
  rawValueTrimPrefix: true,
  numeralIntegerScale: 9,
  numeralDecimalScale: 2
}

// Computed property to update inputValue when modelValue changes
const updateInputValue = () => {
  maskedValue.value = props.modelValue;
};

// Emit input event on value change
watch(() => props.modelValue, updateInputValue);
watch(() => maskedValue.value, (value: string) => {
  emits('update:modelValue', value)
  emits('update:maskModel', value)
})
</script>

<style>
.input-number.disabled .el-input,
.input-number.disabled .el-input .el-input__wrapper,
.input-number.disabled input[type="text"]:disabled {
  @apply bg-gray-100/70 text-gray-500 !important;
}
</style>