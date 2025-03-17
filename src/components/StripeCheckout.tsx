
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { DollarSign } from 'lucide-react';
import { createCheckoutSession } from '@/services/stripe';

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
      
      // Get the current URL for success and cancel URLs
      const successUrl = `${window.location.origin}/success?plan=${planId}`;
      const cancelUrl = `${window.location.origin}/pricing`;
      
      // Create a checkout session and redirect to Stripe
      await createCheckoutSession({
        priceId,
        successUrl,
        cancelUrl
      });
      
      // Note: This code may not execute as redirectToCheckout will navigate away
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      toast.error("Payment failed", {
        description: "Unable to process your payment. Please try again.",
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
