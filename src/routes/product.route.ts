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
route.post('/', createProduct);
route.put('/frequency/:id', updateUsageFrequency);
=======
route.post('/', createProducts);
route.put('/frequency/:id', updateFrequency);
>>>>>>> db67ae9c3ccb6c9061601bf3809ece1b14b279ed
route.delete('/:id', deleteProduct);

export default route;
