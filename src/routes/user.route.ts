import express from 'express'
import { getUserById, getUsers } from '../controllers/user.controller'

let route = express.Router()

route.get('/', getUsers)
route.get('/:id', getUserById)

export default route
