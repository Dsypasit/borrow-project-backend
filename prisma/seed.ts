import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createLab() {
  const labs = ['Lab A', 'Lab B', 'Lab C'];
  for (const lab of labs) {
    await prisma.room.upsert({
      where: {
        name: lab,
      },
      update: {},
      create: {
        name: lab,
      },
    });
  }
}

async function createSource() {
  const sources = ['center', 'department', 'personal'];
  for (const source of sources) {
    await prisma.source.upsert({
      where: {
        name: source,
      },
      update: {},
      create: {
        name: source,
      },
    });
  }
}

async function createProducts() {
  const products = ['Calculator', 'Telescope'];
  for (const product of products) {
    await prisma.product.upsert({
      where: {
        name: product,
      },
      update: {},
      create: {
        name: product,
      },
    });
  }
}

async function main() {
  await createLab();
  await createSource();
  await createProducts();
}
main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
