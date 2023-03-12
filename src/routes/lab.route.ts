import express from 'express';
import { getLabs, createLab, deleteLab } from '../controllers/room.controller';

const route = express.Router();

route.get('/', getLabs);
route.post('/', createLab);
route.delete('/:id', deleteLab);

export default route;
