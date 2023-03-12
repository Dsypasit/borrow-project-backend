import { Prisma, PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import {
  IsProductItemBorrowing,
  updateProductsAvailable,
  updateProductsFrequency,
} from '../utils/product.util';

const prisma = new PrismaClient();

export async function getTrans(req: Request, res: Response) {
  const { status } = req.query;
  if (status !== undefined && ['true', 'false'].includes(String(status))) {
    console.log(status);
    const result = await prisma.transaction.findMany({
      where: {
        isReturn: status === 'true',
      },
      include: {
        user: true,
        productItem: {
          include: {
            room: true,
            product: true,
            source: true,
          },
        },
      },
    });
    res.json(result);
    return;
  }
  const result = await prisma.transaction.findMany({
    include: {
      user: true,
      productItem: {
        include: {
          room: true,
          product: true,
          source: true,
        },
      },
    },
  });
  res.json(result);
}

export async function getTransById(req: Request, res: Response) {
  const { id } = req.params;
  if (id === undefined) {
    res.json({
      message: 'get transaction by id error',
    });
    return;
  }

  const result = await prisma.transaction.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      user: true,
      productItem: {
        include: {
          room: true,
          product: true,
          source: true,
        },
      },
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

export async function getTransBorrowing(req: Request, res: Response) {
  const result = await prisma.transaction.findMany({
    where: {
      isReturn: false,
    },
    include: {
      user: true,
      productItem: {
        include: {
          room: true,
          product: true,
          source: true,
        },
      },
    },
  });
  res.json(result);
}

export async function createTrans(req: Request, res: Response) {
  try {
    let user = await prisma.user.findFirst({
      where: {
        email: req.body.email,
      },
    });
    if (user === null) {
      user = await prisma.user.create({
        data: {
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
        },
      });
    }

    const isBorrowing = await IsProductItemBorrowing(req.body.serialNumberRef);
    if (isBorrowing) {
      res.status(400).json({
        message: 'this product iteme is borrowing',
      });
      return;
    }
    const result = await prisma.transaction.create({
      data: {
        userId: user.id,
        serialNumberRef: req.body.serialNumberRef,
        location: req.body.location,
        endDate: new Date(req.body.endDate),
        deadline: new Date(req.body.deadline),
      },
      include: {
        user: true,
        productItem: {
          include: {
            room: true,
            product: true,
            source: true,
          },
        },
      },
    });
    await updateProductsAvailable(result.productItem.productId);
    await updateProductsFrequency(result.productItem.productId);
    res.status(201).json(result);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === 'P2002') {
        res.json({
          message: 'Serial number is duplicate, can not create row',
        });
        return;
      }
    }
    res.status(500).json({
      message: e,
    });
  }
}

export async function checkStatus(req: Request, res: Response) {
  const { id } = req.params;
  if (id === undefined) {
    res.status(400).json({
      message: "can't check item",
    });
  }
  const result = await prisma.transaction.findFirst({
    where: {
      id: Number(id),
    },
    select: {
      id: true,
      user: true,
      isReturn: true,
      deadline: true,
      location: true,
    },
  });
  if (result === null) {
    res.status(404).json(`id ${id} not found`);
  }
  res.json(result);
}

export async function updateStatus(req: Request, res: Response) {
  const { id } = req.params;
  if (id === undefined) {
    res.json({
      message: "can't delete item",
    });
  }

  const result = await prisma.transaction.update({
    where: { id: Number(id) },
    data: {
      isReturn: req.body.status,
      endDate: req.body.status ? new Date() : null,
    },
    include: {
      productItem: true,
    },
  });
  await updateProductsAvailable(result.productItem.productId);
  res.json(result);
}

export async function deleteTrans(req: Request, res: Response) {
  const { id } = req.params;
  if (id === undefined) {
    res.json({
      message: "can't delete item",
    });
  }
  const result = await prisma.transaction.delete({
    where: { id: Number(id) },
  });
  res.json(result);
}
