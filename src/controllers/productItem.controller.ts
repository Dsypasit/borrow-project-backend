import { Prisma, PrismaClient } from '@prisma/client'
import { Request, Response } from 'express';
import { updateProductsAvailable, updateProductsTotal } from '../utils/products.util'

const prisma = new PrismaClient()

export async function getItems(req: Request , res: Response) {
  const result = await prisma.productItems.findMany({
    include: {
      transactions: {
        where: {
          status: false
        }
      },
      lab: true,
      source: true,
      products: true,
    }
  }) 
  res.json(result)
}

export async function getItemById(req: Request , res: Response) {
  const { id } = req.params
  if (id === undefined){
    res.json({
      message: "get item by id error",
    })
    return
  }

  const result = await prisma.productItems.findFirst({
    where: {
      id: Number(id)
    },
    include: {
      transactions: {
        where: {
          status: false
        }
      },
      lab: true,
      source: true,
      products: true,
    }
  }) 
  if (result === null){
    res.status(404).json({
      message: `${id} not found`
    })
    return
  }
  res.json(result)
}
export async function getItemByProduct(req: Request , res: Response) {
  const { id } = req.params
  if (id === undefined){
    res.json({
      message: "get item by id error",
    })
    return
  }

  const result = await prisma.productItems.findMany({
    where: {
      products: {
        id: Number(id)
      }
    },
    include: {
      transactions: {
        where: {
          status: false
        }
      },
      lab: true,
      source: true,
      products: true,
    }
  }) 
  if (result === null){
    res.status(404).json({
      message: `${id} not found`
    })
    return
  }
  res.json(result)
}

export async function getItemByProductAvailable(req: Request , res: Response) {
  const { id } = req.params
  if (id === undefined){
    res.json({
      message: "get item by id error",
    })
    return
  }

  const result = await prisma.productItems.findMany({
    where: {
      products: {
        id: Number(id)
      },
      transactions: {
        every: {
          status: true
        }
      }
    },
    include: {
      transactions: true,
      lab: true,
      source: true,
      products: true,
    }
  }) 
  if (result === null){
    res.status(404).json({
      message: `${id} not found`
    })
    return
  }
  res.json(result)
}

export async function createItem(req: Request, res: Response){
  try{
    const result = await prisma.productItems.create({
      data: {
        serial_no: req.body.serial_no,
        source_id: req.body.source_id,
        lab_id: req.body.lab_id,
        products_id: req.body.products_id
      },
      include: {
        transactions: true,
        lab: true,
        source: true,
        products: true,
      }
    })
    await updateProductsAvailable(req.body.products_id)
    await updateProductsTotal(req.body.products_id)
    res.status(201).json(result)
  }catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === 'P2002') {
        res.json({
          message: "serial_no is duplicate, cannot create row"
        })
      }
    }
  }
}

export async function deleteItem(req: Request, res: Response){
  const { id } = req.params
  if (id === undefined){
    res.json({
      message: "can't delete item",
    })
  }
  const result = await prisma.productItems.delete({
    where: { id: Number(id) },
  })
  await updateProductsTotal(result.products_id)
  res.json(result)
}
