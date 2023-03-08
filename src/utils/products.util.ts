import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function updateProductsTotal(id: number) {
  const totalItem = await prisma.productItems.count({
    where: {
      products: {
        id: id,
      },
    },
  });

  await prisma.products.update({
    where: {
      id: id,
    },
    data: {
      total: totalItem,
    },
  });
}

export async function updateProductsAvailable(id: number) {
  const availableItem = await prisma.productItems.count({
    where: {
      products: {
        id: id,
      },
      transactions: {
        every: {
          status: true,
        },
      },
    },
  });

  await prisma.products.update({
    where: {
      id: id,
    },
    data: {
      available: availableItem,
    },
  });
}

export async function updateProductsFrequency(id: number) {
  await prisma.products.update({
    where: {
      id: id,
    },
    data: {
      frequency: {
        increment: 1,
      },
    },
  });
}

export async function IsProductItemBorrowing(serial: string): Promise<boolean> {
  const result = await prisma.productItems.findFirst({
    where: {
      serial_no: String(serial),
      transactions: {
        some: {
          status: false,
        },
      },
    },
  });
  return result !== null;
}
