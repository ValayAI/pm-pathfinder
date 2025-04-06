
// Supabase Edge Function to handle subscription updates after Stripe checkout
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

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
    // Get request body
    const { userId, planId } = await req.json();
    
    if (!userId || !planId) {
      return new Response(
        JSON.stringify({ error: 'User ID and plan ID are required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    // Define plan specifics
    const planFeatures = {
      single: {
        features: ['1 PM Power Hour', 'Basic question assistance'],
        messageLimit: 1,
        expiresAt: null, // single session doesn't expire
      },
      starter: {
        features: ['🎁 2 Free Sessions', '50 PM Power Hours', 'Interview preparation toolkit'],
        messageLimit: 50,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      },
      popular: {
        features: [
          '🎁 5 Free Sessions',
          'Unlimited PM Power Hours',
          'Roadmaps & backlogs templates',
          'Strategy frameworks library',
          'Resume & interview coaching'
        ],
        messageLimit: null, // unlimited
        expiresAt: null, // no expiry
      },
      pro: {
        features: [
          '🎁 10 Free Sessions',
          'Everything in Execution Pack',
          '1-on-1 PM coaching call',
          'Personalized resume review',
          'Full product toolkit access'
        ],
        messageLimit: null, // unlimited
        expiresAt: null, // no expiry
      }
    };

    const selectedPlan = planFeatures[planId as keyof typeof planFeatures];
    if (!selectedPlan) {
      return new Response(
        JSON.stringify({ error: 'Invalid plan ID' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Set any existing subscriptions to inactive
    const { error: deactivateError } = await supabaseClient
      .from('subscriptions')
      .update({ active: false })
      .eq('user_id', userId);
    
    if (deactivateError) {
      console.error('Error deactivating existing subscriptions:', deactivateError);
      throw deactivateError;
    }
    
    // Create new subscription record
    const { error: insertError } = await supabaseClient
      .from('subscriptions')
      .insert({
        user_id: userId,
        plan_id: planId,
        message_limit: selectedPlan.messageLimit,
        features: selectedPlan.features,
        expires_at: selectedPlan.expiresAt,
        active: true
      });
    
    if (insertError) {
      console.error('Error creating subscription:', insertError);
      throw insertError;
    }
    
    // Reset used messages counter
    const { error: resetError } = await supabaseClient
      .from('message_usage')
      .update({ messages_used: 0 })
      .eq('user_id', userId);
    
    if (resetError) {
      console.error('Error resetting message usage:', resetError);
    }
    
    // Log the activity
    await supabaseClient
      .from('user_activity')
      .insert({
        user_id: userId,
        activity_type: 'subscription_updated',
        activity_details: { 
          plan_id: planId, 
          timestamp: new Date().toISOString() 
        }
      });

    return new Response(
      JSON.stringify({ success: true, plan: planId }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  } catch (error) {
    console.error('Error updating subscription:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
