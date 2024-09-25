import { reactive } from 'vue'

export const moduleName = 'Barang'
export const pageRoute = '/master/pengujian';
export const apiRoute = 'barang';

// =================
// form functionality
// =================
const baseFormRules = {
  nama: [
    {
      required: true,
      message: 'Nama Barang is required',
      trigger: 'blur'
    }
  ],
  kode: [
    {
      required: true,
      message: 'Kode Barang is required',
      trigger: 'change'
    }
  ],
  kategori_id: [
    {
      required: true,
      message: 'Kategori is required',
      trigger: 'change'
    }
  ],
  merek_id: [
    {
      required: true,
      message: 'Merek is required',
      trigger: 'change'
    }
  ],
  ukuran: [
    {
      required: false,
      message: 'Ukuran is required',
      trigger: 'change'
    }
  ],
  satuan_ids: [
    {
      required: true,
      message: 'Unit/Satuan is required',
      trigger: 'change'
    }
  ],
  harga_jual: [
    {
      required: true,
      message: 'Standar Harga Jual is required',
      trigger: 'change'
    }
  ]
}
export const formRules = reactive({})

export const setRules = (isEdit = false) => {
  const newBaseFormRule = JSON.parse(JSON.stringify(baseFormRules))
  Object.assign(formRules, newBaseFormRule)
}


