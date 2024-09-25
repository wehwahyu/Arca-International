<template>
  <div v-loading="loading">
    <el-form-item :label="label" prop="roles" v-if="displayLabel">
      <el-select v-model="inputValue" :aria-abel="label" :placeholder="placeholder" clearable filterable :style="{width: '100%'}">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            @change="onChange"
        />
      </el-select>
    </el-form-item>
    <div v-else>
      <el-select class="w-full" v-model="inputValue" :aria-abel="label" :placeholder="placeholder" clearable filterable>
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            @change="onChange"
        />
      </el-select>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineProps, getCurrentInstance, ref, watch} from 'vue'

const { emit } = getCurrentInstance();
const props = defineProps({
  modelValue: {
    type: [String, Number, Object],
    required: true,
  },
  label: {
    type: String,
    default: 'Role',
  },
  displayLabel: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: 'Role',
  },
  adminOnly: {
    type: Boolean,
    default: false,
  },
  items: {
    type: Array,
    default: () => [],
    required: true
  },
});

const loading = ref();
const inputValue = ref(props.modelValue);
const options = ref([])

// Computed property to update inputValue when modelValue changes
const updateInputValue = () => {
  inputValue.value = props.modelValue;
};
// Emit input event on value change
watch(() => props.modelValue, updateInputValue);
watch(() => inputValue.value, (newValue) => {
      emit('update:modelValue', newValue);
    }
);
watch(() => props.items, (newValue) => {
  options.value = newValue
})

// Handle input event
const onChange = (event) => {
  inputValue.value = event.target.value;
};
</script>
