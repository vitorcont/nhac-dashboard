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
  register: async (data: IUser.ICreateUser) => {
    const intance = getApiInstance();
    const response = await intance.post(`/api/user`, data);

    return response;
  },
};
