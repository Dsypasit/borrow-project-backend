import express from 'express'
import { getItems, getItemById, createItem, deleteItem } from '../controllers/productItem.controller'

let route = express.Router()

route.get('/', getItems)
route.get('/:id', getItemById)
route.post('/', createItem)
route.delete('/:id', deleteItem)

export default route
