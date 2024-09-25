<template>
  <el-input
    v-model="iconValue"
    placeholder="Please input"
    class="input-with-select"
  >
    <template #append>
      <span v-bind="$attrs" @click="togglePicker">
        <el-button :icon="Folder"/>
      </span>
    </template>
  </el-input>

  <div class="aim-modal aim-open" v-if="isVisible">
    <div class="aim-modal--content">
      <div class="aim-modal--header">
        <div class="aim-modal--header-logo-area">
          <span class="aim-modal--header-logo-title">
            Vue 3 Icon Picker
          </span>
        </div>
        <div class="aim-modal--header-close-btn" @click="closePicker">
          <v-icon name="fa-times" title="Close" />
        </div>
      </div>
      <div class="aim-modal--body">
        <div class="aim-modal--sidebar">
          <div class="aim-modal--sidebar-tabs">
            <div class="aim-modal--sidebar-tab-item" data-library-id="all" v-for="tab in tabs" :key="tab.id"
              :class="{ 'aesthetic-active': isActiveTab(tab.id) }" @click="setActiveTab(tab)">
              <i :class="tab.icon"></i>
              <span>{{ tab.title }}</span>
            </div>
            <div class="aim-icon-item">
              <div class="aim-icon-item-inner">
                <v-icon class="w-8 h-8" :name="activeGlyph" />
                <div class="aim-icon-item-name">
                  {{ activeGlyph }}
                </div>
              </div>
            </div>
          </div>

        </div>
        <div class="aim-modal--icon-preview-wrap">
          <div class="aim-modal--icon-search">
            <input v-model="filterText" placeholder="Filter by name..." />
            <i class="fa-search"> </i>
          </div>
          <div class="aim-modal--icon-preview-inner">
            <div class="aim-modal--icon-preview">
              <template v-for="glyph in glyphs()">
                <div
                  class="aim-icon-item"
                  :key="glyph"
                  :class="{ 'aesthetic-selected': isActiveGlyph(glyph) }"
                  @click="setActiveGlyph(glyph)"
                  v-if="glyphs()"
                >
                  <div class="aim-icon-item-inner">
                    <v-icon class="w-8 h-8" :name="glyph" />
                    <div class="aim-icon-item-name">
                      {{ getGlyphName(glyph) }}
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="aim-modal--footer">
        <button class="aim-insert-icon-button" @click="insert">Insert</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { watch, ref, computed, defineProps, defineEmits } from 'vue'
import fontLibrary from '/@/data/fonts'
import { Folder } from '@element-plus/icons-vue'
import useStore from '/@/store/module/module'

const store = useStore()
interface Tab {
  id: string;
  title: string;
  icon: string;
  link: any;
}

const props = defineProps<{
  label: string;
  modelValue: {
    type: [String, Number, Object],
    required: true,
  }
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>()

const iconValue = ref(props.modelValue)
const filterText = ref('')
const activeGlyph = ref(props.modelValue)
const isVisible = ref(false)

const tabs: Tab[] = [
  {
    id: 'all',
    title: 'All Icons',
    icon: 'fas fa-star-of-life',
    link: 'all'
  },
  {
    id: 'far',
    title: 'Font Awesome',
    icon: 'fab fa-font-awesome-alt',
    link: fontLibrary.fontAwesome.variants.regular
  },
]

const activeTab = ref(tabs[0])

const allGlyphs = ([] as string[]).concat(
  tabs[1].link.icons,
)

const glyphs = () => {
  let _glyphs: string[] = []
  if (activeTab.value.id !== 'all') {
    _glyphs = activeTab.value.link.icons
  } else {
    _glyphs = allGlyphs
  }

  if (filterText.value != '') {
    const _filterText = filterText.value.toLowerCase()
    _glyphs = _glyphs.filter(
      item => item.includes(_filterText)
    )
    console.log('glyphs', _glyphs)
  }
  return _glyphs
}

const setActiveGlyph = (glyph: string) => {
  activeGlyph.value = glyph
}

const isActiveGlyph = (glyph: string) => {
  return activeGlyph.value == glyph
}

const isActiveTab = (tab: string) => {
  return tab == activeTab.value.id
}

const setActiveTab = (tab: Tab) => {
  activeTab.value = tab
  // filterText.value=''; //nice feature
}
const getGlyphName = (glyph: string) =>
  glyph.replace(/fa-/g, '').replace('-', ' ')

const insert = () => {
  emit('update:modelValue', activeGlyph.value)
  isVisible.value = false
}

const updateInputValue = () => {
  iconValue.value = props.modelValue;
};

const togglePicker = () => {
  isVisible.value = !isVisible.value
}

const closePicker = () => {
  isVisible.value = false
}

watch(() => props.modelValue, updateInputValue);
watch(() => iconValue.value, (value: string) => {
  emit('update:modelValue', value)
})
</script>

<style scoped>
@import '../assets/style.css';
</style>
