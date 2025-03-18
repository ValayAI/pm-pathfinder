
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@12.0.0';

// Get the secret key from the environment variables
const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
const stripe = new Stripe(stripeSecretKey || '', {
  apiVersion: '2023-10-16',
});

// Set up CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the request body
    const { priceId, successUrl, cancelUrl } = await req.json();
    
    if (!priceId) {
      return new Response(
        JSON.stringify({ error: 'Product ID is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Log the received parameters
    console.log(`Creating Stripe checkout session for product: ${priceId}`);
    console.log(`Success URL: ${successUrl}, Cancel URL: ${cancelUrl}`);

    // Create a checkout session - adjust line_items to use priceId as product instead of price
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          product: priceId,
          currency: 'usd',
          unit_amount: priceId === 'prod_RxEyhiWdXOWnUk' ? 2900 : priceId === 'prod_Rxhow56qBX4uRZ' ? 9900 : 24900,
          recurring: priceId === 'prod_RxEyhiWdXOWnUk' ? { interval: 'month' } : undefined,
        },
        quantity: 1,
      }],
      mode: priceId === 'prod_RxEyhiWdXOWnUk' ? 'subscription' : 'payment',
      success_url: successUrl || `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${req.headers.get('origin')}/pricing`,
    });

    // Return the session ID to the client
    return new Response(
      JSON.stringify({ sessionId: session.id, url: session.url }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
