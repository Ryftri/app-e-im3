import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../axiosBaseQuery";
import { getCookie } from 'cookies-next';

export const ApiEiM3Slice = createApi({
  baseQuery: axiosBaseQuery({ baseUrl: 'https://rehan.niznet.my.id' }),
  endpoints: (build) => ({
  }),
})