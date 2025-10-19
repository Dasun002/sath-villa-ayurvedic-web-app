import express from 'express';
import { protect, admin } from '../controllers/authMiddleware.js';
import { requestRefund, getMyRefunds, getAllRefunds, decideRefund } from '../controllers/refundController.js';

const router = express.Router();

// user
router.post('/', protect, requestRefund);
router.get('/mine', protect, getMyRefunds);

// admin
router.get('/', protect, admin, getAllRefunds);
router.patch('/:id', protect, admin, decideRefund);

export default router;
