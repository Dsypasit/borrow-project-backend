import express, { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateUsageFrequency,
  uploadProductImage,
  addCategory,
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
route.post(
  '/:id/image',
  upload.single('product'),
  uploadProductImage,
  (e: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(400).send({ e: e.message });
  },
);
route.post('/:id/category', addCategory);
route.put('/frequency/:id', updateUsageFrequency);
route.delete('/:id', deleteProduct);

export default route;
