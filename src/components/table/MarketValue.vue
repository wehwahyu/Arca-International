<template>
  <span v-if="price" :set="marketValue = marketValueLabel()">
    <span
        :style="
        (marketValue.length >= 20)
        ? 'font-size:9px'
        : (marketValue.length >= 5)
          ? 'font-size:11px'
          : 'font-size:12px'
      "
    >
      {{ marketValue }}
    </span>
  </span>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { currencyFormat } from '/@/helper/FormattedValue';
import {DashboardItem} from "/@/types/dashboard";

const props = defineProps(['params'])
const rowData = ref(props.params.data <DashboardItem>)
const price = ref(rowData.value.market_price);
const btcPrice = ref(rowData.value.btc_price);
const baseCurrency = ref(rowData.value.base_currency)
const description = ref(rowData.value.description)
const priceRound = ref(rowData.value.price_round)

const marketValueLabel = () => {
  let currentPrice = price.value;
  if (description.value.includes('BTT')) {
    currentPrice = Number(currentPrice).toFixed(9);
  }
  const marketVal = currencyFormat(currentPrice, priceRound.value);
  let marketRawVal = '';
  if (baseCurrency.value !== 'usdt') {
    marketRawVal = '(' + currencyFormat(btcPrice.value, priceRound.value) + ')';
  }
  return `${marketVal} ${marketRawVal}`;
};

const fontSize = computed(() => {
  if (marketValue.length >= 20) {
    return 'font-size: 9px';
  } else if (marketValue.length >= 5) {
    return 'font-size: 11px';
  } else {
    return 'font-size: 12px';
  }
});

const marketValue = marketValueLabel();
</script>