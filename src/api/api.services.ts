//import { UseApiCall } from "../hooks/useApiAxios";
import axios, { AxiosResponse } from "axios";
import { loadAbort } from "../utilities/loadAbort.utility";

const URL_BASE = 'http://localhost:8080/';

// const token  = localStorage.getItem("user_access_token");
const { jwt : token} = JSON.parse(window.localStorage.getItem('user_access_token') || '{}'); 
const apiClient = axios.create({
     baseURL: URL_BASE,
     headers: {
            "Content-Type": "application/json",
             Authorization: `Bearer ${ token }`,
     }
})

export const apiRequest = async <T>(url: string, method: 'GET' | 'POST'| 'PUT' | 'DELETE' | 'PATCH',
    data?: T): Promise<T> => {
          const { signal } = loadAbort();
          const response: AxiosResponse<T> = await apiClient({
            method,
            url,
            data,
            signal
          }, )
    return response.data;
 }