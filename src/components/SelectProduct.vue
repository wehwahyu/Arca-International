<template>
  <el-select-v2
    v-model="value"
    class="search-box w-full mt-2"
    style="width: 100%"
    filterable
    remote
    :remote-method="remoteMethod"
    clearable
    :options="options"
    :loading="loading"
    @change="onSelect"
    placeholder="Cari Barang berdasarkan Nama, Kode Barang..."
  >
    <template #prefix>
      <el-icon class="el-input__icon">
        <Search />
      </el-icon>
    </template>
    <template #loading>
      <el-icon :size="20" class="is-loading">
        <Loading />
      </el-icon>
    </template>
  </el-select-v2>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { Search, Loading } from '@element-plus/icons-vue'
import koleksiProdukStore from '/@/store/module/koleksiProduk'

const emits = defineEmits(['productSelected', 'clear', 'loading'])

const store = koleksiProdukStore()

interface ListItem {
  value: string
  label: string
}

const value = ref<string[]>([])
const options = ref<ListItem[]>([])
const loading = ref(false)

const remoteMethod = (query: string) => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    options.value = store.lookupList.map((item): ListItem => {
      return { value: item.kode, label: `${item.kode} - ${item.nama}` }
    }).filter((item) => {
      return item.label.toLowerCase().includes(query.toLowerCase())
    })
  }, 500)
}

const onSelect = (val: ListItem) => {
  const selectedItem = store.lookupList.find(item => item.kode === val)
  if (selectedItem) {
    emits("productSelected", selectedItem)
  }
}

watch(() => store.lookupList, (newList) => {
  if (newList.length) {
    options.value = newList.map((item): ListItem => {
      return { value: item.kode, label: `${item.kode} - ${item.nama}` }
    })
  }
})

onMounted(() => {
  store.fetchList()
})
</script>