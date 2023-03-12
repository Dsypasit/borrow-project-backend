import express from 'express';
import multer from 'multer';
import {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateUsageFrequency,
  uploadProductImage,
} from '../controllers/product.controller';

const upload = multer({
  limits: {
    fieldSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)/)) {
      return cb(new Error('Please upload a image file'));
    }

    cb(null, true);
  },
});

const route = express.Router();

route.get('/', getProducts);
route.get('/:id', getProductById);
route.post('/', createProduct);
route.put('/frequency/:id', updateUsageFrequency);
route.post('/', createProduct);
route.post('/image/:id', upload.single('product'), uploadProductImage);
route.put('/frequency/:id', updateUsageFrequency);
route.delete('/:id', deleteProduct);

export default route;
