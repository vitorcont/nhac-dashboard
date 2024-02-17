import { PrismaClient, PrismaPromise } from "@prisma/client";

const prismaClient = new PrismaClient();

async function disconnectPrisma(prismaDisconect: PrismaClient) {
  await prismaDisconect.$disconnect();
}

function filterForActive(args: any) {
  const where = args.where ?? {};
  return {
    ...args,
    where: { ...where, deletedAt: null },
  };
}

async function updateTimestamp(args: any) {
  const data = args.data ?? {};
  return {
    ...args,
    data: { ...data, updatedAt: new Date() },
  };
}

async function softDelete(args: any) {
  const data = args.data ?? {};

  return {
    ...args,
    data: { ...data, deletedAt: new Date() },
  };
}

const prismaMiddleware = async ({
  operation,
  args,
  query,
}: {
  model?: string | undefined;
  operation: string;
  args: any;
  query: (args: any) => PrismaPromise<any>;
}) => {
  try {
    if (
      operation === "findUnique" ||
      operation === "findFirst" ||
      operation === "findMany" ||
      operation === "count"
    ) {
      args = filterForActive(args);

      const data = await query(args);
      return data;
    }

    if (operation === "update" || operation === "updateMany") {
      args = await updateTimestamp(args);
    }

    if (operation === "delete" || operation === "deleteMany") {
      args = await softDelete(args);
    }

    return query(args);
  } catch (error) {
    console.log(error);
    throw new Error(error as any);
  }
};

export const prismaService = prismaClient.$extends({
  query: {
    $allOperations: prismaMiddleware,
    $allModels: {
      async delete({ model, args }) {
        return (prismaClient as any)[model].update({
          ...args,
          data: {
            deletedAt: new Date(),
          },
        });
      },
      async deleteMany({ model, args }) {
        return (prismaClient as any)[model].updateMany({
          ...args,
          data: {
            deletedAt: new Date(),
          },
        });
      },
    },
  },
});

export default prismaService;
