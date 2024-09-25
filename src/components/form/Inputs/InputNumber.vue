<template>
  <div class="el-input">
    <div class="el-input__wrapper">
      <input 
        v-maska:[options]
        v-model="maskedValue"
        data-maska="0.99"
        data-maska-tokens="0:\d:multiple|9:\d:optional"
        class="el-input__inner"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const emits = defineEmits(['update:valueModel', 'update:maskModel'])
const props = defineProps({
  showCurrency: {
    type: Boolean,
    default: false
  },
  value: {
    type: String,
    default: ''
  }
})

const options = {
  preProcess: (val: string) => {
    return val.replace(regex.value, '')
  },
  postProcess: (val: any) => {
    if (!val) return ''

    const sub = 3 - (val.includes(',') ? val.length - val.indexOf(',') : 0)
    
    const formatCurrency = Intl.NumberFormat(["ban", "id"], {
      style: 'currency',
      currency: 'IDR'
    }).format(val)
      .slice(0, sub ? -sub : undefined)
    let result = formatCurrency
    if (!props.showCurrency) result = formatCurrency.split("Rp")[1]

    return result
  }
}

const regex = ref(/[Rp. \s\\]/g)
const maskedValue = ref(props.value)

watch(() => maskedValue.value, (value) => {
  const newValue = value.replace(regex.value, '')
  emits('update:valueModel', newValue)
  emits('update:maskModel', value)
})
</script>