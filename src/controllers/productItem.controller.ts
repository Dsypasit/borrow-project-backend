import { Prisma, PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import {
  updateProductAvailableAmount,
  updateProductTotalAmount,
} from '../utils/product.util';
import { queryProductItem } from '../utils/productItem.util';

const prisma = new PrismaClient();

export async function getItems(req: Request, res: Response) {
  const query = queryProductItem(req.query);
  if (Object.keys(query).length !== 0) {
    console.log(query);
    const result = await prisma.productItem.findMany({
      where: query,
      include: {
        transactions: true,
        room: true,
        source: true,
        product: true,
      },
    });
    res.status(200).json(result);
    return;
  }
  const result = await prisma.productItem.findMany({
    include: {
      transactions: true,
      room: true,
      source: true,
      product: true,
    },
  });
  res.status(200).json(result);
}

export async function getItemById(req: Request, res: Response) {
  const { id } = req.params;
  if (id === undefined) {
    res.status(400).json({
      message: 'get item by id error',
    });
    return;
  }

  const result = await prisma.productItem.findFirst({
    where: {
      id,
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
  res.status(200).json(result);
}
export async function getItemByProduct(req: Request, res: Response) {
  const { id } = req.params;
  if (id === undefined) {
    res.status(400).json({
      message: 'get item by id error',
    });
    return;
  }

  const result = await prisma.productItem.findMany({
    where: {
      product: {
        id,
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
  res.status(200).json(result);
}

export async function getItemByProductAvailable(req: Request, res: Response) {
  const { id } = req.params;
  if (id === undefined) {
    res.status(400).json({
      message: 'get item by id error',
    });
    return;
  }

  const result = await prisma.productItem.findMany({
    where: {
      product: {
        id,
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
  res.status(200).json(result);
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
    await updateProductAvailableAmount(req.body.productId);
    await updateProductTotalAmount(req.body.productId);
    res.status(201).json(result);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === 'P2002') {
        res.status(400).json({
          message: 'serial_no is duplicate, cannot create row',
        });
      }
    }
  }
}

export async function deleteItem(req: Request, res: Response) {
  const { id } = req.params;
  if (id === undefined) {
    res.status(400).json({
      message: "can't delete item",
    });
  }
  const result = await prisma.productItem.delete({
    where: { id },
  });
  await updateProductTotalAmount(result.productId);
  res.status(200).json(result);
}
