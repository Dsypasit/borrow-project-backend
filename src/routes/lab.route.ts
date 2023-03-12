import express from 'express';
import { getRooms, createLab, deleteRoom } from '../controllers/room.controller';

const route = express.Router();

route.get('/', getRooms);
route.post('/', createLab);
route.delete('/:id', deleteRoom);

export default route;
