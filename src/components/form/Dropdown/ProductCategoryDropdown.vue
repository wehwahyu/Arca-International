<template>
  <base-dropdown
    v-model="inputValue"
    label="Product Category"
    placeholder="Product Category"
    :display-label="displayLabel"
    :items="
      store.list.map(x => ({
        label: x.name,
        value: x.id,
      }))
    "
    :admin-only="adminOnly"
  />
</template>

<script setup lang="ts">
import {onMounted, ref, watch, defineProps, getCurrentInstance} from 'vue'
import categoryStore from "/@/store/module/category";
import BaseDropdown from "/@/components/form/Dropdown/BaseDropdown.vue";

const store = categoryStore()
const { emit } = getCurrentInstance();
const props = defineProps({
  modelValue: {
    type: [String, Number, Object],
    required: true,
  },
  displayLabel: {
    type: Boolean,
    default: false,
  },
  adminOnly: {
    type: Boolean,
    default: false,
  },
});

const loading = ref();
const inputValue = ref(props.modelValue);

// Computed property to update inputValue when modelValue changes
const updateInputValue = () => {
  inputValue.value = props.modelValue;
};
// Emit input event on value change
watch(() => props.modelValue, updateInputValue);
watch(() => inputValue.value, (newValue) => {
  emit('update:modelValue', newValue);
});

onMounted(() => store.fetchList())
</script>
