<<<<<<< HEAD
import express from 'express';
import {
  getUsersNotReturn,
  getUserById,
  getUsers,
} from '../controllers/user.controller';

const route = express.Router();

route.get('/', getUsers);
route.get('/borrowing', getUsersNotReturn);
route.get('/id/:id', getUserById);
=======
import express from 'express'
import { getUserBorrowing, getUserBorrowingById, getUserById, getUsers } from '../controllers/user.controller'

const route = express.Router();

route.get('/', getUsers)
route.get('/borrowing', getUserBorrowing)
route.get('/borrowing/:id', getUserBorrowingById)
route.get('/id/:id', getUserById)
>>>>>>> db67ae9c3ccb6c9061601bf3809ece1b14b279ed

export default route;
