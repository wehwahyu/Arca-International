<template>
  <div v-loading="loading">
    <el-form-item :label="label" prop="kota" v-if="displayLabel">
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
      <el-select class="w-full" v-model="inputValue" :aria-abel="label" clearable filterable>
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
import {onMounted, ref, watch, watchEffect, defineProps, getCurrentInstance} from 'vue'
import ApiHelper from "/@/helper/ApiHelper";
import { useRoute } from 'vue-router';

const apiHelper = new ApiHelper('provinsi')
interface Option {
  label: string;
  value: any;
}
const { emit } = getCurrentInstance();
const props = defineProps({
  modelValue: {
    type: [String, Number, Object],
    required: true,
  },
  provId: {
    type: Number,
  },
  label: {
    type: String,
    default: 'Provinsi',
  },
  displayLabel: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: 'Pilih Provinsi',
  },
  adminOnly: {
    type: Boolean,
    default: false,
  },
});

const route = useRoute();
const loading = ref();
const inputValue = ref(props.modelValue);
const dropdownValues = ref([]);
const options = ref<Option[]>([])
const fetchData = () => {
  apiHelper.fetchList((val) => loading.value = val, (res: any) => {
    const restData = res.data.data

    dropdownValues.value = restData.map((x: any) => ({
      label: x.provinsi,
      value: x.id,
    }));
    options.value = dropdownValues.value

    if (route.query.provinsi_id) {
        const selectedOption = options.value.find(option => option.value == route.query.provinsi_id);
        if (selectedOption) {
          inputValue.value = selectedOption.value;
        }
      }
  })
}

// Emit input event on value change
watchEffect(() => {
  emit('update:modelValue', inputValue.value);
});

// Handle input event
const onChange = (event: any) => {
  inputValue.value = event.target.value;
};

onMounted(() => {
  fetchData();
  watchEffect(() => {
    if (route.query.provinsi_id) {
      const selectedOption = options.value.find(option => option.value == route.query.provinsi_id);
      if (selectedOption) {
        inputValue.value = selectedOption.value;
      }
    }
  });
});
</script>