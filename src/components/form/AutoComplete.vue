<template>
  <el-autocomplete
    ref="autocompleteRef"
    v-model="searchInput"
    :fetch-suggestions="debouncedFetchSuggestions"
    :placeholder="placeholder"
    :value-key="valueKey"
    clearable
    :disabled="props.disabled"
    @clear="clearSearch"
    @select="onSelect"
  >
    <template #prefix>
      <el-icon class="el-input__icon">
        <Search />
      </el-icon>
    </template>
  </el-autocomplete>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Calendar, Search } from '@element-plus/icons-vue'
import { useDebounceFn } from '@vueuse/core'

export interface AutoCompleteOption {
  label: string;
  value: any;
}

const emits = defineEmits(['onSelect', 'clear'])
const props = defineProps({
  valueKey: {
    type: String,
    default: 'value'
  },
  fetchSuggestions: {
    type: Function,
    required: true,
  },
  placeholder: {
    type: String,
    default: "Scan Barcode atau Cari Barang berdasarkan Nama, Kode Barang, atau Kode Inventory..."
  },
  disabled: {
    type: Boolean,
    default: false
  },
  clearAfterSelect: {
    type: Boolean,
    default: true
  }
});

const searchInput = ref<string>('');
const autocompleteRef = ref(null);

const debounceTime = 300;
const debouncedFetchSuggestions = useDebounceFn(async (value: string, cb: any) => {
  await props.fetchSuggestions(value, cb);
}, debounceTime);

watch(searchInput, debouncedFetchSuggestions);

function clearSearch() {
  emits('clear')
  searchInput.value = '';
}

function onSelect(item: AutoCompleteOption) {
  emits("onSelect", item)
  if (!props.clearAfterSelect) return
  clearSearch()
  const autocomplete = autocompleteRef.value;
  if (autocomplete) {
    (autocomplete as HTMLElement).blur();
  }
}
</script>
