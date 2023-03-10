import express from 'express'
import { getUserBorrowing, getUserBorrowingById, getUserById, getUsers } from '../controllers/user.controller'

const route = express.Router();

route.get('/', getUsers)
route.get('/borrowing', getUserBorrowing)
route.get('/borrowing/:id', getUserBorrowingById)
route.get('/id/:id', getUserById)

export default route;
