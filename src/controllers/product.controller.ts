import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export async function getProductById(req: Request, res: Response) {
  const { id } = req.params;
  if (id === undefined) {
    res.json({
      message: 'get products by id error',
    });
    return;
  }

  const result = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
  });
  res.json(result);
}

export async function getProducts(req: Request, res: Response) {
  const result = await prisma.product.findMany();
  res.json(result);
}

export async function createProducts(req: Request, res: Response) {
  if (req.body.name === undefined) {
    res.json({
      message: 'create labs error',
      body: req.body,
    });
    return;
  }
  const result = await prisma.product.create({
    data: req.body,
  });
  res.json(result);
}

export async function updateFrequency(req: Request, res: Response) {
  const { id } = req.params;
  if (id === undefined) {
    res.json({
      message: "can't update frequency products",
    });
  }

  const result = await prisma.product.update({
    where: { id: Number(id) },
    data: { usageFrequency: { increment: 1 } },
  });
  res.json(result);
}

export async function deleteProduct(req: Request, res: Response) {
  const { id } = req.params;
  if (id === undefined) {
    res.json({
      message: "can't delete products",
    });
  }
  const result = await prisma.product.delete({
    where: { id: Number(id) },
  });
  res.json(result);
}
