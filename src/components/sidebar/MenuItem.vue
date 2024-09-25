<template>
  <router-link :to="{ path: url }" v-if="!children.length">
    <el-menu-item :index="url">
      <!-- <i v-if="icon" :class="convertIcon(icon)" class="mr-2"></i> -->
      <v-icon v-if="icon" :name="convertIcon(icon)" class="mr-2" />
      <template #title>
        {{ label }}
      </template>
    </el-menu-item>
  </router-link>
  <el-sub-menu :index="url" v-else>
    <template #title>
      <!-- <i v-if="icon" :class="convertIcon(icon)" class="mr-2"></i> -->
      <v-icon v-if="icon" :name="convertIcon(icon)" class="mr-2" />
      {{ label }}
    </template>
    <MenuItem
      v-for="(child, idx) in children"
      :key="idx"
      :label="child.title"
      :url="child.url"
      :index="child.index"
      :icon="convertIcon(child.icon)"
      :children="child.children"
    />
  </el-sub-menu>
</template>


<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  index: { type: String, required: true },
  url: { type: String, required: true },
  label: { type: String, required: true },
  children: { type: Array, required: true },
  icon: { type: String },
})
const convertIcon = (icon: string | undefined): string | undefined => {
  if (!icon) return undefined
  return icon.replace(/^(far|fas)\s+/, '')
}
</script>

<style scoped>
@import '../../assets/style.css';
</style>