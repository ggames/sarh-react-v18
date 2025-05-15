import  axios from "axios";

const baseURL = "http://localhost:8080/";

const { jwt }= JSON.parse(window.localStorage.getItem('user_access_token') || '{}'); 

//const token  = localStorage.getItem("user_access_token");


export const apiService = 
  axios.create({
      baseURL: baseURL,
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      withCredentials: true,})


 /*export const apiService = 
  axios.create({
      baseURL: baseURL,
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      withCredentials: true,})


export const apiRequest = async <T>(url: string, method: 'GET' | 'POST'| 'PUT' | 'DELETE' | 'PATCH', 
  data?: T): Promise<T> =>  {
  const response: AxiosResponse<T> = await apiService({
    method,
    url,
    data,
  })

  return response.data;
}
 */