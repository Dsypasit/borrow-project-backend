import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { labVaild } from '../utils/validation';

const prisma = new PrismaClient();

export async function getRooms(req: Request, res: Response) {
  const rooms = await prisma.room.findMany();
  res.status(200).json(rooms);
}

export async function createRoom(req: Request, res: Response) {
  if (req.body.name === undefined) {
    res.json({
      message: 'create room error',
      body: req.body,
    });
    return;
  }
  const result = await prisma.room.create({
    data: {
      name: req.body.name,
    },
  });
  res.status(201).json(result);
}

export async function deleteRoom(req: Request, res: Response) {
  const { id } = req.params;
  if (id === undefined) {
    res.status(400).json({
      message: "can't delete lab",
    });
  }
  const result = await prisma.room.delete({
    where: { id: Number(id) },
  });
  res.status(200).json(result);
}
