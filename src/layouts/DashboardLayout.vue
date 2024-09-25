<script setup lang="ts">
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar/Index.vue'
</script>

<template>
  <div class="flex h-screen bg-gray-200 font-roboto">
    <Sidebar />

    <div class="flex-1 flex flex-col overflow-hidden">
      <Header />

      <main id="layout-wrapper" class="flex-1 relative overflow-x-hidden overflow-y-auto bg-gray-200">
        <div id="content-wrapper" class="mx-auto p-6 h-full pb-2">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
