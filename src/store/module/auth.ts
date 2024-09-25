import { defineStore } from 'pinia'
import store from '/@/store/index'
import {User} from "/@/types/user"
import Cookies from "js-cookie"
import ApiHelper from "/@/helper/ApiHelper"
const apiHelper = new ApiHelper('')

const useStore = defineStore('authStore', {
  state: () => ({
    user: <User> {},
    token: Cookies.get('token') as string | null,
    loading: false
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    login(formData: any, cb: any = (res: any) => {}) {
      const reqConfig = {
        headers: {
          "Content-Type": "application/json",
        }
      }
      apiHelper.post('login', formData, this.loading, reqConfig, (res: any) => {
        // set token data
        if (res.isSuccess) this.token = res.data.data.token;
        this.user = res.data.data.user
        Cookies.set('token', res.data.data.token)
        // send callback
        cb(res)
      }, 'Login')
    },
    logout(cb = res => {}) {
      apiHelper.get('logout', {}, this.loading, {}, (res: any) => {
        // set token data
        if (res?.isSuccess) {
          this.token = ""
          this.user = <User>{}
          Cookies.remove('token')
          // send callback
          cb(res)
        } else {
          cb(res)
        }
      }, 'Login')
    },
    getProfile(cb: any = (res: any) => {}) {
      apiHelper.get('user/current-profile', {}, this.loading, {}, (res: any) => {
        this.user = res.data?.data
        cb(res)
      })
    },
    authorize(formData: any, cb: any = (res: any) => {}) {
      const reqConfig = {
        headers: {
          "Content-Type": "application/json",
        }
      }
      apiHelper.post('authorize', formData, this.loading, reqConfig, (res: any) => {
        cb(res)
      },)
    },
    clearFormData() {
      this.user = <User> {};
    },
    clearLoginData() {
      Cookies.remove('token')
      this.token = ""
      this.clearFormData()
    }
  }
})

export default function authStore() {
  return useStore(store)
}
