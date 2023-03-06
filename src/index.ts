import { PrismaClient } from '@prisma/client'
import express from 'express'
import labRoute from './routes/lab.route'
import sourceRoute from './routes/source.route'
import productRoute from './routes/products.route'
import productItemRoute from './routes/productItem.route'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

app.use('/lab', labRoute)
app.use('/source', sourceRoute)
app.use('/products', productRoute)
app.use('/productItem', productItemRoute)

app.get('/transaction', async (req, res) => {
  const users = await prisma.transactions.findMany()
  res.json(users)
})

app.get('/lab', async (req, res) => {
  const users = await prisma.lab.findMany()
  res.json(users)
})

app.listen(3000, () =>
  console.log('REST API server ready at: http://localhost:3000'),
)

