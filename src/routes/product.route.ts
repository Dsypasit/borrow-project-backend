import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateUsageFrequency,
} from '../controllers/product.controller';

const route = express.Router();

route.get('/', getProducts);
route.get('/:id', getProductById);
route.post('/', createProduct);
route.put('/frequency/:id', updateUsageFrequency);
route.post('/', createProduct);
route.put('/frequency/:id', updateUsageFrequency);
route.delete('/:id', deleteProduct);

export default route;
