import Axios, { AxiosError, AxiosResponse } from "axios";

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
  axiosInstance.interceptors.request.use((request) => {
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }

    return request;
  });
  return axiosInstance;
};
