import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createRoom() {
  await prisma.room.createMany({
    data: [{ name: 'room1' }, { name: 'room2' }, { name: 'room3' }],
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
  await createRoom();
  await createSource();
  await createProducts();
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
