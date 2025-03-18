
import { loadStripe } from '@stripe/stripe-js';
import { supabase } from '@/integrations/supabase/client';

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
    console.log(`Creating checkout session with priceId: ${request.priceId}`);
    
    // Call the Supabase Edge Function to create a checkout session
    const { data, error } = await supabase.functions.invoke('create-checkout-session', {
      body: { 
        priceId: request.priceId, 
        successUrl: request.successUrl || window.location.origin + '/success',
        cancelUrl: request.cancelUrl || window.location.origin + '/pricing'
      }
    });
    
    if (error) {
      console.error('Edge function error:', error);
      throw new Error(error.message || 'Failed to create checkout session');
    }
    
    if (!data || !data.url) {
      throw new Error('No checkout URL returned from server');
    }
    
    // Redirect to the Stripe checkout page
    window.location.href = data.url;
    
    return { success: true };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

export { stripePromise };
