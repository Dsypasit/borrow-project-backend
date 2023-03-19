import express from 'express';
import { getCategory } from '../controllers/category.controller';

const route = express.Router();

route.get('/', getCategory);

export default route;
