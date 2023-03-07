import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function updateProductsTotal(id: number){
  const total_item = await prisma.productItems.count({
    where: {
      products: {
        id: id
      },
    }
  })

  await prisma.products.update({
    where: {
      id: id
    },
    data: {
      total: total_item,
    }
  })
}

export async function updateProductsAvailable(id: number){
  const available_item = await prisma.productItems.count({
    where: {
      products: {
        id: id
      },
      transactions: {
        every: {
          status: true
        }
      }
    }
  })

  await prisma.products.update({
    where: {
      id: id
    },
    data: {
      available: available_item,
    }
  })
}
