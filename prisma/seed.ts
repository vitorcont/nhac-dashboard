import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.restaurants.create({
    data: {
      name: "Restaurante Alfredo",
      description: "O melhor da região",
      phone: "19982820088",
      category: "NEW",
      logoUrl:
        "https://marketplace.canva.com/EAFYecj_1Sc/1/0/1600w/canva-cream-and-black-simple-elegant-catering-food-logo-2LPev1tJbrg.jpg",
      backgroundUrl:
        "https://marketplace.canva.com/EAFYecj_1Sc/1/0/1600w/canva-cream-and-black-simple-elegant-catering-food-logo-2LPev1tJbrg.jpg",
      address: {
        create: {
          city: "Campinas",
          neighborhood: "Jardim do Lago",
          number: "123",
          state: "SP",
          street: "Rua das Flores",
          zipcode: "13000000",
          country: "Brasil",
        },
      },
      items: {
        createMany: {
          data: [
            {
              name: "Pizza",
              description: "Pizza de calabresa",
              price: 20.0,
              imageUrl:
                "https://www.receiteria.com.br/wp-content/uploads/receitas-de-pizza-de-calabresa-1-730x449.jpg",
            },
            {
              name: "Cerveja",
              description: "Cerveja gelada",
              price: 5.0,
              imageUrl:
                "https://www.receiteria.com.br/wp-content/uploads/receitas-de-pizza-de-calabresa-1-730x449.jpg",
            },
            {
              name: "Refrigerante",
              description: "Refrigerante gelado",
              price: 5.0,
              imageUrl:
                "https://www.receiteria.com.br/wp-content/uploads/receitas-de-pizza-de-calabresa-1-730x449.jpg",
            },
            {
              name: "Hamburguer",
              description: "Hamburguer de picanha",
              price: 20.0,
              imageUrl:
                "https://www.receiteria.com.br/wp-content/uploads/receitas-de-pizza-de-calabresa-1-730x449.jpg",
            },
            {
              name: "Batata frita",
              description: "Batata frita com cheddar e bacon",
              price: 20.0,
              imageUrl:
                "https://www.receiteria.com.br/wp-content/uploads/receitas-de-pizza-de-calabresa-1-730x449.jpg",
            },
          ],
        },
      },
    },
  });
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
