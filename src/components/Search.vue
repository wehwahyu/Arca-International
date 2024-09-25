<template>
  <el-input
    v-model="searchInput"
    placeholder="Search..."
    clearable
    :icon="searchIcon"
    @clear="clearSearch"
    @input="debouncedSearch"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface DebouncedSearchFn {
  (value: string): void;
}

const debounceTime = 300;

const searchInput = ref('');
const searchIcon = ref('el-icon-search');

const debounce = (fn: DebouncedSearchFn, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

const debouncedSearch = debounce((value: string) => {
  console.log('Searching for:', value);
}, debounceTime);

watch(searchInput, (newValue) => debouncedSearch(newValue));

function clearSearch() {
  searchInput.value = '';
  debouncedSearch('');
}

</script>
