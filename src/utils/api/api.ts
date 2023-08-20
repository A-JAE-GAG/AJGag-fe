import { getCookie, setCookie } from "../infos/cookie";
import { setLocalStorage } from "../infos/loaclStorage";
import { GagDetailPage, GagListGet } from "../infos/types";
import Axios from "./axios";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";


const apiClient = axios.create({
  baseURL : process.env.REACT_APP_BASEURL,
  withCredentials: true,
})


export const postEmailConfirm = async (data : any)  => {
    console.log(data)
   const res = "adasdas"//await axios.get(`/api/emails/sendmail?email=${data}`);
    return res;
  };

  export const postSignUp = async (data : any)  => {
    console.log(data)
    const res = /*"asdasd"//*/await apiClient.post(`/api/users/signup`, data);
    return res;
  };

  export const postSignIn = async (data :any) =>{
    console.log(data)
    const res = await apiClient.post(`/api/users/login`, data)
    setLocalStorage("username", res?.data?.data.nickname)
    setCookie("token", res?.data?.data.token)
    console.log(res)
    return res
  }
  
  export const postGagAnswer = async (data :any) =>{
    const cookie = getCookie("token");
    const headers = {
      Authorization: cookie
    };
    console.log(data)
    //const res = await apiClient.post(`/api/gag${Id}`, data, { headers })
    const res = "asdasasdas"
    return res
  }

  //개그 타입 만들 필요
  export const postGag = async (data :any) =>{
    const cookie = getCookie("token");
    const { Id } = data;
    const headers = {
      Authorization: cookie
    };
    console.log(data)
    const res = await apiClient.post(`/api/gag`, data, { headers })
    return res
  }

  export const getGagPage = async (data: GagListGet) => {
    const { page, size, sort } = data;
    const cookie = getCookie("token");
    const headers = {
      Authorization: cookie
    };
    const res = await apiClient.get(
      `/api/gag?page=${page}&size=${size}&sort=${sort}`,{headers}
    );
    return res;
  }; 
  
  export const getGagDetailPage = async (data: GagDetailPage) => {
    const { Id } = data;
    const cookie = getCookie("token");
    const headers = {
      Authorization: cookie
    };
    const res = await apiClient.get(
      `/api/gag/${Id}`,{headers}
    );
    return res;
  };