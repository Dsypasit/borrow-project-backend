import { PrismaClient, Prisma } from '@prisma/client';
import fs from 'fs';
import bcrypt from 'bcrypt';
import {
  updateProductAvailableAmount,
  updateProductTotalAmount,
} from '../src/utils/product.util';

const prisma = new PrismaClient();

async function createOneAdmin() {
  let password = '123456';
  password = await bcrypt.hash(password, 10);
  await prisma.admin.create({
    data: {
      name: 'Paopao',
      role: 'Admin',
      email: 'admin@email.kmutnb.ac.th',
      password: password,
    },
  });
}

async function createRoom() {
  await prisma.room.createMany({
    data: [{ name: 'room1' }, { name: 'room2' }, { name: 'room3' }],
    skipDuplicates: true,
  });
}

async function createSource() {
  await prisma.source.createMany({
    data: [{ name: 'center' }, { name: 'department' }, { name: 'personal' }],
    skipDuplicates: true,
  });
}
async function createProducts() {
  const data = JSON.parse(fs.readFileSync('prisma/image.json', 'utf8'));
  const products = ['โต๊ะคอมพิวเตอร์', 'ตู้ไม้เก็บเอกสาร'];
  for (const product of products) {
    await prisma.product.upsert({
      where: {
        name: product,
      },
      update: {},
      create: {
        name: product,
        image: product === 'โต๊ะคอมพิวเตอร์' ? data[0].image : data[1].image,
      },
    });
  }
}

async function checkSource(s: any) {
  let source = await prisma.source.findFirst({
    where: {
      name: s,
    },
  });
  if (source === null) {
    source = await prisma.source.create({
      data: {
        name: s,
      },
    });
  }
  return source;
}

async function checkProduct(p: any, cid: any) {
  let product = await prisma.product.findFirst({
    where: {
      name: p,
    },
  });

  if (product === null) {
    // bad code. fix it!
    if (cid === null || cid === undefined) {
      product = await prisma.product.create({
        data: {
          name: p,
        },
      });
      return product;
    }
    product = await prisma.product.create({
      data: {
        name: p,
        category: {
          connect: {
            id: cid,
          },
        },
      },
    });
  }
  return product;
}

async function checkCategory(s: any) {
  if (s === null || s === undefined) {
    return null;
  }
  let result = await prisma.category.findFirst({
    where: {
      title: s,
    },
  });
  if (result === null) {
    result = await prisma.category.create({
      data: {
        title: s,
      },
    });
  }
  return result;
}

async function createProductItems() {
  const data = JSON.parse(fs.readFileSync('prisma/data.json', 'utf8'));
  for (let i = 0; i < data.length; i++) {
    const source = await checkSource(data[i].source);
    const category = await checkCategory(data[i].Category);
    const product = await checkProduct(data[i].Product, category?.id);
    console.log(i);
    try {
      const pp = await prisma.productItem.create({
        data: {
          serialNumber: String(data[i].serialRef),
          productId: Number(product?.id),
          roomId: 1,
          sourceId: Number(source?.id),
        },
      });
      await updateProductAvailableAmount(pp.productId);
      await updateProductTotalAmount(pp.productId);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          continue;
        }
      }
    }
  }
}

async function main() {
  await createRoom();
  await createSource();
  await createProducts();
  await createProductItems();
  await createOneAdmin();
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
