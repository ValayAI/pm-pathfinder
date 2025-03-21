
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { DollarSign } from 'lucide-react';
import { createCheckoutSession } from '@/services/stripe';
import { useAuth } from '@/providers/AuthProvider';
import { useSubscription } from '@/providers/SubscriptionProvider';

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
  const { user } = useAuth();
  const { refreshSubscription } = useSubscription();

  const handleCheckout = async () => {
    if (!user) {
      toast.error("You need to be signed in", {
        description: "Please sign in to subscribe to a plan"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      toast.info("Processing payment", {
        description: `Preparing checkout for ${planName} plan...`,
      });
      
      console.log(`Processing checkout for plan: ${planName}, price ID: ${priceId}`);
      
      // Get the current URL for success and cancel URLs
      const successUrl = `${window.location.origin}/success?plan=${planId}`;
      const cancelUrl = `${window.location.origin}/pricing`;
      
      // Create checkout session
      await createCheckoutSession({
        priceId,
        successUrl,
        cancelUrl
      });
      
      // Note: The redirect happens in the createCheckoutSession function
      // This code might not execute due to the redirect
      
      // Update subscription state
      await refreshSubscription();
      
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
