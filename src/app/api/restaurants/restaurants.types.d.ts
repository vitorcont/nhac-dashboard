import { $Enums } from "@prisma/client";

export as namespace IRestaurants;

export interface ICreateAddress {
  street: string;
  number: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  complement?: string;
  neighborhood: string;
}

export interface IAddress extends ICreateAddress {
  id: string;
  createdAt?: string | Date | null;
  updatedAt?: string | Date | null;
  deletedAt?: string | Date | null;
}

export interface ICreateRestaurants {
  name: string;
  description?: string;
  phone?: string;
  logoUrl?: string;
  backgroundUrl?: string;
  category: $Enums.Category;
  address: ICreateAddress;
  items: IItems.ICreateItem[];
}

export interface IRestaurant extends Omit<ICreateRestaurants, ["address", "items"]> {
  id: string;
  createdAt?: string | Date | null;
  updatedAt?: string | Date | null;
  deletedAt?: string | Date | null;
  address: IAddress;
  items: IItems.IItem[];
  userFavorites?: IUserFavorite[];
}

export interface IUserFavorite {
  userId: string;
  restaurantId: string;
  id: string;
  createdAt?: string | Date | null;
  updatedAt?: string | Date | null;
  deletedAt?: string | Date | null;
}
