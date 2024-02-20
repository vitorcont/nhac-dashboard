import { getApiInstance } from "@portal/utils/axios";

export const authApi = {
  login: async (userData: IAuth.IAuthenticate) => {
    const intance = getApiInstance();
    const { data } = await intance.post(`/api/auth`, userData);

    return data;
  },
};
