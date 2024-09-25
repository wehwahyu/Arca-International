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
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="danger" @click="submitDelete">
          Remove
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {
  ref,
  watch,
} from 'vue'

const emits = defineEmits(['update:visible', 'update:on-delete']);
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
  id: {
    validator: (value) => {
      return value === undefined || typeof value === 'string' || typeof value === 'number';
    },
    required: true,
  },
});

const dialogVisible = ref(props.visible)

watch(() => props.visible, () => {
  dialogVisible.value = props.visible
})
watch(() => dialogVisible.value, (val) => {
  emits('update:visible', val)
})

const submitDelete = () => {
  emits('update:on-delete', props.id)
}
</script>