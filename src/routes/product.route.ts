import express from 'express';
import {
  getProducts,
  getProductById,
  createProducts,
  deleteProduct,
  updateUsageFrequency,
} from '../controllers/product.controller';

const route = express.Router();

route.get('/', getProducts);
route.get('/:id', getProductById);
<<<<<<< HEAD
route.post('/', createProducts);
route.put('/frequency/:id', updateFrequency);
=======
route.post('/', createProduct);
route.put('/frequency/:id', updateUsageFrequency);
>>>>>>> 6d4e3af (refactor: rename some function and request.body)
route.delete('/:id', deleteProduct);

export default route;
