<template>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    :width="width"
    :close-on-click-modal="false"
    align-center
  >
    <div class="py-4">
      <span>{{ message }}</span>
      <slot></slot>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="success" @click="submitApprove">Approve</el-button>
        <el-button type="danger" @click="submitReject">Reject</el-button>
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
    default: 'Data Approval',
  },
  message: {
    type: String,
    default: 'Please give a note to this request.',
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
const emit = defineEmits(['update:visible', 'doApproval']);

watch(() => props.visible, () => {
  dialogVisible.value = props.visible
})
watch(() => dialogVisible.value, (val) => {
  emit('update:visible', val)
})

/**
 * submit approval data
 */
const submitApprove = () => {
  emit('doApproval', true)
}
const submitReject = () => {
  emit('doApproval', false)
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
