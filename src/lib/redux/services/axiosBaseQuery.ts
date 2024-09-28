import { GlobalResponse } from "@/types/GlobalResponse"
import { BaseQueryFn } from "@reduxjs/toolkit/query/react"
import axios, { AxiosRequestConfig, AxiosError } from "axios"

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
  ): BaseQueryFn<
    {
      url: string
      method?: AxiosRequestConfig['method']
      body?: AxiosRequestConfig['data']
      params?: AxiosRequestConfig['params']
      headers?: AxiosRequestConfig['headers'],
      withCredentials?: AxiosRequestConfig['withCredentials']
    },
    unknown,
    GlobalResponse
  > =>
    async ({ url, method, body, params, headers, withCredentials = true }) => {
      try {
        const result = await axios({
          url: baseUrl + url,
          method,
          data: body,
          params,
          headers,
          withCredentials
        })
        return { data: result.data }
      } catch (axiosError) {
        const err = axiosError as AxiosError<GlobalResponse>;
        const status = err.response?.data.status;
        const message = err.response?.data.message;
        const error: GlobalResponse = {
          status: status || "failed",
          message: message || "Terjadi Kesalahan",
        };

        return {
          error
        };
      }
    }