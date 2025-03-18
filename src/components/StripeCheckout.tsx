
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { DollarSign } from 'lucide-react';
import { createCheckoutSession } from '@/services/stripe';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://hqftusejwtxfdbjldlen.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxZnR1c2Vqd3R4ZmRiamxkbGVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg1ODg0NTMsImV4cCI6MjAzNDE2NDQ1M30.89vt2eZMBsofAL-0f6_W_GFMEO51mL45v1e6_6mGVjE';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface StripeCheckoutProps {
  planId: string;
  planName: string;
  priceId: string;
  onSuccess?: () => void;
  variant?: "default" | "outline";
  highlight?: boolean;
}

const StripeCheckout: React.FC<StripeCheckoutProps> = ({ 
  planId, 
  planName, 
  priceId, 
  onSuccess, 
  variant = "default",
  highlight = false 
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);
    
    try {
      toast.info("Processing payment", {
        description: `Preparing checkout for ${planName} plan...`,
      });
      
      console.log(`Processing checkout for plan: ${planName}, price ID: ${priceId}`);
      
      // Get the current URL for success and cancel URLs
      const successUrl = `${window.location.origin}/success?plan=${planId}`;
      const cancelUrl = `${window.location.origin}/pricing`;
      
      // First try the Supabase Edge Function
      try {
        const { data, error } = await supabase.functions.invoke('create-checkout-session', {
          body: { priceId, successUrl, cancelUrl }
        });
        
        if (error) throw error;
        
        // Redirect to Stripe checkout page
        if (data.url) {
          window.location.href = data.url;
          return;
        }
      } catch (edgeFunctionError) {
        console.warn('Edge function failed, falling back to client-side checkout:', edgeFunctionError);
        
        // Fall back to client-side checkout
        await createCheckoutSession({
          priceId,
          successUrl,
          cancelUrl
        });
      }
      
      // Note: This code may not execute as redirect will navigate away
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      
      // Provide a more detailed error message based on the error
      let errorMessage = "Unable to process your payment. Please try again.";
      
      if (error instanceof Error) {
        errorMessage = `Payment error: ${error.message}`;
        
        if (error.message.includes("No such price")) {
          errorMessage = "This payment plan is currently unavailable. Please try a different plan or contact support.";
        } else if (error.message.includes("Invalid API Key")) {
          errorMessage = "Payment processing is temporarily unavailable. Please try again later.";
        }
      }
      
      toast.error("Payment failed", {
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleCheckout}
      disabled={isLoading}
      variant={variant}
      className={highlight ? "bg-purple-600 hover:bg-purple-700" : ""}
    >
      {isLoading ? (
        "Processing..."
      ) : highlight ? (
        <>
          <DollarSign className="h-4 w-4 mr-1" />
          Choose Plan
        </>
      ) : (
        "Select Plan"
      )}
    </Button>
  );
};

export default StripeCheckout;
