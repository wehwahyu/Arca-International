import { defineStore } from 'pinia';
import store from '/@/store/index';
import { module } from '/@/types/module';
import { Pagination } from '/@/types/pagination';
import ApiHelper from '/@/helper/ApiHelper';
import { faker, fakerID_ID } from '@faker-js/faker';

const apiHelper = new ApiHelper('module');

const useStore = defineStore('moduleStore', {
  state: () => ({
    data: <module><unknown>{},
    tableData: <Pagination> {
      data: [] as module[],
      total: 0,
      per_page: 10,
      current_page: 1,
    },
    moduleData: [] as Array<module>,
    loading: false,
  }),
  getters: {},
  actions: {
    setLoading(val: boolean) {
      this.loading = val;
    },
    fetchData(id: number) {
      if (Number.isNaN(id)) {
        this.clearFormData();
        return;
      }
    
      apiHelper.fetchData(id, (val: boolean) => this.setLoading(val), (res: any) => {
        const data = res.data && res.data.data; // Check if res.data exists
        if (data) {
          // Check if roles property exists and has at least one role
          if (data.roles && data.roles.length > 0) {
            data.roles = data.roles[0].id;
          }
    
          this.data = <module> {
            id: data.id,
            name: data.name,
            label: data.label,
            url: data.url,
            icon: data.icon,
            is_active: data.is_active,
            slug: data.slug,
            access: data.access,
            description: data.description
          };
        } else {
          console.error('Invalid data structure:', res.data);
        }
      });
    },
    fetchDataTable(formData: any) {
      apiHelper.fetchDataTable(formData, (val: boolean) => this.setLoading(val), (res: any) => {
        this.tableData = res.data.data
      })
    },
    fetchDataModule() {
      apiHelper.get(
        'active-module',
        {},
        (val: boolean) => this.setLoading(val),
        {},
        (res: any) => {
          const data = res.data && res.data.data;
          if (data && Array.isArray(data)) {
            this.moduleData = data.map((item: any) => ({
              id: item.id,
              name: item.name,
              label: item.label,
              icon: item.icon,
              url: item.url,
              slug: item.slug,
              is_active: item.is_active,
              access: item.access,
              description: item.description,
            }));
          } else {
            console.error('Invalid data structure:', res.data);
          }
        }
      );
    },
    fetchDataList() {
      apiHelper.get(
        '',
        {},
        (val: boolean) => this.setLoading(val),
        {},
        (res: any) => {
          const data = res.data && res.data.data;
          if (data && Array.isArray(data)) {
            this.moduleData = data.map((item: any) => ({
              id: item.id,
              name: item.name,
              label: item.label,
              icon: item.icon,
              url: item.url,
              slug: item.slug,
              is_active: item.is_active,
              access: item.access,
              description: item.description,
            }));
          } else {
            console.error('Invalid data structure:', res.data);
          }
        }
      );
    },
    submitForm(formData: any, mode: any, id?: any, cb = (res: any) => {}) {
      const reqConfig = {
        headers: {
          "Content-Type": "application/json",
        }
      }
      if (mode === "create") {
        apiHelper.createData(formData, (val: boolean) => this.setLoading(val), reqConfig, (res: any) => {
          cb(res)
        })
      }
      console.log(formData)
      if (mode === "update") {
        apiHelper.updateData(formData, Number(id), (val: boolean) => this.setLoading(val), reqConfig, (res: any) => {
          cb(res)
        })
      }
    },
    remove(id: number, cb = (res: any) => {}) {
      apiHelper.removeData(id, (val: boolean) => this.setLoading(val), (res: any) => {
        cb(res)
      })
    },
    clearFormData() {
      this.data = <module> {};
    }
  },
});

export default function moduleStore() {
  return useStore(store)
}