
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with a valid publishable key
// In a production environment, you should use an environment variable
const stripePromise = loadStripe('pk_test_51O1JDzFva8nkdRj0T38vBcN1V76QYC5gUpizoWXYUNJcRNi5ICa9JpXuwcIrkD0vkOqgNbIcBOzQY2xVVF6fGxRm00Xc4jTxFF');

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

    console.log(`Creating checkout session with priceId: ${request.priceId}`);

    // In a real app, this would call your backend API to create a checkout session
    // For this example, we're creating a checkout session directly on the client
    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: request.priceId, // This should be the actual price ID from Stripe
          quantity: 1,
        },
      ],
      mode: 'subscription',
      successUrl: request.successUrl || window.location.origin + '/success',
      cancelUrl: request.cancelUrl || window.location.origin + '/pricing',
    });

    if (error) {
      console.error('Stripe checkout error:', error);
      throw error;
    }

    return { success: true };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

export { stripePromise };
