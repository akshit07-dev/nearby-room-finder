import express from 'express';
import {
  getSavedRooms,
  toggleSavedRoom,
  removeSavedRoom,
  clearSavedRooms
} from '../controllers/savedController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect); // All saved routes require authentication

router.get('/', getSavedRooms);
router.post('/:roomId', toggleSavedRoom);
router.delete('/:roomId', removeSavedRoom);
router.delete('/', clearSavedRooms);

export default router;
