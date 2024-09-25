import { AxiosResponse } from "axios";
import ApiService from "/@/helper/ApiService";

const apiService = new ApiService();

const getListBarangBy = async (data: string): Promise<AxiosResponse | any> => {
  try {
    const apiRouteName = "product"
    const result = await apiService.getListBy(apiRouteName, data);
    return result.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export { getListBarangBy };
