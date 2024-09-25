<template>
  <el-form-item :label="label" :prop="inputProp">
    <div class="input-with-upload">
      <el-input v-model="inputValue" :placeholder="placeholder" clearable />
      <el-upload
        class="upload-btn h-auto"
        :on-change="handleUpload"
        :accept="allowedTypes.join(',')"
        :auto-upload="false"
        :show-file-list="false"
        multiple
      >
        <el-tooltip
          class="box-item"
          effect="dark"
          :content="`Allowed file types: ${allowedTypes.join(' ,')}`"
          placement="top-start"
        >
          <el-button type="primary">
            Upload
          </el-button>
        </el-tooltip>
      </el-upload>
    </div>
    <div class="py-2" >
      <div class="flex flex-col gap-2 divide-y" v-if="tmpFileList.length">
        <div class="flex gap-2 justify-between" v-for="file in tmpFileList" :key="file.name">
          <span class="italic text-gray-500">{{ file.name }}</span>
          <el-button
            type="danger"
            text
            @click="removeFile(file)"
            v-if="mode !== 'detail'"
          >Remove</el-button>
        </div>
      </div>
      <div class="flex flex-col gap-2 divide-y" v-if="uploadedFileList.length">
        <div class="flex gap-2 justify-between" v-for="file in uploadedFileList" :key="file.name">
          <span class="italic text-gray-500">{{ file.name }}</span>
          <div class="flex gap-2">
            <el-link
              type="primary"
              target="_blank"
              :href="file.url"
              :underline="false"
            >View</el-link>

            <el-popconfirm
              width="300"
              confirm-button-text="Yes"
              cancel-button-text="Cancel"
              icon-color="#626AEF"
              title="Yakin ingin menghapus file ini?"
              :icon="InfoFilled"
              @confirm="submitDelete(file.id)"
              v-if="mode !== 'detail'"
            >
              <template #reference>
                <el-link
                  type="danger"
                  :underline="false"
                >Remove</el-link>
              </template>
            </el-popconfirm>
          </div>
        </div>
      </div>
    </div>
  </el-form-item>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, getCurrentInstance } from 'vue';
import { ElInput, ElUpload, ElButton, ElMessage } from 'element-plus';
import ApiHelper from "/@/helper/ApiHelper";
const apiHelper = new ApiHelper('api.upload');

const props = defineProps({
  inputProp: {
    type: String,
    required: true,
  },
  modelValue: {
    type: [String, Number, Object],
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  fileList: {
    type: Array,
    default: () => [],
  },
  mode: {
    type: String || null,
    default: ''
  },
});

const inputValue = ref(props.modelValue);
const tmpFileList = ref([]);
const uploadedFileList = ref(props.fileList);
const allowedTypes = ['.doc', '.docx', '.pdf', '.jpg', '.jpeg', '.png'];
const loading = ref(false);

// Computed property to update inputValue when modelValue changes
const updateInputValue = () => {
  inputValue.value = props.modelValue;
};
// Emit input event on value change
watch(() => props.modelValue, updateInputValue);
watch(inputValue, (newValue) => {
  emit('update:modelValue', newValue);
});
watch(() => props.fileList, () => uploadedFileList.value = props.fileList);

const handleUpload = (file) => {
  // Check the file type
  const fileType = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();

  if (!allowedTypes.includes(fileType)) {
    ElMessage.error('Invalid file type. Please upload only .doc, .docx, .pdf, .jpg, .jpeg, or .png files.');
    return false; // Prevent upload
  }
  // Add selected files to the fileList array
  tmpFileList.value = tmpFileList.value.concat(file);

  // Emit the selected files and input value to the parent component
  emit('files-selected', { files: tmpFileList.value, inputValue: inputValue.value });
};

const removeFile = (file) => {
  // Remove the file from the fileList array
  tmpFileList.value = tmpFileList.value.filter((f) => f !== file);
};

const submitDelete = (deletedId) => {
  apiHelper.removeData(deletedId, loading, () => {
    uploadedFileList.value = uploadedFileList.value.filter(x => x.id !== deletedId)
  })
}

// Emit function to communicate with the parent component
const { emit } = getCurrentInstance();
</script>

<style scoped>
.input-with-upload {
  align-items: center;
  @apply w-full flex gap-2 justify-center content-center;
}

</style>
