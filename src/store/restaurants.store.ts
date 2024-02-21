interface IRestaurantsStore {
  restaurantList: IRestaurants.IRestaurant[];
  restaurantDetails: IRestaurants.IRestaurant | null;
  restaurantLoading: boolean;
  restaurantFilteredList: IRestaurants.IRestaurant[];
  restaurantsFavorites: IRestaurants.IRestaurant[];
}

import { create } from "zustand";

interface IRestaurantsAction {
  setRestaurantList: (restaurantList: IRestaurants.IRestaurant[]) => void;
  setRestaurantFavorites: (restaurantFilteredList: IRestaurants.IRestaurant[]) => void;
  setRestaurantFilteredList: (restaurantList: IRestaurants.IRestaurant[]) => void;
  setRestaurantDetails: (restaurantDetails: IRestaurants.IRestaurant) => void;
  reset: () => void;
}

const initialState: IRestaurantsStore = {
  restaurantDetails: null,
  restaurantList: [],
  restaurantsFavorites: [],
  restaurantFilteredList: [],
  restaurantLoading: false,
};

const useRestaurantsStore = create<IRestaurantsAction & IRestaurantsStore>((set) => ({
  ...initialState,
  setRestaurantFilteredList: (restaurantFilteredList: IRestaurants.IRestaurant[]) =>
    set({ restaurantFilteredList }),
  setRestaurantList: (restaurantList: IRestaurants.IRestaurant[]) => set({ restaurantList }),
  setRestaurantDetails: (restaurantDetails: IRestaurants.IRestaurant) => set({ restaurantDetails }),
  setRestaurantFavorites: (restaurantsFavorites: IRestaurants.IRestaurant[]) =>
    set({ restaurantsFavorites }),
  reset: () => set(initialState),
}));

export default useRestaurantsStore;
