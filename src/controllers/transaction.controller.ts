import { Prisma, PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import {
  IsProductItemBorrowed,
  updateProductAvailableAmount,
  updateProductUsageFrequency,
} from '../utils/product.util';

const prisma = new PrismaClient();

export async function getTransactions(req: Request, res: Response) {
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
    res.status(200).json(result);
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
  res.status(200).json(result);
}

export async function getTransactionById(req: Request, res: Response) {
  const { id } = req.params;
  if (id === undefined) {
    res.status(400).json({
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
  res.status(200).json(result);
}

export async function getTransactionBorrowed(req: Request, res: Response) {
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
  res.status(200).json(result);
}

export async function createTransaction(req: Request, res: Response) {
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

    const isBorrowing = await IsProductItemBorrowed(req.body.serialNumberRef);
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
    await updateProductAvailableAmount(result.productItem.productId);
    await updateProductUsageFrequency(result.productItem.productId);
    res.status(201).json(result);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === 'P2002') {
        res.status(400).json({
          message: 'serial_no is duplicate, cannot create row',
        });
        return;
      }
    }
    res.status(500).json({
      message: e,
    });
  }
}

export async function checkReturnStatus(req: Request, res: Response) {
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
  res.status(200).json(result);
}

export async function updateReturnStatus(req: Request, res: Response) {
  const { id } = req.params;
  if (id === undefined) {
    res.status(400).json({
      message: "can't delete item",
    });
  }

  const result = await prisma.transaction.update({
    where: { id: Number(id) },
    data: {
      isReturn: req.body.isReturn,
      endDate: req.body.isReturn ? new Date() : null,
    },
    include: {
      productItem: true,
    },
  });
<<<<<<< HEAD
  await updateProductAvailableAmount(result.productItem.productId);
  res.json(result);
=======
  await updateProductsAvailable(result.productItem.productId);
  res.status(200).json(result);
>>>>>>> db67ae9c3ccb6c9061601bf3809ece1b14b279ed
}

export async function deleteTransaction(req: Request, res: Response) {
  const { id } = req.params;
  if (id === undefined) {
    res.status(400).json({
      message: "can't delete item",
    });
  }
  const result = await prisma.transaction.delete({
    where: { id: Number(id) },
  });
  res.status(200).json(result);
}
