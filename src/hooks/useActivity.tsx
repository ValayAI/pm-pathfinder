
import { useAuth } from '@/providers/AuthProvider';
import { useSubscription } from '@/providers/SubscriptionProvider';
import { logUserActivity, incrementCreditUsage } from '@/utils/subscriptionManager';
import { toast } from 'sonner';

export type ActivityType = 'page_view' | 'message_sent' | 'subscription_changed' | 'feature_used' | 'login' | 'signup';

export interface ActivityDetails {
  page?: string;
  featureName?: string;
  planId?: string;
  source?: string;
  metadata?: Record<string, any>;
}

export const useActivity = () => {
  const { user } = useAuth();
  const { subscription, getRemainingCredits } = useSubscription();

  /**
   * Track general user activity
   */
  const trackActivity = async (activityType: ActivityType, details: ActivityDetails = {}) => {
    if (!user) return false;
    
    // Add subscription info to activity logs
    const enrichedDetails = {
      ...details,
      planId: details.planId || subscription?.planId || 'free',
      timestamp: new Date().toISOString()
    };
    
    console.log(`Tracking activity: ${activityType}`, enrichedDetails);
    return await logUserActivity(user.id, activityType, enrichedDetails);
  };
  
  /**
   * Track message usage with subscription limit check
   */
  const trackMessage = async () => {
    if (!user) return false;
    
    const remainingCredits = getRemainingCredits();
    
    // If this is a limited plan and user has 0 or 1 message left, show appropriate toast
    if (remainingCredits === 1) {
      toast.warning("Last coaching credit remaining", {
        description: "You've reached your credit limit. Consider upgrading your plan for more coaching credits.",
      });
    }
    
    const success = await incrementCreditUsage(user.id);
    
    // Track the message send as a general activity too
    if (success) {
      await trackActivity('message_sent', {
        metadata: { 
          remainingBefore: remainingCredits,
          planId: subscription?.planId 
        }
      });
    }
    
    return success;
  };

  /**
   * Track feature usage with permission check
   */
  const trackFeatureUsage = async (featureName: string, details: Record<string, any> = {}) => {
    if (!user) return false;
    
    return await trackActivity('feature_used', {
      featureName,
      metadata: details
    });
  };

  /**
   * Track page views
   */
  const trackPageView = async (pageName: string) => {
    return await trackActivity('page_view', { page: pageName });
  };

  return {
    trackActivity,
    trackMessage,
    trackFeatureUsage,
    trackPageView
  };
};

export default useActivity;
