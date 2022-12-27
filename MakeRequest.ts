import axios, { AxiosRequestConfig } from "axios"

export const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
})

export async function makeRequest<T>(url:string, options:AxiosRequestConfig) {
  return await api<T>(url, options)
    .then(res => res.data)
    .catch(error => Promise.reject(error?.response?.data?.message ?? "Error"))
}