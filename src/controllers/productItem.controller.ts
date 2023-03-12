import { Prisma, PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import {
  updateProductsAvailable,
  updateProductsTotal,
} from '../utils/product.util';

const prisma = new PrismaClient();

export async function getItems(req: Request, res: Response) {
  const result = await prisma.productItem.findMany({
    include: {
      transactions: {
        where: {
          isReturn: false,
        },
      },
      room: true,
      source: true,
      product: true,
    },
  });
  res.json(result);
}

export async function getItemById(req: Request, res: Response) {
  const { id } = req.params;
  if (id === undefined) {
    res.json({
      message: 'get item by id error',
    });
    return;
  }

  const result = await prisma.productItem.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      transactions: {
        where: {
          isReturn: false,
        },
      },
      room: true,
      source: true,
      product: true,
    },
  });
  if (result === null) {
    res.status(404).json({
      message: `${id} not found`,
    });
    return;
  }
  res.json(result);
}
export async function getItemByProduct(req: Request, res: Response) {
  const { id } = req.params;
  if (id === undefined) {
    res.json({
      message: 'get item by id error',
    });
    return;
  }

  const result = await prisma.productItem.findMany({
    where: {
      product: {
        id: Number(id),
      },
    },
    include: {
      transactions: {
        where: {
          isReturn: false,
        },
      },
      room: true,
      source: true,
      product: true,
    },
  });
  if (result === null) {
    res.status(404).json({
      message: `${id} not found`,
    });
    return;
  }
  res.json(result);
}

export async function getItemByProductAvailable(req: Request, res: Response) {
  const { id } = req.params;
  if (id === undefined) {
    res.json({
      message: 'get item by id error',
    });
    return;
  }

  const result = await prisma.productItem.findMany({
    where: {
      product: {
        id: Number(id),
      },
      transactions: {
        every: {
          isReturn: true,
        },
      },
    },
    include: {
      transactions: true,
      room: true,
      source: true,
      product: true,
    },
  });
  if (result === null) {
    res.status(404).json({
      message: `${id} not found`,
    });
    return;
  }
  res.json(result);
}

export async function createItem(req: Request, res: Response) {
  try {
    const result = await prisma.productItem.create({
      data: {
        serialNumber: req.body.serialNumber,
        sourceId: req.body.sourceId,
        roomId: req.body.roomId,
        productId: req.body.productId,
      },
      include: {
        transactions: true,
        room: true,
        source: true,
        product: true,
      },
    });
    await updateProductsAvailable(req.body.productId);
    await updateProductsTotal(req.body.productId);
    res.status(201).json(result);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === 'P2002') {
        res.json({
          message: 'Serial number is duplicate, can not create row',
        });
      }
    }
  }
}

export async function deleteItem(req: Request, res: Response) {
  const { id } = req.params;
  if (id === undefined) {
    res.json({
      message: "can't delete item",
    });
  }
  const result = await prisma.productItem.delete({
    where: { id: Number(id) },
  });
  await updateProductsTotal(result.productId);
  res.json(result);
}
