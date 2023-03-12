import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function updateProductsTotal(id: any) {
  const totalItem = await prisma.productItem.count({
    where: {
      product: {
        id: id,
      },
    },
  });

  await prisma.product.update({
    where: {
      id: id,
    },
    data: {
      totalAmount: totalItem,
    },
  });
}

export async function updateProductsAvailable(id: any) {
  const availableItem = await prisma.productItem.count({
    where: {
      product: {
        id: id,
      },
      transactions: {
        every: {
          isReturn: true,
        },
      },
    },
  });

  await prisma.product.update({
    where: {
      id: id,
    },
    data: {
      availableAmount: availableItem,
    },
  });
}

export async function updateProductsFrequency(id: any) {
  await prisma.product.update({
    where: {
      id: id,
    },
    data: {
      usageFrequency: {
        increment: 1,
      },
    },
  });
}

export async function IsProductItemBorrowing(serial: string): Promise<boolean> {
  const result = await prisma.productItem.findFirst({
    where: {
      serialNumber: String(serial),
      transactions: {
        some: {
          isReturn: false,
        },
      },
    },
  });
  return result !== null;
}
