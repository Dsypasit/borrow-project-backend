import express from 'express';
import {
  getTransactions,
  getTransactionById,
  createTransaction,
  deleteTransaction,
  updateReturnStatus,
  checkReturnStatus,
  getTransactionBorrowed,
} from '../controllers/transaction.controller';

const route = express.Router();

route.get('/', getTransactions);
route.get('/id/:id', getTransactionById);
route.get('/borrowing', getTransactionBorrowed);
route.post('/', createTransaction);
route.delete('/:id', deleteTransaction);

route.get('/status/:id', checkReturnStatus);
route.put('/status/:id', updateReturnStatus);

export default route;
