import Axios, { AxiosError, AxiosResponse } from "axios";

import { LocalStorageEnum, getLocalKey } from "./local-storage";

export const getApiInstance = (token?: string) => {
  const local = getLocalKey(LocalStorageEnum.ACCESS_TOKEN);
  const accessToken = token ?? local;

  const axiosInstance = Axios.create({
    headers: {
      "Content-Type": "application/json",
    },
  });

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => Promise.reject(error)
  );

  axiosInstance.interceptors.request.use((request) => {
    if (accessToken) {
      request.headers.Authorization = `Bearer ${accessToken}`;
    }

    return request;
  });
  return axiosInstance;
};
