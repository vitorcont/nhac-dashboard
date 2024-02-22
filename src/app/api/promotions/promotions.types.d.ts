export as namespace IPromotions;

export interface ICreatePromotion {
  title: string;
  description: string;
  imageUrl: string;
  restaurantId: string;
}

export interface IPromotion extends ICreatePromotion {
  id: string;
  createdAt?: string | Date | null;
  updatedAt?: string | Date | null;
  deletedAt?: string | Date | null;
}
