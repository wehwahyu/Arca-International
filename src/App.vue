<script setup lang="ts">
import {onMounted, ref, watch} from 'vue'
import { useRouter } from 'vue-router'
import PageLoader from "/@/components/PageLoader.vue";

const emptyLayout = `empty-layout`
const defaultLayout = `default-layout`

const { currentRoute } = useRouter()
const layout = ref(emptyLayout)
const displayLoading = ref(true)

watch(() => currentRoute.value.meta, (routeMeta) => {
  layout.value = routeMeta.layout ?? defaultLayout
}, {deep: true})

onMounted(() => displayLoading.value = false)
</script>

<template>
  <page-loader :loading="displayLoading"/>
  <component :is="layout">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </component>
</template>
