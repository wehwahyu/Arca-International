<template>
  <div class="flex items-center">
    <el-avatar
      shape="square"
      :size="50"
      fit="fill"
      :src="columnVal.profile_picture_url ? columnVal.profile_picture_url : '/public/default.png'"
    />
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const props = defineProps(['params'])
const columnVal = ref(props.params.data)
</script>