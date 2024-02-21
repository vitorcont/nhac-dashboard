import { getApiInstance } from "@portal/utils/axios";

export const restaurantsApi = {
  list: async (search?: string) => {
    const intance = getApiInstance();
    const { data } = await intance.get("/api/restaurants", { params: { search } });

    return data;
  },
  listFavorites: async () => {
    const intance = getApiInstance();
    const { data } = await intance.get("/api/restaurants/favorites");

    return data;
  },
  getById: async (id: string) => {
    const intance = getApiInstance();
    const { data } = await intance.get(`/api/restaurants/${id}`);

    return data;
  },
};
