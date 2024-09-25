<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col">
      <div class="flex justify-between items-center">
        <h3 class="text-3xl font-medium text-gray-700">{{ metaData.pageTitle }}</h3>

        <div class="flex flex-col lg:flex-row gap-2 " v-if="hasSlot('buttons')" >
          <slot name="buttons"></slot>
        </div>
      </div>
    </div>
    <slot name="content" />
    <el-card v-if="hasSlot('default')">
      <slot />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import {ref, useSlots} from "vue";
import {useRoute} from "vue-router";

const route = useRoute()
const metaData = ref(route.meta)

const slots = useSlots()
const hasSlot = (name: string) => {
  return !!slots[name];
}
</script>
