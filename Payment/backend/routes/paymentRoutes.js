import express from 'express';
import {
  getAllPayments,
  createPayment,
  updatePayment,
  deletePayment,
  getPaymentsByUserEmail
} from '../controllers/paymentController.js';
import { protect, admin } from '../controllers/authMiddleware.js';
import { confirmCheckout, checkoutFromBooking, checkoutFromCart } from '../controllers/stripeController.js';
import { initCheckout, getContext } from '../controllers/checkoutController.js';

const router = express.Router();

// optional context endpoints (used by legacy /pay flow)
router.post('/init', initCheckout);
router.get('/context/:token', getContext);

// NEW: direct booking → Stripe (accessible via /stripe/checkout-from-booking)
router.post('/checkout-from-booking', checkoutFromBooking);
router.post('/checkout-direct', checkoutFromBooking); // Keep legacy endpoint

router.post('/checkout-cart', checkoutFromCart);
router.post('/checkout-from-cart', checkoutFromCart); // Add alternative endpoint

// admin-only
router.get('/', protect, admin, getAllPayments);
router.put('/:id', protect, admin, updatePayment);
router.delete('/:id', protect, admin, deletePayment);

// user-guarded
router.get('/user/:email', protect, getPaymentsByUserEmail);

// legacy simulated create (keep if you still want it for tests)
router.post('/', createPayment);

// ⬇ STRIPE CHECKOUT (accessible via /stripe/confirm)
router.get('/confirm', confirmCheckout);

export default router;
