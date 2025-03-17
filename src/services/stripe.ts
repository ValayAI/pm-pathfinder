
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with your publishable key
// In a production environment, you should use an environment variable
const stripePromise = loadStripe('pk_test_51R3J6WK225E53DUIWzPcD3dVqdWIP7UKcpd8ZBXtMLSmzEiEshEa7wAWLWlSQUxVBiQ74HwZ1KWkrsGavumRA8ab00YfrD11Vn');

export interface CheckoutSessionRequest {
  priceId: string;
  successUrl: string;
  cancelUrl: string;
}

export const createCheckoutSession = async (request: CheckoutSessionRequest) => {
  try {
    // Create a checkout session with Stripe
    const stripe = await stripePromise;
    
    if (!stripe) {
      throw new Error('Failed to load Stripe');
    }

    // In a real app, this would call your backend API to create a checkout session
    // For this example, we're creating a checkout session directly on the client
    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: request.priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      successUrl: request.successUrl || window.location.origin + '/success',
      cancelUrl: request.cancelUrl || window.location.origin + '/pricing',
    });

    if (error) {
      throw error;
    }

    return { success: true };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

export { stripePromise };
