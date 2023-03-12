import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { sourceVaild } from '../utils/validation';

const prisma = new PrismaClient();

export async function getSources(req: Request, res: Response) {
  const source = await prisma.source.findMany();
  res.status(200).json(source);
}

export async function createSource(req: Request, res: Response) {
  if (!sourceVaild(req.body)) {
    res.status(400).json({
      message: 'create source error',
      body: req.body,
    });
    return;
  }
  const result = await prisma.source.create({
    data: {
      name: req.body.name,
    },
  });
  res.status(201).json(result);
}

export async function deleteSource(req: Request, res: Response) {
  const { id } = req.params;
  if (id === undefined) {
    res.status(400).json({
      message: "can't delete Source",
    });
  }
  const result = await prisma.source.delete({
    where: { id },
  });
  res.status(200).json(result);
}
