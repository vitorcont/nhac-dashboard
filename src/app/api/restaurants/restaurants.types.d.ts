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
  address: ICreateAddress;
}

export interface IRestaurant extends Omit<"address", ICreateRestaurants> {
  id: string;
  createdAt?: string | Date | null;
  updatedAt?: string | Date | null;
  deletedAt?: string | Date | null;
  address: IAddress;
}
