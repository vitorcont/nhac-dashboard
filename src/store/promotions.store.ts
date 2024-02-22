interface IPromotionsStore {
  promotionsList: IPromotions.IPromotion[];
}

import { create } from "zustand";

interface IPromotionsAction {
  setPromotionsList: (value: IPromotions.IPromotion[]) => void;
  reset: () => void;
}

const initialState: IPromotionsStore = {
  promotionsList: [],
};

const usePromotionsStore = create<IPromotionsAction & IPromotionsStore>((set) => ({
  ...initialState,
  setPromotionsList: (promotionsList: IPromotions.IPromotion[]) => set({ promotionsList }),
  reset: () => set(initialState),
}));

export default usePromotionsStore;
