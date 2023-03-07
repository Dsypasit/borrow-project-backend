import express from 'express'
import { getTrans, getTransById, createTrans, deleteTrans, updateStatus, checkStatus } from '../controllers/transaction.controller'

let route = express.Router()

route.get('/', getTrans)
route.get('/:id', getTransById)
route.post('/', createTrans)
route.delete('/:id', deleteTrans)

route.get('/status/:id', checkStatus)
route.put('/status/:id', updateStatus)

export default route
