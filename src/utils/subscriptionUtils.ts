
import { PlanType } from '@/providers/SubscriptionProvider';
import { toast } from 'sonner';

/**
 * Updates the user's subscription in localStorage after a successful payment
 * In a real application, this would update a database record
 */
export const updateSubscription = (planId: string): boolean => {
  try {
    // Validate that planId is a valid plan type
    if (!['starter', 'popular', 'pro'].includes(planId)) {
      console.error(`Invalid plan ID: ${planId}`);
      return false;
    }
    
    // Save to localStorage (temporary solution)
    localStorage.setItem('userSubscription', JSON.stringify(planId));
    
    // Reset used messages counter for the new subscription
    localStorage.setItem('usedMessages', '0');
    
    console.log(`Subscription updated to: ${planId}`);
    
    // Show success message
    toast.success(`Subscription updated!`, {
      description: `Your account has been upgraded to the ${planId} plan.`,
    });
    
    return true;
  } catch (error) {
    console.error('Error updating subscription:', error);
    return false;
  }
};

/**
 * Resets the user's subscription when they log out
 */
export const resetSubscription = () => {
  localStorage.removeItem('userSubscription');
};
