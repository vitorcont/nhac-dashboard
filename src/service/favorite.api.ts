import { getApiInstance } from "@portal/utils/axios";

export const favoriteApi = {
  add: async (restaurantId: string) => {
    const intance = getApiInstance();
    const { data } = await intance.post(`/api/favorites`, { restaurantId });

    return data;
  },
  delete: async (id: string) => {
    const intance = getApiInstance();
    const response = await intance.delete(`/api/favorites/${id}`);

    return response;
  },
};
