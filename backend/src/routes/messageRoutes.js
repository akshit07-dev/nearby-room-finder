import express from 'express';
import { sendMessage, getMyMessages } from '../controllers/messageController.js';
import { optionalAuth, protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', optionalAuth, sendMessage);
router.get('/', protect, getMyMessages);

export default router;
