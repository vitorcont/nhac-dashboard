import { $Enums } from "@prisma/client";
export as namespace IUser;

export interface ICreateUser {
  email: string;
  name: string;
  password: string;
}

export interface IUser extends ICreateUser {
  id: string;
  createdAt?: string | Date | null;
  updatedAt?: string | Date | null;
  deletedAt?: string | Date | null;
}
