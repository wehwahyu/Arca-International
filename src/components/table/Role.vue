<template>
    <div v-for="(item, index) of columnVal.value" :key="index" class="flex items-center">
        <el-tag class="ml-2" type="success" size="large">{{ item }}</el-tag>
    </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const props = defineProps(['params'])
const columnVal = ref(props.params)
</script>