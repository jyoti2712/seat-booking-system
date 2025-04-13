import express from 'express';
import { getSeats, bookSeats } from '../controllers/seatController.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getSeats);
router.post('/book', authenticateToken, bookSeats);

export default router;