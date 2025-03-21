import { PlanType } from '@/providers/SubscriptionProvider';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

/**
 * Updates the user's subscription in Supabase after a successful payment
 */
export const updateSubscription = async (planId: string): Promise<boolean> => {
  try {
    // Validate that planId is a valid plan type
    if (!['starter', 'popular', 'pro'].includes(planId)) {
      console.error(`Invalid plan ID: ${planId}`);
      return false;
    }
    
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.error('No authenticated user found');
      return false;
    }
    
    const userId = user.id;
    
    // Define features and message limits for each plan
    const planFeatures = {
      starter: {
        features: ['50 messages/month', 'PM career & interview tips'],
        messageLimit: 50,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      },
      popular: {
        features: [
          'Unlimited messages',
          'Resume & interview coaching',
          'Frameworks & strategy guides',
          'Exclusive PM resources'
        ],
        messageLimit: null, // unlimited
        expiresAt: null, // no expiry
      },
      pro: {
        features: [
          'Unlimited messages',
          'Resume & interview coaching',
          'Frameworks & strategy guides',
          'Exclusive PM resources',
          '1-on-1 PM coaching call',
          'Personalized resume review'
        ],
        messageLimit: null, // unlimited
        expiresAt: null, // no expiry
      }
    };
    
    const selectedPlan = planFeatures[planId as keyof typeof planFeatures];
    
    // Set any existing subscriptions to inactive
    const { error: deactivateError } = await supabase
      .from('subscriptions')
      .update({ active: false })
      .eq('user_id', userId);
    
    if (deactivateError) {
      console.error('Error deactivating existing subscriptions:', deactivateError);
      return false;
    }
    
    // Create new subscription record
    const { error: insertError } = await supabase
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
      return false;
    }
    
    // Reset used messages counter
    const { error: resetError } = await supabase
      .from('message_usage')
      .update({ messages_used: 0 })
      .eq('user_id', userId);
    
    if (resetError) {
      console.error('Error resetting message usage:', resetError);
    }
    
    // Log the activity
    await logUserActivity(userId, 'subscription_updated', { 
      plan_id: planId, 
      timestamp: new Date().toISOString() 
    });
    
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
 * Logs user activity in Supabase
 */
export const logUserActivity = async (
  userId: string, 
  activityType: string, 
  details: Record<string, any> = {}
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('user_activity')
      .insert({
        user_id: userId,
        activity_type: activityType,
        activity_details: details
      });
    
    if (error) {
      console.error(`Error logging ${activityType} activity:`, error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error(`Error logging ${activityType} activity:`, error);
    return false;
  }
};

/**
 * Increments the message usage counter for a user
 */
export const incrementMessageUsage = async (userId: string): Promise<boolean> => {
  try {
    // First, check if user exists in message_usage table
    const { data, error: checkError } = await supabase
      .from('message_usage')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();
    
    if (checkError) {
      throw checkError;
    }
    
    // If user doesn't exist in the table, create a record
    if (!data) {
      const { error: insertError } = await supabase
        .from('message_usage')
        .insert({
          user_id: userId,
          messages_used: 1,
          last_updated: new Date().toISOString()
        });
      
      if (insertError) {
        throw insertError;
      }
    } else {
      // Otherwise, increment the existing count
      const { error: updateError } = await supabase
        .from('message_usage')
        .update({ 
          messages_used: data.messages_used + 1,
          last_updated: new Date().toISOString()
        })
        .eq('user_id', userId);
      
      if (updateError) {
        throw updateError;
      }
    }
    
    // Log the activity
    await logUserActivity(userId, 'message_sent', {
      timestamp: new Date().toISOString()
    });
    
    return true;
  } catch (error) {
    console.error('Error incrementing message usage:', error);
    return false;
  }
};

/**
 * Resets the user's subscription when they log out
 */
export const resetSubscription = () => {
  // No need to do anything on logout as data is stored in DB
};
