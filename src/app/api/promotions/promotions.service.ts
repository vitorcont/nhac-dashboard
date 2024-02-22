import { HttpError } from "@portal/utils/http";
import prismaService from "@prisma/prisma";

const promotionsService = {
  create: async (body: IPromotions.ICreatePromotion) => {
    try {
      const promotion = await prismaService.promotion.create({
        data: body,
      });

      return promotion;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  get: async (id: string) => {
    try {
      const promotion = await prismaService.promotion.findFirst({
        where: {
          id,
        },
      });

      return promotion;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  update: async (id: string, body: IPromotions.ICreatePromotion) => {
    try {
      const promotion = await prismaService.promotion.update({
        where: {
          id,
        },
        data: body,
      });

      return promotion;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  delete: async (id: string) => {
    try {
      const promotion = await prismaService.promotion.delete({
        where: {
          id,
        },
      });

      return promotion;
    } catch (error) {
      console.error(error);
      throw new HttpError(404, "Promotion not found");
    }
  },
  list: () => {
    try {
      const promotion = prismaService.promotion.findMany({
        orderBy: {
          createdAt: "desc",
        },
        take: 2,
      });

      return promotion;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

export default promotionsService;
