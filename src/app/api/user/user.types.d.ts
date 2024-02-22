export as namespace IUser;

export interface ICreateUser {
  email: string;
  name: string;
  password: string;
}

export interface IUpdateUser {
  name: string;
}

export interface IUser extends ICreateUser {
  id: string;
  createdAt?: string | Date | null;
  updatedAt?: string | Date | null;
  deletedAt?: string | Date | null;
}
