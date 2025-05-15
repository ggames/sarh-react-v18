import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

let axiosInstance: AxiosInstance;

const baseURL = "http://localhost:8080/";



const createAxios = (urlBase: string) => {
  axiosInstance = axios.create({
    baseURL: urlBase,
  });
};

const setupInterceptors = () => {
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
   
       const { jwt: token }= JSON.parse(window.localStorage.getItem('user_access_token') || '{}'); 
       console.log("Token", token);
   
       if (token) {
        config.headers.Authorization = `Bearer ${ token}`; 
      }
      console.log("Request Interceptor", config);
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      console.log(`Response from: ${response.config.url} `, {
        data: response.data,
        status: response.status,
      });
      return response;
    },
    (error: AxiosError) => {
      if (error.response) {
        console.log("Response Interceptor", error.response);
      }
      return Promise.reject(error);
    }
  );
};


export const initAxios = () => {
    createAxios(baseURL);
    setupInterceptors();
  return axiosInstance;
}