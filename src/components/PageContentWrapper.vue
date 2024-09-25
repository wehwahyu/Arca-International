<template>
  <el-card>
    <template #header>
      <div class="card-header flex items-center justify-between">
        <div class="flex items-center gap-2 bold">
          <el-icon>
            <Plus v-if="mode === 'create'"/>
            <Edit v-if="mode === 'update'"/>
            <View v-if="mode === 'detail'"/>
          </el-icon>

          {{ pageTitle }}
        </div>

        <div class="flex items-center gap-2">
          <div class="text-sm rounded-lg font-light" v-if="multiLang">
            Translation
            <el-button-group class="ml-4">
              <template v-for="(lang, index) in langStore.list" :key="index">
                <el-button
                  type="primary"
                  size="small"
                  @click="scrollToElement(`lang.${lang.id}`)"
                >
                  {{ lang.language }}
                </el-button>
              </template>
            </el-button-group>
          </div>

          <div v-if="hasSlot('buttons')">
            <slot name="buttons"></slot>
          </div>
        </div>
      </div>
    </template>
    <div class="flex w-full gap-4">
      <div class="flex flex-col w-full gap-4">
        <slot />
      </div>
      <div :class="rightContentWidth" v-if="hasSlot('right-content')">
        <slot name="right-content" />
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import {defineProps, onBeforeMount, useSlots} from "vue";
import {useRoute} from "vue-router";
import languageStore from "/@/store/module/language";
import {Plus, Edit, View} from "@element-plus/icons-vue";

const route = useRoute()
const langStore = languageStore();

const props = defineProps({
  id: {
    type: [String, Number] || null
  },
  mode: {
    type: String || null,
    default: ''
  },
  pageTitle: {
    type: String || null
  },
  multiLang: {
    type: Boolean,
    required: true,
    default: false
  },
  items: {
    type: Array,
    required: true,
    default: () => []
  },
  rightContentWidth: {
    type: String,
    default: 'w-4/12'
  },
})

const scrollToElement = (elementId) =>  {
  const el = document.getElementById(elementId);

  if (el) {
    el.scrollIntoView({behavior: "smooth"});
  }
}

const slots = useSlots()
const hasSlot = (name) => {
  return !!slots[name];
}

onBeforeMount(() => {
  if (props.multiLang) {
    langStore.fetchList()
  }
})
</script>

<style>
.el-card__header {
  @apply bg-gray-700 text-white border-dashed border-gray-200 !important;
}
</style>