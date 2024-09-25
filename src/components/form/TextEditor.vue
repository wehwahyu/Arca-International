<template>
  <div :class="(!label) ? 'hideField' : '' ">
  <el-form-item class="w-full" :label="label" :prop="prop">
    <div class="text-editor-wrapper w-full relative" :class="disable ? 'disabled' : ''">
      <QuillEditor
        v-model:content="editorModel"
        :options="quillOptions"
        :readOnly="disable"
        :enable="!disable"
        :placeholder="placeholder"
        :modules="quillModules"
        :style="{height: height}"
        contentType="html"
      />

<!--      <template #default="content">-->
<!--        <slot :slot-props="content" />-->
<!--      </template>-->
    </div>
  </el-form-item>
  </div>
</template>

<script setup lang="ts">
import {ref, defineProps, watch, defineEmits} from 'vue';
import "quill-image-resize-module/image-resize.min"


// Props passed to the component
const props = defineProps({
  label: String, // Label for the form item
  prop: String, // Prop name for validation
  placeholder: String, // placeholder for texteditor
  options: Object, // Additional props to pass to the vue-quill-editor
  modelValue: {
    type: String,
    required: true
  },
  height: {
    type: String,
    default: '200px'
  },
  disable: {
    type: Boolean,
    required: true,
    default: false
  },
});

// Initialize the v-model
const emit = defineEmits(['update:modelValue']);
const editorModel = ref(props.modelValue);

// Watch for changes in the editor model and emit the update event
watch(props, (newVal) => {
  editorModel.value = newVal.modelValue
}, {deep: true});
watch(editorModel, (newVal) => {
  emit(
    'update:modelValue',
    (newVal === "<p><br></p>")
        ? ""
        : newVal
  );
});

// Quill options
const quillOptions = {
  modules: {
    imageResize: {
      displayStyles: {
        backgroundColor: 'black',
        border: 'none',
        color: 'white',
      },
      modules: ['Resize', 'DisplaySize', 'Toolbar'],
    },
  }
};
const quillModules = [
  // {
  //   name: 'better-table',
  //   module: QuillBetterTable,
  //   options: {/* options */}
  // },
  // {
  //   name: 'image-resize',
  //   module: QuillImageResize,
  //   options: {/* options */}
  // },
];

</script>

<style>
.text-editor-wrapper.disabled .ql-toolbar {
  @apply hidden !important;
}
.text-editor-wrapper.disabled .ql-container.ql-disabled {
  @apply bg-gray-50 rounded-md border-0;
}
.text-editor-wrapper.disabled .ql-container.ql-disabled * {
  @apply cursor-default  text-gray-400 !important;
}
.text-editor-wrapper.disabled .ql-container .ql-editor {
  @apply rounded-md border !important;
}
.hideField {
  @apply w-full !important;
}
.hideField .el-form-item {
  @apply mb-0 !important;
}
.hideField .el-form-item__content {
  @apply ml-0 !important;
}
</style>