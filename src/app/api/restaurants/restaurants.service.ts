import { HttpError } from "@portal/utils/http";
import prismaService from "@prisma/prisma";

const restaurantsService = {
  create: async (body: IRestaurants.ICreateRestaurants) => {
    try {
      const restaurant = await prismaService.restaurants.create({
        data: {
          ...body,
          address: {
            create: {
              ...body.address,
            },
          },
          items: {
            create: body.items,
          },
        },
      });

      return restaurant;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  get: async (id: string, userId?: string) => {
    try {
      console.log(id, userId, "id, userId");
      const restaurant = await prismaService.restaurants.findFirst({
        where: {
          id,
        },
        include: {
          address: true,
          items: true,
          ...(userId && {
            userFavorites: {
              where: {
                userId,
                deletedAt: null,
              },
            },
          }),
        },
      });

      return restaurant;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  update: async (id: string, body: IRestaurants.ICreateRestaurants) => {
    try {
      const restaurant = await prismaService.restaurants.update({
        where: {
          id,
        },
        data: {
          ...body,
          address: {
            update: {
              ...body.address,
            },
          },
          items: undefined,
        },
        include: {
          address: true,
          items: true,
        },
      });

      return restaurant;
    } catch (error) {
      throw new HttpError(404, "Error updating restaurant");
    }
  },
  delete: async (id: string) => {
    try {
      const restaurant = await prismaService.restaurants.delete({
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
  list: (search?: string | null, userId?: string) => {
    try {
      const restaurant = prismaService.restaurants.findMany({
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
        ...(userId && {
          include: {
            userFavorites: {
              where: {
                userId,
              },
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
  listFavorites: (userId: string) => {
    try {
      const restaurant = prismaService.restaurants.findMany({
        where: {
          userFavorites: {
            some: {
              userId,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          userFavorites: true,
        },
      });

      return restaurant;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

export default restaurantsService;
