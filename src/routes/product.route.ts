import express from 'express';
import {
  getProducts,
  getProductById,
  createProducts,
  deleteProduct,
  updateFrequency,
} from '../controllers/product.controller';

const route = express.Router();

route.get('/', getProducts);
route.get('/:id', getProductById);
route.post('/', createProducts);
route.put('/frequency/:id', updateFrequency);
route.delete('/:id', deleteProduct);

export default route;
