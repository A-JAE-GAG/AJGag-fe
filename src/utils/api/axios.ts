import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { getCookie } from "../infos/cookie";

class Axios {
  public instance: AxiosInstance;

  constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      withCredentials: true,
    });
  }

  async get<T>(url: string): Promise<T> {
    const cookie = getCookie("token");
    const option: AxiosRequestConfig = {
      headers: {
        Authorization: cookie || "",
      },
    };
    const response = await this.instance.get<T>(url, option);
    return response.data;
  }

  async delete<T>(url: string): Promise<T> {
    const cookie = getCookie("token");
    const option: AxiosRequestConfig = {
      headers: {
        Authorization: cookie || "",
      },
    };
    const response = await this.instance.delete<T>(url, option);
    return response.data;
  }

  async post<T>(url: string, data: any, option?: AxiosRequestConfig): Promise<T> {
    const cookie = getCookie("token");
    const headers = {
      Authorization: cookie || "",
      ...option?.headers,
    };
    //console.log(this.instance)
    //console.log(url)
    //console.log(data)
    const response = await this.instance.post<T>(url, data, { headers });
    return response.data;
  }

  async patch<T>(url: string, data: any): Promise<T> {
    const cookie = getCookie("token");
    const option: AxiosRequestConfig = {
      headers: {
        Authorization: cookie || "",
      },
    };
    const response = await this.instance.patch<T>(url, data, option);
    return response.data;
  }

  async put<T>(url: string, data: any): Promise<T> {
    const cookie = getCookie("token");
    const option: AxiosRequestConfig = {
      headers: {
        Authorization: cookie || "",
      },
    };
    const response = await this.instance.put<T>(url, data, option);
    return response.data;
  }
}

export default Axios;
