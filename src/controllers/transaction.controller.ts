import { Prisma, PrismaClient } from '@prisma/client'
import { Request, Response } from 'express';

const prisma = new PrismaClient()

export async function getTrans(req: Request , res: Response) {
  const result = await prisma.transactions.findMany({
    include: {
      user: true,
      productItems: {
        include: {
          lab: true,
          products: true,
          source: true
        }
      }
    }
  }) 
  res.json(result)
}

export async function getTransById(req: Request , res: Response) {
  const { id } = req.params
  if (id === undefined){
    res.json({
      message: "get transaction by id error",
    })
    return
  }

  const result = await prisma.transactions.findFirst({
    where: {
      id: Number(id)
    },
    include: {
      user: true,
      productItems: {
        include: {
          lab: true,
          products: true,
          source: true
        }
      }
    }
  }) 
  if (result === null){
    res.status(404).json({
      message: `${id} not found`
    })
    return
  }
  res.json(result)
}

export async function createTrans(req: Request, res: Response){
  try{
    let user = await prisma.user.findFirst({
      where: {
        email: req.body.email
      }
    })
    if (user === null){
      user = await prisma.user.create({
        data: {
          email: req.body.email,
          phone: req.body.phone
        }
      })
    }
    const result = await prisma.transactions.create({
      data: {
        user_id: user.id,
        productItems_id: req.body.product_item_id,
        location: req.body.location,
        end_date: new Date(req.body.end_date),
        deadline: new Date(req.body.deadline)
      },
      include: {
        user: true,
        productItems: {
          include: {
            lab: true,
            products: true,
            source: true
          }
        }
      }
    })
    res.status(201).json(result)
  }catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === 'P2002') {
        res.json({
          message: "serial_no is duplicate, cannot create row"
        })
        return
      }
    }
    res.status(500).json({
      message: e
    })
  }
}

export async function checkStatus(req: Request, res: Response){
  const { id } = req.params
  if (id === undefined){
    res.status(400).json({
      message: "can't check item",
    })
  }
  const result = await prisma.transactions.findFirst({
    where: {
      id: Number(id)
    },
    select: {
      id: true,
      user: true,
      status: true,
      deadline: true,
      location: true,
    }
  })
  if (result === null){
    res.status(404).json(`id ${id} not found`)
  }
  res.json(result)
}

export async function updateStatus(req: Request, res: Response){
  const { id } = req.params
  if (id === undefined){
    res.json({
      message: "can't delete item",
    })
  }

  const result = await prisma.transactions.update({
    where: { id: Number(id) },
    data: {
      status: req.body.status,
      end_date: req.body.status ? new Date() : null!
    }
  })
  res.json(result) 
}

export async function deleteTrans(req: Request, res: Response){
  const { id } = req.params
  if (id === undefined){
    res.json({
      message: "can't delete item",
    })
  }
  const result = await prisma.transactions.delete({
    where: { id: Number(id) },
  })
  res.json(result)
}
