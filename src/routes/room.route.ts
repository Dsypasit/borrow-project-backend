import express from 'express';
import {
  getRooms,
  createRoom,
  deleteRoom,
} from '../controllers/room.controller';

const route = express.Router();

route.get('/', getRooms);
route.post('/', createRoom);
route.delete('/:id', deleteRoom);

export default route;
