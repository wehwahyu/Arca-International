<template>
  <div>
    <template  v-if="previewImageUrl">
      <div class="">
        <el-avatar shape="square"  :size="150" :src="previewImageUrl" />
      </div>
    </template>
    <el-upload
      class="avatar-uploader"
      list-type="picture-card"
      :file-list="fileList"
      :on-change="handleChange"
      :auto-upload="false"
      :before-upload="handleBeforeUpload"
      :accept="acceptedFileTypes.join(',')"
      :limit="fileLimit"
    >
      <el-button type="primary">Select File</el-button>
      <template #file="{ file }">
        <div>
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt=""/>
        </div>
      </template>
    </el-upload>
  </div>
</template>

<script setup lang="ts">
import {ref, watch, defineProps, getCurrentInstance} from 'vue';
import {ElUpload, ElButton, ElMessage} from 'element-plus';

const {emit} = getCurrentInstance();
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  fileType: {
    type: [String, Array],
    required: true
  },
  fileSize: {
    type: [String, Number],
    required: true
  },
  fileLimit: {
    type: [String, Number],
    default: 1
  }
});

const fileList = ref([]);
const previewImageUrl = ref(props.modelValue);
const imageUrl = ref(props.modelValue);
const acceptedFileTypes = ref(props.fileType);

watch(() => props.modelValue, (value) => {
  if (value?.raw) {
    imageUrl.value = value;
  } else {
    previewImageUrl.value = value;
  }
});

const handleChange = (file) => {
  if (file.status === 'success' || file.status === 'ready') {
    imageUrl.value = URL.createObjectURL(file.raw);
    previewImageUrl.value = null
  } else {
    imageUrl.value = '';
  }
  emit('update:modelValue', file);
};

const handleBeforeUpload = (file) => {
  const isFileTypeValid = file.type === props.fileType;
  const isFileSizeValid = file.size <= props.fileSize;

  if (!isFileTypeValid) {
    ElMessage.error(`File type must be ${props.fileType}`);
  }

  if (!isFileSizeValid) {
    ElMessage.error(`File size must not exceed ${props.fileSize} bytes`);
  }

  return isFileTypeValid && isFileSizeValid;
};
</script>

<style>
.el-upload.el-upload--picture-card {
  @apply border-0 h-auto w-auto !important;
}

.el-upload-list--picture-card {
  @apply flex flex-col !important;
}
</style>
