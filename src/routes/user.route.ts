import express from 'express';
import {
  getUsersNotReturn,
  getUserNotReturnById,
  getUserById,
  getUsers,
} from '../controllers/user.controller';

const route = express.Router();

route.get('/', getUsers);
route.get('/borrowing', getUsersNotReturn);
route.get('/borrowing/:id', getUserNotReturnById);
route.get('/id/:id', getUserById);

export default route;
