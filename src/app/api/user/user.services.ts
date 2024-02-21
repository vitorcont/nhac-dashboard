/* eslint-disable no-useless-catch */

import { encryptString, hashPassword } from "@portal/utils/encryption";
import { HttpError } from "@portal/utils/http";
import prismaService from "@prisma/prisma";

const userService = {
  get: async (id: string) => {
    try {
      const user = await prismaService.user.findFirst({
        where: {
          id,
        },
        select: {
          id: true,
          name: true,
          createdAt: true,
          updatedAt: true,
          favorites: true,
        },
      });

      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  update: async (id: string, body: IUser.ICreateUser) => {
    try {
      const user = await prismaService.user.update({
        where: {
          id,
        },
        data: {
          ...body,
          password: undefined,
          email: undefined,
        },
      });

      return user;
    } catch (error) {
      console.error(error);
      throw new HttpError(404, "Error updating user");
    }
  },
  delete: async (id: string) => {
    try {
      const user = await prismaService.user.delete({
        where: {
          id,
        },
      });

      return user;
    } catch (error) {
      console.error(error);
      throw new HttpError(404, "Error deleting user");
    }
  },
  list: async () => {
    try {
      const user = await prismaService.user.findMany({
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          name: true,
          createdAt: true,
          updatedAt: true,
          favorites: true,
        },
      });

      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  create: async (body: IUser.ICreateUser) => {
    try {
      const hashedPassword = await hashPassword(body.password);
      const hashedEmail = await encryptString(body.email);

      const user = await prismaService.user.create({
        data: { ...body, password: hashedPassword, email: hashedEmail },
        select: {
          id: true,
          name: true,
          createdAt: true,
          updatedAt: true,
          favorites: true,
        },
      });

      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

export default userService;
