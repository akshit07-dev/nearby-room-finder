import express from 'express';
import {
  getLocalities,
  getLandmarks,
  calculateCommuteRoute
} from '../controllers/locationController.js';

const router = express.Router();

router.get('/localities', getLocalities);
router.get('/landmarks', getLandmarks);
router.post('/commute', calculateCommuteRoute);

export default router;
