import express from 'express';
import {
  getAllRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
  addReview
} from '../controllers/roomController.js';
import { optionalAuth, protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllRooms);
router.get('/:id', getRoomById);
router.post('/', optionalAuth, createRoom);
router.put('/:id', protect, updateRoom);
router.delete('/:id', protect, deleteRoom);
router.post('/:id/reviews', optionalAuth, addReview);

export default router;
