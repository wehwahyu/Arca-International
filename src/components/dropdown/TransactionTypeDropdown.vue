<template>
<div v-loading="loading">
    <el-form-item :label="label" :prop="id" v-if="displayLabel">
    <el-select
        class="w-full"
        v-model="inputValue"
        :aria-abel="label"
        :placeholder="placeholder"
        :disabled="disabled"
        clearable
        filterable
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
    <el-select class="w-full" v-model="inputValue" :aria-abel="label" :placeholder="placeholder" clearable filterable>
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
import useStore from '/@/store/module/transactionType'

const store = useStore()

interface Option {
label: string;
value: any;
}


const emits = defineEmits(['update:modelValue'])
const props = defineProps({
id: {
    type: String,
    default: 'transaction_type_id'
},
modelValue: {
    type: [String, Number, Object],
    required: true,
},
label: {
    type: String,
    default: 'Transaction Type',
},
displayLabel: {
    type: Boolean,
    default: true,
},
placeholder: {
    type: String,
    default: 'Pilih Transaction Type',
},
adminOnly: {
    type: Boolean,
    default: false,
},
disabled: {
    type: Boolean,
    default: false,
},
jenisTransaksiId: {
    type: Number,
    required: true
},
});

const loading = ref();
const inputValue = ref(props.modelValue);
const options = ref<Option[]>([])
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
}
);

// Handle input event
const onChange = (event: any) => {
inputValue.value = event.target.value;
};

onMounted(() => fetchData())
</script>
