import {defineStore} from 'pinia';
import store from '/@/store/index';
import {faker} from '@faker-js/faker';
import {useStorage} from "@vueuse/core";
import {Product} from "/@/types/product";

const useStore = defineStore('productStore', {
  state: () => ({
    data: useStorage('productCatalog', [] as Array<Product>),
    loading: false,
  }),
  getters: {
    getBarangListByKode: (state) => {
      return (name: string) => {
        return state.data.filter(x => x.productName.includes(name))
      }
    }
  },
  actions: {
    setLoading(val: boolean) {
      this.loading = val;
    },
    createRandKatalog() {
      const productName = faker.commerce.productName();
      const price = faker.commerce.price({min: 100000, max: 5000000});
      const qty = faker.number.int({min: 0, max: 100});
      const description = faker.commerce.productDescription();
      return {
        id: faker.string.uuid(),
        productName,
        price,
        qty,
        description,
      } as product;
    },
    fetchData() {
      for (let i = 0; i < 100; i++) {
        this.data.push(this.createRandKatalog());
      }
    },
  },
});


export default function productStore() {
  return useStore(store)
}