import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { productVaild } from '../utils/validation';

const prisma = new PrismaClient();

export async function getProductsById(req: Request, res: Response) {
  const { id } = req.params;
  if (id === undefined) {
    res.status(400).json({
      message: 'get products by id error',
    });
    return;
  }

  const result = await prisma.products.findFirst({
    where: {
      id: Number(id),
    },
  });
  res.status(200).json(result);
}

export async function getProducts(req: Request, res: Response) {
  const result = await prisma.products.findMany();
  res.status(200).json(result);
}

export async function createProducts(req: Request, res: Response) {
  if (!productVaild(req.body)) {
    res.status(400).json({
      message: 'create products error',
      body: req.body,
    });
    return;
  }
  const result = await prisma.products.create({
    data: req.body,
  });
  res.status(201).json(result);
}

export async function updateFrequency(req: Request, res: Response) {
  const { id } = req.params;
  if (id === undefined) {
    res.status(400).json({
      message: "can't update frequency products",
    });
  }

  const result = await prisma.products.update({
    where: { id: Number(id) },
    data: { frequency: { increment: 1 } },
  });
  res.status(200).json(result);
}

export async function deleteProduct(req: Request, res: Response) {
  const { id } = req.params;
  if (id === undefined) {
    res.status(400).json({
      message: "can't delete products",
    });
  }
  const result = await prisma.products.delete({
    where: { id: Number(id) },
  });
  res.status(200).json(result);
}
