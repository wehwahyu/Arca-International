<template>
  <div class="upload-multi-file" :class="hideDropBox ? 'hideDropBox' : '' ">
    <el-form-item
      :label="label"
      :rules="rule"
    />
    <el-upload
      ref="uploadRef"
      v-model:file-list="fileList"
      class="upload-demo"
      drag
      list-type="picture-card"
      :multiple="limit > 1"
      :auto-upload="false"
      :accept="accept"
      :limit="limit"
      :disabled="disabled"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-change="handleChange"
    >
      <el-icon class="el-icon--upload">
        <upload-filled/>
      </el-icon>
      <div class="el-upload__text">
        Drop file here or <em>click to upload</em>
      </div>
    </el-upload>

    <el-dialog v-model="dialogVisible">
      <img class="w-full" :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {UploadFilled} from '@element-plus/icons-vue'
import {defineProps, ref, watch, getCurrentInstance, onMounted} from "vue";
import type { UploadProps } from 'element-plus'
import { ElUpload } from 'element-plus';

const {emit} = getCurrentInstance();
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  existingFiles: {
    type: [Array, String, Object]
  },
  storedFiles: {
    type: [Array, String, Object]
  },
  label: {
    type: String,
    default: "Upload File"
  },
  rule: {
    type: Object
  },
  disabled: {
    type: Boolean,
    default: false
  },
  limit: {
    type: Number
  },
  accept: {
    type: String,
    default: "image/*,video/*,.pdf,.doc,.docx,.ods"
  },
})

const uploadRef = ref(null);
const hideDropBox = ref(false);
const fileList = ref([]);
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const removedIds = ref([])

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log('uploadFile', uploadFile)
  if (uploadFile.id) {
    removedIds.value.push(uploadFile.id)
    emit('removedIds', removedIds);
  }
  setHideDropBox(false)
}

const handleChange = (file: File) => {
  fileList.value = [
    ...fileList.value,
    file as File
  ]
  emit('update:modelValue', fileList);
  setHideDropBox(true)
};

const setHideDropBox = (val) => {
  // set hide dropbox value
  if (
      props.limit == 1 &&
      (props.storedFiles || props.existingFiles)
  ) hideDropBox.value = val
}

watch(() => props.existingFiles, (existingFiles) => {
  if (Array.isArray(existingFiles)) {
    let parsedExistingFiles = existingFiles as Array<string>
    fileList.value = parsedExistingFiles.map(x => ({
      name: props.label,
      url: x
    }))
  } else {
    if (existingFiles !== "") {
      fileList.value = [{
        name: props.label,
        url: existingFiles
      }]
      setHideDropBox(true)
    }
  }
});
watch(() => props.storedFiles, (storedFiles) => {
  let parsedExistingFiles = storedFiles as Array<Object>

  if (parsedExistingFiles && parsedExistingFiles.length > 0) {
    fileList.value = parsedExistingFiles.map(x => ({
      id: x['id'],
      name: x['name'],
      url: x['url'],
    }))
    setHideDropBox(true)
  }
});

onMounted(() => {
  fileList.value = []
  removedIds.value = []
})
</script>

<style>
.upload-multi-file .el-upload {
  @apply w-full !important;
}
.upload-multi-file .el-form-item {
  @apply mb-0 !important;
}
.upload-multi-file .el-form-item .el-form-item__label {
  @apply w-full !important;
}
.upload-multi-file .el-upload-list {
  @apply w-full !important;
}
.upload-multi-file .el-upload-list .el-upload-dragger {
  @apply p-2 h-full w-full !important;
}
.hideDropBox .upload-demo .el-upload {
  @apply hidden !important;
}
</style>