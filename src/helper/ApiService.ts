import { AxiosResponse } from "axios";
import ApiHelper from "./ApiHelper";

class ApiService {
  private apiHelper: ApiHelper;

  constructor() {
    this.apiHelper = new ApiHelper('');
  }

  getListBy(routeName: string, data: string): Promise<AxiosResponse> {
    this.apiHelper.setRouteName(routeName);
    return new Promise((resolve) => {
      this.apiHelper.fetchList(false, (res: any) => {
        resolve(res);
      }, { q: data });
    })
  }
}

export default ApiService;