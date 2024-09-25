import axios from 'axios'
import { ElNotification } from 'element-plus'
import Cookies from 'js-cookie'

import authStore from '/@/store/module/auth'

class ApiHelper {
  routeName: string = ""

  constructor(routeName: string) {
    this.routeName = (routeName) ? `api/${routeName}` : "api";
    axios.defaults.baseURL = import.meta.env.VITE_API_URL

    const token = Cookies.get('token');
    if (token) {
      axios.defaults.headers.common = {
        'Authorization': `Bearer ${token}`,
        'Accept': `application/json`,
      };
    }
  }

  setRouteName(routeName: string): void {
    this.routeName = routeName ? `api/${routeName}` : 'api';
  }

  isSuccess(res: any) {
    return (
      res !== undefined && (
        res.data?.code === 200 ||
        res.data === 1
      )
    );
  }
  
  displayNotification(res: any, prefix = 'Save Data') {
    if (res === undefined) return
    const isSuccess = this.isSuccess(res);
    ElNotification.closeAll()
    ElNotification({
      title: `${prefix} ${isSuccess ? "Success" : "Failed"}`,
      message: isSuccess ? res.data.message : res.data?.message,
      type: isSuccess ? "success" : "error",
    })
  }

  parseResponseMessage(
    response: any,
    success: boolean,
    loading: any,
    displayNotificaiton: boolean = true,
    cb:any = () => {},
    prefixMessage: string = ""
  ) {
    if (success) {
      if (displayNotificaiton) this.displayNotification(response, prefixMessage);
      this.setLoading(loading, false);
      response.isSuccess = this.isSuccess(response)
      cb(response);
    } else {
      const errResponse = response.response;
      if (displayNotificaiton) this.displayNotification(errResponse, prefixMessage);
      response.isSuccess = this.isSuccess(response)
      this.setLoading(loading, false);
  
      // action to clear login data
      if (response.response.status === 401) {
        authStore().clearLoginData()
        window.location.href = "/login"
      } else {
        cb(errResponse);
      }
    }
  }

  setLoading(loading: any, val: boolean) {
    if( !(loading === true || loading === false) ) {
      loading(val); // Update the value of the loading ref
    }
  }

  fetchData(id: number, loading: any, cb:any  = () => {}) {
    this.get(
      `detail/${id}`,
      {},
      loading,
      {},
      (res: any) => cb(res)
    )
  }

  fetchList(loading: any, cb:any  = () => {}, params?: any) {
    this.get(
      ``,
      {params},
      loading,
      {},
      (res: any) => cb(res)
    )
  }

  fetchTable(formData: any, loading: any, cb: any = () => {}) {
    this.get(
      `table`,
      formData,
      loading,
      {},
      (res: any) => cb(res)
    )
  }

  fetchDataTable(formData: any, loading: any, cb: any = () => {}) {
    this.postTable(
      `table`,
      formData,
      loading,
      {},
      (res: any) => cb(res)
    )
  }

  createData(data: any, loading: any, config: any = {}, cb : any= () => {}) {
    this.post(
      `save`,
      data,
      loading,
      config,
      (res: any) => cb(res)
    )
  }

  updateData(data: any, id: number, loading: any, config: any = {}, cb:any = () => {}) {
    this.put(
      `update`,
      id,
      data,
      loading,
      config,
      (res: any) => cb(res)
    )
  }

  removeData(id: number, loading: any, cb:any = () => {}) {
    this.remove(
      `${id}`,
      {},
      loading,
      {},
      (res: any) => cb(res)
    )
  }

  // base api request
  get(
    routeName: string,
    params: any,
    loading: any,
    config: any = {},
    cb: any = () => {},
    messagePrefix: string = "Fetch Data"
  ) {
    this.setLoading(loading, true);
    axios.get(
      (routeName) ? `${this.routeName}/${routeName}` : this.routeName,
      {
        headers: {
          "Content-Type": "application/json",
        },
        ...params,
        ...config
      }
    ).then((res: any) => {
      this.parseResponseMessage(res, true, loading, false,(res: any) => cb(res), messagePrefix)
      cb(res)
    }).catch((err) => {
      this.parseResponseMessage(err, false, loading, true,(res: any) => cb(res), messagePrefix)
    })
  }

  post (
    routeName: string,
    data: any,
    loading: any,
    config: any = {},
    cb: any = () => {},
    messagePrefix: string = "Create Data",
    displayNotification = true
  ) {
    this.setLoading(loading, true);
    axios.post(
      (routeName) ? `${this.routeName}/${routeName}` : this.routeName,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        ...config
      }
    ).then((res: any) => {
      this.parseResponseMessage(res, true, loading, displayNotification,(res: any) => cb(res), messagePrefix)
      cb(res)
    }).catch((err) => {
      this.parseResponseMessage(err, false, loading, displayNotification,(res: any) => cb(res), messagePrefix)
    })
  }

  postTable(
    routeName: string,
    data: any,
    loading: any,
    config: any = {},
    cb: any = () => {}
  ) {
    this.setLoading(loading, true);
    axios.post(
      (routeName) ? `${this.routeName}/${routeName}` : this.routeName,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
        ...config
      }
    ).then((res: any) => {
      this.parseResponseMessage(res, true, loading, false,(res: any) => cb(res), 'Fetch Data')
      cb(res)
    }).catch((err) => {
      this.parseResponseMessage(err, false, loading, true,(res: any) => cb(res), 'Fetch Data')
    })
  }

  put(
    routeName: string,
    id: number,
    data: any,
    loading: any,
    config: any = {},
    cb: any = () => {},
    messagePrefix: string = "Update Data",
    displayNotification = true
  ) {
    let url = `${routeName}/${id}`
    
    if (data instanceof FormData) data.append('_method', 'PUT');
    else url += "?_method=PUT"

    this.post(
      url,
      data,
      loading,
      config,
      (res: any) => cb(res),
      messagePrefix,
      displayNotification
    )
  }

  remove(
    routeName: string,
    params: any,
    loading: any,
    config: any = {},
    cb: any = () => {},
    messagePrefix: string = "Remove Data"
  ) {
    this.setLoading(loading, true);
    axios.delete(
      (routeName) ? `${this.routeName}/${routeName}` : this.routeName,
      {
        ...config,
        ...params
      }
    )
      .then((res: any) => {
        this.parseResponseMessage(res, true, loading, true,(res: any) => cb(res), messagePrefix)
        cb(res)
      }).catch((err) => {
      this.parseResponseMessage(err, false, loading, true,(res: any) => cb(res), messagePrefix)
    })
  }
}

export default ApiHelper;
