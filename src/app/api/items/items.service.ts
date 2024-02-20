import { list } from "postcss";

import prismaService from "@prisma/prisma";

const itemsService = {
  create: async (body: IItems.ICreateItem) => {
    try {
      const restaurant = await prismaService.items.create({
        data: body,
      });

      return restaurant;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  get: async (id: string) => {
    try {
      const restaurant = await prismaService.items.findFirst({
        where: {
          id,
        },
      });

      return restaurant;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  update: async (id: string, body: IItems.ICreateItem) => {
    try {
      const restaurant = await prismaService.items.update({
        where: {
          id,
        },
        data: body,
      });

      return restaurant;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  delete: async (id: string) => {
    try {
      const restaurant = await prismaService.items.delete({
        where: {
          id,
        },
      });

      return restaurant;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  list: (search: string | null) => {
    try {
      const restaurant = prismaService.items.findMany({
        orderBy: {
          createdAt: "desc",
        },
        ...(search && {
          where: {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
        }),
      });

      return restaurant;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

export default itemsService;
