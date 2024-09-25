<template>
  <span
      class="w-full flex justify-between font-bold text-left"
      :class="marketGapColor"
      :set="gapValue = marketGapLabel"
  >
    <el-tooltip
        className='box-item'
        effect='dark'
        placement='top'
        show-after='1000'
    >
    </el-tooltip>
    <span
      class="text-right w-full"
        :style="
        (gapValue.length >= 20)
        ? 'font-size:9px'
        : (gapValue.length >= 5)
          ? 'font-size:11px'
          : 'font-size:12px'
      "
    >
      <v-icon name="bi-arrow-up"  v-if="position === 'up'"/>
      <v-icon name="bi-arrow-down" v-else/>
      {{ gapValue }}
    </span>
  </span>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { currencyFormat } from '/@/helper/FormattedValue';
import {DashboardItem} from "/@/types/dashboard";

const props = defineProps(['params'])
const rowData = ref(props.params.data <DashboardItem>)
const gap = ref(rowData.value.gap)
const gapPercent = ref(rowData.value.gap_percentage)
const baseCurrency = ref(rowData.value.base_currency)
const position = ref(rowData.value.position)
const priceRound = ref(rowData.value.price_round)

const gapValue = ref('');
const marketGapColor = computed(() => {
  let color = 'text-white';
  if (position.value === 'up') {
    if (gapPercent.value >= 10) color = 'text-yellow-500';
    else if (gapPercent.value >= 5) color = 'text-green-500';
    else if (gapPercent.value >= 0 && gapPercent.value < 5) color = 'text-green-300';
  } else {
    if (gapPercent.value >= 10) color = 'text-yellow-500';
    else if (gapPercent.value >= 5) color = 'text-red-500';
    else if (gapPercent.value >= 0 && gapPercent.value < 5) color = 'text-red-300';
  }
  if (gapPercent.value == 0) color = 'text-gray-500'
  return color;
});

const marketGapLabel = computed(() => {
  // let gapVal = currencyFormat(gap.value, 8);
  let gapVal = currencyFormat(gap.value, 8);
  const percentageVal = `(${currencyFormat(gapPercent.value, 2)}%)`;
  if (baseCurrency.value === 'usdt') {
    gapVal = gap.value.toString();
  }
  return `${gapVal} ${percentageVal}`;
});

onMounted(() => {
  gapValue.value = marketGapLabel.value;
});
</script>