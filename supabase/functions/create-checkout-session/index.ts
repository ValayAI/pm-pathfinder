
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

    // Define product prices based on ID
    const productPrices = {
      'prod_RxEyhiWdXOWnUk': 2900,  // Career Starter Pack - $29/month
      'prod_Rxhow56qBX4uRZ': 9900,  // Execution Pack - $99 one-time
      'prod_Rxhqlof4dblRZT': 24900, // PM360 Pack - $249 one-time
      'prod_SingleSession': 1000,   // Single Session - $10 one-time
    };

    // Check if the product exists in our mapping
    if (!productPrices[priceId]) {
      return new Response(
        JSON.stringify({ error: 'Invalid product ID' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          product: priceId,
          currency: 'usd',
          unit_amount: productPrices[priceId],
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
