import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const values = [
    "Gente & Cultura",
    "Marketing",
    "Inovação",
    "Operações",
    "Projetos",
    "Cyber Segurança",
    "SPOC",
    "Comercial",
    "Sales Ops",
    "Infraestrutura",
    "Infraestrutura de Redes",
    "Financeiro",
    "Jurídico",
    "Arquitetura",
    "Ferramentas",
    "Corporativo",
    "ERP",
    "Engenharia",
    "Cloud Public",
  ];

  const objectArray = values.map((value) => ({ name: value }));

  await prisma.areas.createMany({
    data: objectArray,
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
