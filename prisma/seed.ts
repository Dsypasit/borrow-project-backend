import { PrismaClient, Prisma } from '@prisma/client';
import fs from 'fs'

const prisma = new PrismaClient();

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
  await prisma.product.createMany({
    data: [{ name: 'Calculator' }, { name: 'Telescope' }],
    skipDuplicates: true,
  });
}

async function main() {
  await createRoom();
  await createSource();
  await createProducts();
  await createProductItems();
}

async function createProductItems(){
  let data = JSON.parse(fs.readFileSync('prisma/data.json', 'utf8'));
  for(var i=0; i<data.length;i++){
    let source = await checkSource(data[i].source)
    let product = await checkProduct(data[i].Product)
    console.log(i)
    try{
      await prisma.productItem.create({
        data: {
          serialNumber: String(data[i].serialRef),
          productId: Number(product?.id),
          roomId: 1,
          sourceId: Number(source?.id),
        },
      })
    }catch(e){
      if(e instanceof Prisma.PrismaClientKnownRequestError){
        if(e.code === 'P2002'){
          continue
        }
      }
    }
    
  }
}

async function checkSource(s:any){
  let source = await prisma.source.findFirst({
    where: {
      name: s,
    }
  });
  if (source === null){
    source = await prisma.source.create({
      data:{
        name: s
      }
    })
  } 
  return source
}

// async function checkCategory(s:any){
//   let source = await prisma.source.findFirst({
//     where: {
//       name: s,
//     }
//   });
//   if (source === null){
//     source = await prisma.source.create({
//       data:{
//         name: s
//       }
//     })
//   } 
//   return source
// }

async function checkProduct(p:any){
  let product = await prisma.product.findFirst({
    where: {
      name: p,
    }
  });
  if (product === null){
    product = await prisma.product.create({
      data:{
        name: p
      }
    })
  } 
  return product
}

main()
.catch((e) => console.error(e))
.finally(() => prisma.$disconnect());
