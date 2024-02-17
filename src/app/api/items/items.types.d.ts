import { $Enums } from "@prisma/client";
export as namespace IItems;

export interface ICreateItem {
  name: string;
  description?: string;
  price: number;
  restaurantId: string;
  imageUrl?: string;
}

export interface IItem extends ICreateItem {
  id: string;
  createdAt?: string | Date | null;
  updatedAt?: string | Date | null;
  deletedAt?: string | Date | null;
}
