<template>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    :width="width"
    :close-on-click-modal="false"
    align-center
    append-to-body
  >
    <div class="py-4">
      <span>{{ message }}</span>
      <slot></slot>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="danger" @click="submitDelete">
          Remove
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {ref, defineProps, defineEmits, watch} from 'vue';
import ApiHelper from "/@/helper/ApiHelper";

const loading = ref(false)
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
    required: true,
  },
  title: {
    type: String,
    default: 'Remove the data?',
  },
  message: {
    type: String,
    default: 'Are you sure you want to remove this data.',
  },
  width: {
    type: String,
    default: '30%',
  },
  apiRoute: {
    type: String,
    required: true,
  },
  id: {
    type: [String, Number],
    required: true,
  },
});

const apiHelper = new ApiHelper(String(props.apiRoute))
const dialogVisible = ref(props.visible)
const emit = defineEmits(['update:visible', 'reloadData']);

watch(() => props.visible, () => {
  dialogVisible.value = props.visible
})
watch(() => dialogVisible.value, (val) => {
  emit('update:visible', val)
})

/**
 * submit delete data
 */
const submitDelete = () => {
  apiHelper.removeData(props.id, (e) => loading.value = e, () => {
    dialogVisible.value = false
    emit('reloadData', true)
  })
}
</script>

<style>
.el-dialog__body {
  @apply p-2 px-5 border !important;
}
.dialog-footer {
  text-align: right;
  padding-top: 10px;
}
</style>
