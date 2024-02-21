import prismaService from "@prisma/prisma";

const favoritesService = {
  create: async (body: IFavorite.ICreateFavorite) => {
    try {
      const favorite = await prismaService.userFavorites.create({
        data: {
          restaurantId: body.restaurantId,
          userId: body.userId!,
        },
      });

      return favorite;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  delete: async (id: string) => {
    try {
      const restaurant = await prismaService.userFavorites.delete({
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
  list: (userId?: string) => {
    try {
      const favorites = prismaService.userFavorites.findMany({
        orderBy: {
          createdAt: "desc",
        },
        ...(userId && {
          where: {
            userId,
          },
        }),
      });

      return favorites;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

export default favoritesService;
