import sharp from 'sharp';
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { productVaild } from '../utils/validation';

const prisma = new PrismaClient();

export async function getProductById(req: Request, res: Response) {
  const { id } = req.params;
  if (id === undefined) {
    res.status(400).json({
      message: 'get products by id error',
    });
    return;
  }

  const result = await prisma.product.findFirst({
    where: {
      id: id,
    },
  });
  res.status(200).json(result);
}

export async function getProducts(req: Request, res: Response) {
  const result = await prisma.product.findMany();
  res.json(result);
}

export async function createProduct(req: Request, res: Response) {
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
  res.status(201).json(result);
}

export async function updateUsageFrequency(req: Request, res: Response) {
  const { id } = req.params;
  if (id === undefined) {
    res.status(400).json({
      message: "can't update frequency products",
    });
  }

  const result = await prisma.product.update({
    where: { id: id },
    data: { usageFrequency: { increment: 1 } },
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
  const result = await prisma.product.delete({
    where: { id: id },
  });
  res.status(200).json(result);
}

export async function uploadProductImage(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const buffer = await sharp(req.file?.buffer)
      .resize({
        width: 500,
        height: 500,
      })
      .png()
      .toBuffer();

    const result = await prisma.product.update({
      where: {
        id: id,
      },
      data: {
        image: <string>buffer.toString('hex'),
      },
    });

    res.status(200).json(result);
  } catch (e: any) {
    res.status(400).send({ error: e.message });
  }
}

export async function addCategory(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const product = await prisma.product.update({
      where: {
        id: id,
      },
      data: {
        category: {
          connectOrCreate: {
            where: {
              title: req.body.title,
            },
            create: {
              title: req.body.title,
            },
          },
        },
      },
    });

    res.status(200).json(product);
  } catch (e: any) {
    res.status(400).send({ error: e.message });
  }
}
