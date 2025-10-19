# Sath Villa Payment Integration - Testing Guide

## Overview
This integration connects the Sath Villa booking system with Stripe payment processing. When users click "Proceed to Payment" after filling out the booking form, they are redirected to Stripe checkout, and after successful payment, they return to a success page with automatic receipt download.

## Setup Requirements

### 1. Environment Variables
Ensure the following environment files are configured:

**Sath Villa Frontend (.env):**
```
REACT_APP_PAYMENT_API_URL=http://localhost:5001
REACT_APP_BACKEND_API_URL=http://localhost:5000
```

**Payment Backend (.env):**
```
PORT=5001
MONGO_URI=your_mongodb_connection_string_here
STRIPE_SECRET_KEY=your_stripe_secret_key_here
FRONTEND_URL=http://localhost:5173
SATHVILLA_API_URL=http://localhost:5000
SATH_BACKEND_URL=http://localhost:5000
LKR_TO_USD_RATE=0.0033
LKR_TO_USD=0.0033
```

### 2. Running the Applications

1. **Start Sath Villa Backend** (Port 5000):
   ```bash
   cd "sath villa ayurvedic web app/backend"
   npm start
   ```

2. **Start Payment Backend** (Port 5001):
   ```bash
   cd "Payment/backend"
   npm start
   ```

3. **Start Sath Villa Frontend** (Port 3000):
   ```bash
   cd "sath villa ayurvedic web app/frontend"
   npm start
   ```

## Testing the Payment Flow

### Step 1: Navigate to Booking Page
1. Open http://localhost:3000
2. Go to "Book Your Stay" or directly to http://localhost:3000/add_booking

### Step 2: Fill Out Booking Form
1. Fill in guest details (name, email, phone)
2. Select a package type and duration
3. Choose a check-in date
4. Set number of guests
5. Wait for room availability to load
6. Select an available room

### Step 3: Proceed to Payment
1. Click "Proceed to Payment" button
2. The form should redirect to Stripe checkout page
3. Use Stripe test card: 4242 4242 4242 4242 (any future date, any 3-digit CVC)

### Step 4: Complete Payment
1. Fill in test payment details on Stripe
2. Click "Pay now"
3. You should be redirected to http://localhost:3000/payment-success

### Step 5: Verify Success Page
1. The success page should show:
   - ✅ Payment successful message
   - Booking details summary
   - Receipt should automatically download/print
2. Verify the booking was created in the Sath Villa backend

## Expected Flow Summary

```
User fills booking form
       ↓
Clicks "Proceed to Payment"
       ↓
Redirected to Stripe Checkout
       ↓
Completes payment
       ↓
Redirected to /payment-success
       ↓
Receipt automatically downloads
       ↓
Booking created in Sath Villa database
```

## Troubleshooting

### Common Issues:

1. **"Failed to initiate checkout" error:**
   - Check Payment backend is running on port 5001
   - Verify REACT_APP_PAYMENT_API_URL in Sath Villa frontend .env

2. **Stripe redirect not working:**
   - Verify STRIPE_SECRET_KEY is valid
   - Check browser console for JavaScript errors

3. **Success page not loading:**
   - Ensure /payment-success route is properly configured
   - Check that PaymentSuccess component is imported in App.js

4. **Receipt not downloading:**
   - Check browser popup blocker settings
   - Verify browser allows automatic downloads

5. **Booking not created:**
   - Check SATH_BACKEND_URL in Payment backend .env
   - Verify Sath Villa backend is running and accessible

## Test Card Numbers (Stripe Test Mode)
- **Success:** 4242 4242 4242 4242
- **Declined:** 4000 0000 0000 0002
- **Requires Authentication:** 4000 0025 0000 3155

## File Changes Made

### New Files:
- `sath villa ayurvedic web app/frontend/src/services/paymentService.js`
- `sath villa ayurvedic web app/frontend/src/Component/PaymentSuccess/PaymentSuccess.js`
- `sath villa ayurvedic web app/frontend/src/Component/PaymentSuccess/PaymentSuccess.css`
- `sath villa ayurvedic web app/frontend/.env`

### Modified Files:
- `sath villa ayurvedic web app/frontend/src/Component/Add Booking/Add_Booking.js`
- `sath villa ayurvedic web app/frontend/src/App.js`
- `Payment/backend/controllers/stripeController.js`
- `Payment/backend/.env`

The integration is now complete and ready for testing!