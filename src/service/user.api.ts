import { getApiInstance } from "@portal/utils/axios";

export const userApi = {
  getById: async (id: string) => {
    const intance = getApiInstance();
    const { data } = await intance.get(`/api/user/${id}`);

    return data;
  },
  getMe: async (token?: string) => {
    const intance = getApiInstance(token);
    const { data } = await intance.get(`/api/user/me`);

    return data;
  },
  register: async (userData: IUser.ICreateUser) => {
    const intance = getApiInstance();
    const { data } = await intance.post(`/api/user`, userData);

    return data;
  },
  update: async (userId: string, userData: IUser.IUpdateUser) => {
    const intance = getApiInstance();
    const { data } = await intance.put(`/api/user/${userId}`, userData);

    return data;
  },
};
