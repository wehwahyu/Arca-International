import {defineStore} from 'pinia';
import store from '/@/store/index';
import {product} from '/@/types/product';
import {faker} from '@faker-js/faker';
import {useStorage} from "@vueuse/core";
import {SaleItem, Sales} from "/@/types/sale";

const useStore = defineStore('saleStore', {
  state: () => ({
    formData: {price: 0, product: undefined, productId: null, qty: 0, totalPrice: 0} as SaleItem,
    saleData: {totalPrice:0 ,items: [], totalProduct: 0, totalQty: 0, createdAt: null} as Sales,
    transactions: useStorage('saleTransactions', [] as Array<Sales>),
    loading: false,
  }),
  getters: {},
  actions: {
    setLoading(val: boolean) {
      this.loading = val;
    },
    createRandKatalog() {
      const productName = faker.commerce.productName();
      const price = faker.commerce.price();
      const description = faker.commerce.productDescription();
      return {
        id: faker.string.uuid(),
        productName,
        price,
        description,
      } as product;
    },
    fetchData() {
      for (let i = 0; i < 100; i++) {
        this.data.push(this.createRandKatalog());
      }
    },
    rewriteSummary() {
      let no = 0, totalPrice = 0, totalProduct = 0, totalQuantity = 0;
      const items = this.saleData.items.map((x: SaleItem) => {
        no += 1
        totalPrice += Number(x.totalPrice)
        totalQuantity += Number(x.qty)
        return {
          ...x,
          no,
        }
      })
      totalProduct = this.saleData.items.length
      this.saleData = {
        items,
        totalPrice,
        totalProduct,
        totalQuantity,
      }
    },
    saveData() {
      this.saleData.id = faker.string.uuid();
      this.saleData.createdAt = Date();
      this.transactions.push(this.saleData)
      let no = 0;
      this.transactions = this.transactions.map(x => {
        no += 1
        return {
          ...x,
          no,
        }
      })
      this.clearData()
    },
    clearData() {
      this.formData = {price: 0, product: undefined, productId: null, qty: 0, totalPrice: 0};
      this.saleData = {totalPrice:0 ,items: [], totalProduct: 0, totalQty: 0, createdAt: null};
    }
  },
});


export default function saleStore() {
  return useStore(store)
}