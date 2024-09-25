<template>
  <div v-loading="loading">
    <el-form-item :label="label" :prop="id" v-if="displayLabel">
      <el-select
          v-model="inputValue"
          :aria-abel="label"
          :placeholder="placeholder"
          clearable
          filterable
          :style="{ width: '100%' }"
      >
        <el-option
            v-for="item in store.dropdownList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            @change="onChange"
        />
      </el-select>
    </el-form-item>
    <div v-else>
      <el-select
          v-model="inputValue"
          :aria-abel="label"
          :multiple="isMulti"
          :collapse-tags="!viewMode"
          :collapse-tags-tooltip="!viewMode"
          :placeholder="placeholder"
          clearable
          filterable
          :style="{ width: '100%' }"
      >
        <el-option
            v-for="item in store.dropdownList"
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
import {
  onMounted,
  ref,
  watch,
} from 'vue'

import ApiHelper from '/@/helper/ApiHelper'
import useStore from '/@/store/module/measurementUnit'

const store = useStore()

interface Option {
  label: string;
  value: any;
}

const apiHelper = new ApiHelper('satuan')

const emits = defineEmits(['update:modelValue'])
const props = defineProps({
  id: {
    type: String,
    default: 'satuan'
  },
  modelValue: {
    type: [String, Number, Object],
    required: true,
  },
  label: {
    type: String,
    default: 'Satuan',
  },
  displayLabel: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: 'Pilih Satuan',
  },
  viewMode: {
    type: Boolean,
    default: false,
  },
  isMulti: {
    type: Boolean,
    default: true
  },
  useOptions: {
    type: Array as () => Option[],
    default: () => []
  },
  useDefaultFetch: {
    type: Boolean,
    default: true
  }
});

const loading = ref();
const inputValue = ref(props.modelValue);
const options = ref<Option[]>(props.useOptions)
const fetchData = () => {
  store.fetchList()
}

// Computed property to update inputValue when modelValue changes
const updateInputValue = () => {
  inputValue.value = props.modelValue;
};
// Emit input event on value change
watch(() => props.modelValue, updateInputValue);
watch(() => inputValue.value, (newValue) => {
  emits('update:modelValue', newValue);
});
// Watch for changes in useOptions prop
watch(() => props.useOptions, (newOptions) => {
  options.value = newOptions;
});

// Handle input event
const onChange = (event: any) => {
  inputValue.value = event.target.value;
};

onMounted(() => {
  if (props.useDefaultFetch) fetchData()
})
</script>
