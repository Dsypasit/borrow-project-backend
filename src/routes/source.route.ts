import express from 'express';
import {
  getSources,
  deleteSource,
  createSource,
} from '../controllers/source.controller';

const route = express.Router();

route.get('/', getSources);
route.post('/', createSource);
route.delete('/:id', deleteSource);

export default route;
