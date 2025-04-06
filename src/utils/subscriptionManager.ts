/**
 * Centralized utilities for subscription management
 */

import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { PlanType } from '@/components/subscription/PlanCard';

/**
 * Plan features and limits configuration
 */
export const PLAN_FEATURES = {
  free: {
    features: ['Basic chat access', 'Limited coaching'],
    creditLimit: 0,
    expiresAt: null,
  },
  single: {
    features: ['1 Coaching Credit', 'Basic question assistance', 'Try before you buy'],
    creditLimit: 1,
    expiresAt: null, // single session doesn't expire
  },
  starter: {
    features: ['3 Coaching Credits', 'Interview preparation toolkit', 'Basic career guidance'],
    creditLimit: 3,
    expiresAt: (date: Date) => {
      const expiryDate = new Date(date);
      expiryDate.setDate(expiryDate.getDate() + 30);
      return expiryDate;
    },
  },
  popular: {
    features: [
      '10 Coaching Credits + 5 Bonus',
      'Roadmaps & backlogs templates',
      'Strategy frameworks library',
      'Resume & interview coaching'
    ],
    creditLimit: 15, // 10 + 5 bonus
    expiresAt: null, // no expiry
  },
  pro: {
    features: [
      '20 Coaching Credits + 10 Bonus',
      '1-on-1 PM coaching call',
      'Personalized resume review',
      'Full product toolkit access'
    ],
    creditLimit: 30, // 20 + 10 bonus
    expiresAt: null, // no expiry
  }
};

/**
 * Updates the user's subscription in Supabase after a successful payment
 */
export const updateSubscription = async (planId: string): Promise<boolean> => {
  try {
    // Validate that planId is a valid plan type
    if (!['single', 'starter', 'popular', 'pro'].includes(planId)) {
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
    const selectedPlan = PLAN_FEATURES[planId as keyof typeof PLAN_FEATURES];
    
    // Prepare the expiry date if needed
    let expiresAt = null;
    if (selectedPlan.expiresAt && typeof selectedPlan.expiresAt === 'function') {
      expiresAt = selectedPlan.expiresAt(new Date());
    }
    
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
        credits_limit: selectedPlan.creditLimit,
        features: selectedPlan.features,
        expires_at: expiresAt,
        active: true
      });
    
    if (insertError) {
      console.error('Error creating subscription:', insertError);
      return false;
    }
    
    // Reset used credits counter
    const { error: resetError } = await supabase
      .from('credit_usage')
      .update({ credits_used: 0 })
      .eq('user_id', userId);
    
    if (resetError) {
      console.error('Error resetting credit usage:', resetError);
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
 * Increments the credit usage counter for a user
 */
export const incrementCreditUsage = async (userId: string): Promise<boolean> => {
  try {
    // First, check if user exists in credit_usage table
    const { data, error: checkError } = await supabase
      .from('credit_usage')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();
    
    if (checkError) {
      throw checkError;
    }
    
    // If user doesn't exist in the table, create a record
    if (!data) {
      const { error: insertError } = await supabase
        .from('credit_usage')
        .insert({
          user_id: userId,
          credits_used: 1,
          last_updated: new Date().toISOString()
        });
      
      if (insertError) {
        throw insertError;
      }
    } else {
      // Otherwise, increment the existing count
      const { error: updateError } = await supabase
        .from('credit_usage')
        .update({ 
          credits_used: data.credits_used + 1,
          last_updated: new Date().toISOString()
        })
        .eq('user_id', userId);
      
      if (updateError) {
        throw updateError;
      }
    }
    
    // Log the activity
    await logUserActivity(userId, 'credit_used', {
      timestamp: new Date().toISOString()
    });
    
    return true;
  } catch (error) {
    console.error('Error incrementing credit usage:', error);
    return false;
  }
};

/**
 * Gets the remaining credits for a user based on their subscription
 */
export const getRemainingCredits = async (userId: string, planId: string | null): Promise<number> => {
  // For free plan, return 0
  if (planId === 'free' || !planId) {
    return 0;
  }
  
  try {
    // Get credit limit from plan
    const creditLimit = PLAN_FEATURES[planId as keyof typeof PLAN_FEATURES]?.creditLimit || 0;
    
    // Get used credits
    const { data, error } = await supabase
      .from('credit_usage')
      .select('credits_used')
      .eq('user_id', userId)
      .maybeSingle();
    
    if (error) {
      throw error;
    }
    
    const creditsUsed = data?.credits_used || 0;
    
    // Calculate remaining
    return Math.max(creditLimit - creditsUsed, 0);
  } catch (error) {
    console.error('Error getting remaining credits:', error);
    return 0;
  }
};

/**
 * Checks if a feature is available in a user's subscription plan
 */
export const isFeatureEnabled = (feature: string, planFeatures: string[]): boolean => {
  return planFeatures.includes(feature);
};
