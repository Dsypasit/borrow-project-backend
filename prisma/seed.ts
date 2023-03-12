import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createLab() {
  await prisma.room.createMany({
    data: [{ name: 'lab1' }, { name: 'lab2' }, { name: 'lab3' }],
    skipDuplicates: true,
  });
}

async function createSource() {
  await prisma.source.createMany({
    data: [{ name: 'center' }, { name: 'department' }, { name: 'personal' }],
    skipDuplicates: true,
  });
}
async function createProducts() {
  await prisma.product.createMany({
    data: [{ name: 'Calculator' }, { name: 'Telescope' }],
    skipDuplicates: true,
  });
}

async function main() {
  await createLab();
  await createSource();
  await createProducts();
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
