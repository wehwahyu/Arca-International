<template>
<div v-loading="loading">
    <el-form-item :label="label" :prop="id" v-if="displayLabel">
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
import {onMounted, ref, watch, defineProps, getCurrentInstance} from 'vue'
import ApiHelper from "/@/helper/ApiHelper";
const apiHelper = new ApiHelper('user')

const { emit } = getCurrentInstance();
const props = defineProps({
id: {
    type: String,
    default: ''
},
modelValue: {
    type: [String, Number, Object],
    required: true,
},
label: {
    type: String,
    default: 'PIC',
},
role: {
    type: String,
},
displayLabel: {
    type: Boolean,
    default: false,
},
placeholder: {
    type: String,
    default: 'Pilih PIC',
},
adminOnly: {
    type: Boolean,
    default: false,
},
});

const loading = ref();
const inputValue = ref(props.modelValue);
const options = ref([])
const fetchData = () => {
    let role = ""
    if (props.role) role = props.role
    apiHelper.fetchList((val) => loading.value = val, (res: any) => {
    let dataList = res.data.data.map(x => ({
        label: x.name,
        value: x.id,
        }));
        options.value = dataList
    }, {role})
}

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

// Handle input event
const onChange = (event) => {
inputValue.value = event.target.value;
};

onMounted(() => fetchData())
</script>
