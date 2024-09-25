<template>
  <div class="flex justify-between items-center w-full text-right border-y  py-2 mb-2 bg-blue-500 px-2">
    <div class="font-bold text-white">
      <v-icon name="bi-translate" v-if="!withIcon" />
      {{ name ?? "-" }}
    </div>
    <el-tag class="w-auto" size="large" effect="plain" v-if="withIcon">
      <v-icon name="bi-translate" /> {{ lang }}
    </el-tag>
  </div>
</template>

<script setup lang="ts">
import {defineProps} from "vue";

const props = defineProps({
  name: {
    type: String
  },
  lang: {
    type: String,
    required: true,
    default: () => ""
  },
  withIcon: {
    type: Boolean,
    required: true,
    default: true
  },
})
</script>