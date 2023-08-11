import { setCookie } from "../infos/cookie";
import { setLocalStorage } from "../infos/loaclStorage";
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
    console.log(process.env.REACT_APP_BASEURL as string)
    console.log(apiClient) 
    const res = /*"asdasd"//*/await apiClient.post(`/api/users/signup`, data);
    return res;
  };

  export const postSignIn = async (data :any) =>{
    console.log(data)
    const res = await apiClient.post(`/api/users/login`, data)
    console.log(res)
    return res
  }