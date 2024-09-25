import { reactive } from 'vue'

export const moduleName = 'Kategori'
export const modulePath = 'kategori'
export const pageRoute = '/master/kategori';
export const apiRoute = 'product-category';

// =================
// form functionality
// =================
const baseFormRules = {
  name: [
    {
      required: true,
      message: 'Nama Klien is required',
      trigger: 'blur'
    }
  ],
  phone: [
    {
      required: true,
      message: 'Nomor Handphone Merek is required',
      trigger: 'change'
    }
  ],
  keterangan: [
    {
      required: false,
      message: 'Keterangan is required',
      trigger: 'change'
    }
  ]
}
export const formRules = reactive({})

export const setRules = (isEdit = false) => {
  const newBaseFormRule = JSON.parse(JSON.stringify(baseFormRules))
  Object.assign(formRules, newBaseFormRule)
}


