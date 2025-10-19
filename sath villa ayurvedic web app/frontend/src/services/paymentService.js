import axios from 'axios';

// Payment backend URL
const PAYMENT_API_BASE = process.env.REACT_APP_PAYMENT_API_URL || 'http://localhost:5001';

console.log('PaymentService - PAYMENT_API_BASE:', PAYMENT_API_BASE);

class PaymentService {
  // Initialize checkout and redirect to Stripe
  static async checkoutFromBooking(bookingData) {
    try {
      const response = await axios.post(`${PAYMENT_API_BASE}/stripe/checkout-from-booking`, bookingData, {
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (response.data.url) {
        // Redirect to Stripe checkout
        window.location.href = response.data.url;
        return { success: true, url: response.data.url };
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      throw new Error(error.response?.data?.message || 'Failed to initiate checkout');
    }
  }

  // Confirm payment status (for success page)
  static async confirmPayment(sessionId, token) {
    try {
      const params = new URLSearchParams();
      if (sessionId) params.append('session_id', sessionId);
      if (token) params.append('t', token);

      const response = await axios.get(`${PAYMENT_API_BASE}/stripe/confirm?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Payment confirmation error:', error);
      throw new Error(error.response?.data?.message || 'Failed to confirm payment');
    }
  }

  // Get payment context (for success page)
  static async getContext(token) {
    try {
      const response = await axios.get(`${PAYMENT_API_BASE}/checkout/context/${token}`);
      return response.data;
    } catch (error) {
      console.error('Context fetch error:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch context');
    }
  }

  // Cart checkout (for future use)
  static async checkoutFromCart(cartData) {
    try {
      console.log('PaymentService.checkoutFromCart - Sending request to:', `${PAYMENT_API_BASE}/stripe/checkout-from-cart`);
      console.log('PaymentService.checkoutFromCart - Cart data:', cartData);
      
      // Ensure currency is set to USD since cart prices are in USD
      const requestData = {
        ...cartData,
        currency: 'usd'
      };
      
      const response = await axios.post(`${PAYMENT_API_BASE}/stripe/checkout-from-cart`, requestData, {
        headers: { 'Content-Type': 'application/json' },
      });
      
      console.log('PaymentService.checkoutFromCart - Response:', response.data);
      
      if (response.data.url) {
        // Return the URL instead of redirecting immediately
        // This allows the calling component to decide when to redirect
        return { success: true, url: response.data.url };
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Cart checkout error details:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      throw new Error(error.response?.data?.message || 'Failed to initiate cart checkout');
    }
  }
}

export default PaymentService;