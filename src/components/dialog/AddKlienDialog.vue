<template>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    :width="width"
    :close-on-click-modal="false"
    align-center
    @close="handleClose"
  >
    <div class="flex flex-col gap-4">
      <el-form :model="store.data" :rules="formRules" :disabled="mode === 'detail'" ref="formRef" label-position="left"
        label-width="150px" class="w-full gap-2 flex flex-col" v-loading="store.loading" @submit.prevent="handleSubmitForm">
        <el-form-item label="Nama Klien" prop="name">
          <el-input v-model="store.data.name" placeholder="Input Nama Klien" clearable
            :style="{ width: '100%' }" />
        </el-form-item>
        <el-form-item label="Nomor Handphone" prop="phone">
          <el-input v-model="store.data.phone" placeholder="Input Nomor Handphone" clearable
            :style="{ width: '100%' }" />
        </el-form-item>
        <el-form-item label="Alamat" prop="address">
          <el-input v-model="store.data.address" type="textarea" placeholder="Input Alamat"
            :autosize="{ minRows: 4, maxRows: 4 }" :style="{ width: '100%' }" />
        </el-form-item>
        <el-form-item label="Note" prop="notes">
          <el-input v-model="store.data.notes" type="textarea" placeholder="Input Note"
            :autosize="{ minRows: 4, maxRows: 4 }" :style="{ width: '100%' }" />
        </el-form-item>
        <div class="flex justify-end w-full">
          <el-button class="w-20" type="success" @click="handleSubmitForm">Submit</el-button>
        </div>
      </el-form>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import {ref, defineProps, watch} from 'vue';
import useEventsBus from "/@/composables/useEventsBus"
import klienStore from '/@/store/module/klien';
import {formRules} from '/@/pages/master/klien/components/FormHelper'
import { wrapFormData } from '/@/helper/Helper'

const props = defineProps({
visible: {
    type: Boolean,
    default: false,
    required: true,
},
title: {
    type: String,
    default: 'Add Klien',
},
width: {
    type: String,
    default: '50%',
},
mode: {
    type: String,
},
});

const store = klienStore()
const loading = ref(false)
const formRef = ref()
const dialogVisible = ref(props.visible)
const {emit} = useEventsBus()

const handleClose = () => {
  dialogVisible.value = false;
  // Emit event closeDialog ke parent component
  emit('closeDialog');
};

const handleSubmitForm = () => {
  formRef.value.validate((valid: any) => {
    if (!valid) return
    store.submitForm(
      wrapFormData(store.data),
      'create',
      '',
      (res) => {
        if (res.isSuccess) {
          dialogVisible.value = false
          store.fetchList()
        }
      }
    )
  })
}

watch(() => props.visible, () => {
  dialogVisible.value = props.visible
})
</script>

<style>
.el-dialog__body {
@apply p-2 px-2 border-t !important;
}
.dialog-footer {
text-align: right;
padding-top: 10px;
}
</style>

<!-- <script setup lang="ts">
import {
  defineProps,
  onBeforeMount,
  ref,
  watch,
} from 'vue'
import { useRouter } from 'vue-router'
import useEventsBus from '/@/composables/useEventsBus'
import { wrapFormData } from '/@/helper/Helper'
import { FormProp } from '/@/types/pageProps'
import VisitTypeDropdown from '/@/components/dropdown/VisitTypeDropdown.vue'
import ClientDropdown from '/@/components/dropdown/ClientDropdown.vue'
import StatusDropdown from '/@/components/dropdown/StatusDropdown.vue'
import klienStore from '/@/store/module/klien';
import {convertDateToString} from "/@/helper/Helper";
import {
  formRules,
  pageRoute,
  setRules,
  apiRoute
} from '/@/pages/master/klien/components/FormHelper'
import { useRoute } from 'vue-router'

const route = useRoute()
const metaData = ref(route.meta)
const store = klienStore()
const { emit, bus } = useEventsBus()
const router = useRouter()
const loading = ref(false)
const props = defineProps<FormProp>()
const formRef = ref()
const handleSubmitForm = () => {
  formRef.value.validate((valid: any) => {
  if (!valid) return
  store.submitForm(
    wrapFormData(store.data),
    props.mode,
    props.id,
    (res) => {
      if (res.isSuccess) router.push(pageRoute)
    }
  )
  })
}

watch(() => bus.value.get('submitForm'), () => {
  handleSubmitForm()
})

onBeforeMount(() => {
  setRules(props.mode === 'update')
  store.fetchData(Number(props.id))
})
</script> -->