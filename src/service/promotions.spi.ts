import { getApiInstance } from "@portal/utils/axios";

export const promotionsApi = {
  list: async () => {
    const intance = getApiInstance();
    const { data } = await intance.get(`/api/promotions`);

    return data;
  },
};
