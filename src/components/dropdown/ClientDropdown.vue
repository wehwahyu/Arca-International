<template>
  <div class="flex w-full" v-loading="loading">
    <el-form-item class="w-full" :label="label" :prop="prop" v-if="displayLabel">
      <el-select
          v-model="inputValue"
          :aria-abel="label"
          :placeholder="placeholder"
          :disabled="disabled"
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
    <div class="w-full" v-else>
      <el-select
          v-model="inputValue"
          :aria-abel="label"
          :placeholder="placeholder"
          :disabled="disabled"
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
    <div>
      <el-button class="flex-none w-8" :icon="Refresh" @click="fetchData" v-if="hideButton"/>
    </div>
    <div>
      <el-button class="flex-none w-8" :icon="Plus" @click="emit('addKlien')" v-if="hideButton"/>
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
import authStore from '/@/store/module/auth'
import useStore from '/@/store/module/klien'
import {Refresh, Plus} from '@element-plus/icons-vue'
import {useRouter} from "vue-router";
import useEventsBus from '/@/composables/useEventsBus'

const { emit } = useEventsBus()
const router = useRouter()
const store = useStore()
interface Option {
  label: string;
  value: any;
  disabled: boolean;
}

const apiHelper = new ApiHelper('gudang')

const emits = defineEmits(['update:modelValue', 'updatePhone'])
const props = defineProps({
  modelValue: {
    type: [String, Number, Object],
    required: true,
  },
  label: {
    type: String,
    default: 'Klien',
  },
  prop: {
    type: String,
    default: 'client_id',
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
    default: 'Pilih Klien',
  },
  adminOnly: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  useOptions: {
    type: Array as () => Option[],
    default: () => []
  },
  id: {
    type: [String, Number],
    required: true,
  },
  mode: {
    type: String,
    required: true
  }
});

const authData = authStore()

const loading = ref();
const inputValue = ref(props.modelValue);
const gudangList = ref<Option[]>([])
const dropdownLabel = ref<any | undefined>("")
const disableSelect = ref(props.disabled);
const options = ref<Option[]>(props.useOptions)
const fetchData = () => {
  store.fetchList()
}
// Computed property to update inputValue when modelValue changes
const updateInputValue = () => {
  inputValue.value = props.modelValue;
};

const openInNewTab = (path: string) => {
  window.open(urlByPath(path), '_blank', 'noreferrer');
}
const urlByPath = (path: string) => {
  return router.resolve({path: path}).href;
};
// Emit input event on value change
watch(() => props.modelValue, () => {
  setDropdownLabel();
  updateInputValue();
});
watch(() => inputValue.value, (newValue) => {
  emits('update:modelValue', newValue);
});
watch(() => dropdownLabel.value, (newValue) => {
  console.log(newValue)
  emits('updatePhone', newValue);
});

const setDropdownLabel = () => {
  inputValue.value = props.modelValue;
  const selectedClient = store.list.find(client => client.id === props.modelValue);
  if (selectedClient) {
    dropdownLabel.value = selectedClient.phone;
  }
};

// Handle input event
const onChange = (event: any) => {
  inputValue.value = event.target.value;
  setDropdownLabel()
};

onMounted(() => {
  fetchData()
})
</script>