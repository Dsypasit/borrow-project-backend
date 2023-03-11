import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { labVaild } from '../utils/validation';

const prisma = new PrismaClient();

export async function getLabs(req: Request, res: Response) {
  const labs = await prisma.lab.findMany();
  res.status(200).json(labs);
}

export async function createLab(req: Request, res: Response) {
  if (!labVaild(req.body)) {
    res.status(400).json({
      message: 'create labs error',
      body: req.body,
    });
    return;
  }
  const result = await prisma.lab.create({
    data: {
      name: req.body.name,
    },
  });
  res.status(201).json(result);
}

export async function deleteLab(req: Request, res: Response) {
  const { id } = req.params;
  if (id === undefined) {
    res.status(400).json({
      message: "can't delete lab",
    });
  }
  const result = await prisma.lab.delete({
    where: { id: Number(id) },
  });
  res.status(200).json(result);
}
