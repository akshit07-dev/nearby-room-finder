import express from 'express';
import {
  bookVisit,
  getMyVisits,
  updateVisitStatus
} from '../controllers/visitController.js';
import { optionalAuth, protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', optionalAuth, bookVisit);
router.get('/my', protect, getMyVisits);
router.patch('/:id/status', protect, updateVisitStatus);

export default router;
