import Axios, { AxiosError, AxiosResponse } from "axios";

import { LocalStorageEnum, getLocalKey } from "./local-storage";

const axiosInstance = Axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => Promise.reject(error)
);

export const getApiInstance = (token?: string) => {
  const accessToken = token || getLocalKey(LocalStorageEnum.ACCESS_TOKEN);
  axiosInstance.interceptors.request.use((request) => {
    if (token) {
      request.headers.Authorization = `Bearer ${accessToken}`;
    }

    return request;
  });
  return axiosInstance;
};
