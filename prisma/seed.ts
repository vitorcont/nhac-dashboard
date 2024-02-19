import { PrismaClient } from "@prisma/client";

import { restaurantsSeed } from "./seed.data";
const prisma = new PrismaClient();

async function main() {
  const requests = Promise.all(
    restaurantsSeed.map(
      async (restaurant: any) =>
        await prisma.restaurants.create({
          data: {
            ...restaurant,
            address: { create: restaurant.address },
            items: {
              createMany: {
                data: restaurant.items,
              },
            },
          },
        })
    )
  );
  await requests;
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
