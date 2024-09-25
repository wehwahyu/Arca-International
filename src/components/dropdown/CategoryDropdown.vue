<template>
  <div class="w-full flex " v-loading="loading">
    <el-form-item class="w-full" :label="label" :prop="prop" v-if="displayLabel">
      <el-select v-model="inputValue" :aria-abel="label" :placeholder="placeholder" :disabled="disabled" clearable filterable :style="{width: '100%'}">
        <el-option
            class="w-full"
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            @change="onChange"
        />
      </el-select>
    </el-form-item>
    <div class="w-full" v-else>
      <el-select v-model="inputValue" :aria-abel="label" :placeholder="placeholder" :disabled="disabled" clearable filterable :style="{width: '100%'}">
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
import {onMounted, ref, watch, defineProps, getCurrentInstance} from 'vue'
import { Refresh, Plus } from '@element-plus/icons-vue'
import ApiHelper from "/@/helper/ApiHelper";
import {useRouter} from "vue-router";

const apiHelper = new ApiHelper('product-category')
const router = useRouter()

const { emit } = getCurrentInstance();
const props = defineProps({
  modelValue: {
    type: [String, Number, Object],
    required: true,
  },
  label: {
    type: String,
    default: 'Kategori',
  },
  prop: {
    type: String,
    default: 'category_id',
  },
  displayLabel: {
    type: Boolean,
    default: false,
  },
  hideButton: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: 'Pilih Kategori',
  },
  adminOnly: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  }
});

const loading = ref();
const inputValue = ref(props.modelValue);
const options = ref([])
const rawData = ref([])
const fetchData = () => {
  apiHelper.fetchList((val) => loading.value = val, (res: any) => {
    rawData.value = res.data.data
    options.value = rawData.value.map(x => ({
      label: x.name,
      value: x.id,
    }));
    setSelectedValue(inputValue.value);
  })
}

// Computed property to update inputValue when modelValue changes
const updateInputValue = () => {
  inputValue.value = props.modelValue;
};

// Handle input event
const onChange = (event) => {
  inputValue.value = event.target.value;
};

const openInNewTab = (path: string) => {
  window.open(urlByPath(path), '_blank', 'noreferrer');
}

const urlByPath = (path: string) => {
  return router.resolve({ path: path }).href;
};

const setSelectedValue = (newValue) => {
  const selectedValue = rawData.value.find(x => x.id === newValue)
  emit('onSelected', selectedValue);
}

// Emit input event on value change
watch(() => props.modelValue, updateInputValue);
watch(() => inputValue.value, (newValue) => {
  emit('update:modelValue', newValue);
  setSelectedValue(newValue);
});

onMounted(() => fetchData())
</script>
