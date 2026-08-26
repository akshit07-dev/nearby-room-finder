import express from 'express';
import {
  getAllFlatmates,
  getFlatmateById,
  createFlatmate
} from '../controllers/flatmateController.js';
import { optionalAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllFlatmates);
router.get('/:id', getFlatmateById);
router.post('/', optionalAuth, createFlatmate);

export default router;
