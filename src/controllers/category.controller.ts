import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export async function getCategory(req: Request, res: Response) {
  const result = await prisma.category.findMany();
  res.json(result);
}
