import { setCookie } from "../infos/cookie";
import { setLocalStorage } from "../infos/loaclStorage";
import Axios from "./axios";

const axios = new Axios(process.env.REACT_APP_BASEURL as string);

export const postEmailConfirm = async (data : any)  => {
    console.log(data)
    const res = await axios.get(`/api/emails/sendmail?email=${data}`);
    return res;
  };