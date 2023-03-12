import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export async function getUsers(req: Request, res: Response) {
  if (req.query.email) {
    const result = await prisma.user.findMany({
      where: {
        email: String(req.query.email),
      },
      include: {
        transactions: true,
      },
    });

    if (result) {
      res.json(result);
    } else {
      res.json({ message: `${req.query.email} not found` });
    }
    return;
  }
  const labs = await prisma.user.findMany({
    include: {
      transactions: true,
    },
  });
  res.json(labs);
}

export async function getUserById(req: Request, res: Response) {
  const { id } = req.params;
  if (id === undefined) {
    res.json({
      message: "can't delete lab",
    });
  }

  const result = await prisma.user.findFirst({
    where: { id: Number(id) },
    include: {
      transactions: true,
    },
  });
  res.json(result);
}

export async function getUsersNotReturn(req: Request, res: Response) {
  const result = await prisma.user.findMany({
    where: {
      transactions: {
        some: {
          isReturn: {
            equals: false,
          },
        },
      },
    },
    include: {
      transactions: {
        where: {
          isReturn: false,
        },
      },
    },
  });
  res.json(result);
}

export async function getUserNotReturnById(req: Request, res: Response) {
  const { id } = req.params;
  if (id === undefined) {
    res.json({
      message: "can't delete lab",
    });
  }

  const result = await prisma.user.findFirst({
    where: {
      id: Number(id),
      transactions: {
        some: {
          isReturn: {
            equals: false,
          },
        },
      },
    },
    include: {
      transactions: {
        where: {
          isReturn: false,
        },
      },
    },
  });
  res.json(result);
}
