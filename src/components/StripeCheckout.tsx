
import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { DollarSign } from 'lucide-react';

// Initialize Stripe with publishable key
// In a production environment, you should use an environment variable
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

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
      // In a real implementation, this would call your backend to create a Stripe checkout session
      // For demo purposes, we'll simulate the checkout process
      
      toast.info("Processing payment", {
        description: `Preparing checkout for ${planName} plan...`,
      });
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, immediately show success
      toast.success("Payment successful!", {
        description: `You've successfully subscribed to the ${planName} plan.`,
      });
      
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
