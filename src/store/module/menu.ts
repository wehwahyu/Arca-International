import { defineStore } from 'pinia';
import store from '/@/store/index';
import { Menu, MenuItems } from "/@/types/Menu";
import {
  dashboardMenu,
  reportMenu,
} from "/@/data/Menu";

const useStore = defineStore('menuStore', {
  state: () => ({
    menuItems: dashboardMenu.concat(reportMenu) as Array<MenuItems>,
    menu: <Menu>{},
    listMenu: [] as Array<Menu>,
    loading: false,
  }),
  getters: {},
  actions: {
    setLoading(val: boolean) {
      this.loading = val;
    },
  }
});

export default function menuStore() {
  return useStore(store);
}
