
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with your publishable key
// In a production environment, you should use an environment variable
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

export interface CheckoutSessionRequest {
  priceId: string;
  successUrl: string;
  cancelUrl: string;
}

export const createCheckoutSession = async (request: CheckoutSessionRequest) => {
  try {
    // In a real app, this would call your backend to create a checkout session
    // For now, we'll simulate a response
    const mockSessionId = `cs_test_${Math.random().toString(36).substring(2, 15)}`;
    
    // Return a mock session ID
    return { sessionId: mockSessionId };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

export { stripePromise };
