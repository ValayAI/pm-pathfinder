
import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { useAuth } from './AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { PLAN_FEATURES } from '@/utils/subscriptionManager';
import { cleanupUserSubscriptions } from '@/utils/subscriptionCleanup';

export type PlanType = 'free' | 'starter' | 'popular' | 'pro';

export interface SubscriptionData {
  planId: PlanType;
  messageLimit: number;
  features: string[];
  expiresAt: Date | null;
}

interface SubscriptionContextType {
  subscription: SubscriptionData | null;
  isLoading: boolean;
  hasFeature: (feature: string) => boolean;
  getRemainingMessages: () => number;
  isFeatureEnabled: (feature: string) => boolean;
  refreshSubscription: () => Promise<void>;
}

const defaultSubscription: SubscriptionData = {
  planId: 'free',
  messageLimit: 5,
  features: PLAN_FEATURES.free.features,
  expiresAt: null
};

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [messagesUsed, setMessagesUsed] = useState<number>(0);

  // Get user from auth context if available, otherwise null
  useEffect(() => {
    try {
      const authContext = useAuth();
      setUser(authContext.user);
    } catch (error) {
      console.warn("Auth context not available in SubscriptionProvider, defaulting to unauthenticated state");
      setUser(null);
    }
  }, []);

  const fetchSubscription = async () => {
    if (isLoading === false) setIsLoading(true);
    
    // If user is not authenticated, set the default subscription
    if (!user) {
      setSubscription(defaultSubscription);
      setIsLoading(false);
      return;
    }

    try {
      // First, clean up any duplicate active subscriptions
      // This ensures the user only has one active subscription
      await cleanupUserSubscriptions(user.id);
      
      // Use Promise.all to fetch both subscription and usage data in parallel
      const [subscriptionResponse, usageResponse] = await Promise.all([
        supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', user.id)
          .eq('active', true)
          .limit(1)
          .maybeSingle(),
          
        supabase
          .from('message_usage')
          .select('messages_used')
          .eq('user_id', user.id)
          .maybeSingle()
      ]);
      
      if (subscriptionResponse.error) {
        throw subscriptionResponse.error;
      }
      
      if (usageResponse.error) {
        throw usageResponse.error;
      }
      
      if (usageResponse.data) {
        setMessagesUsed(usageResponse.data.messages_used);
      } else {
        // Initialize message usage if not found
        try {
          await supabase
            .from('message_usage')
            .insert({
              user_id: user.id,
              messages_used: 0
            }).throwOnError();
          
          setMessagesUsed(0);
        } catch (error) {
          console.error("Failed to initialize message usage:", error);
        }
      }
      
      // If subscription found, use it
      if (subscriptionResponse.data) {
        const planId = subscriptionResponse.data.plan_id as PlanType;
        
        // Convert JSON features array to string array with fallback to plan features
        let featuresArray: string[] = [];
        if (subscriptionResponse.data.features) {
          // Safely typecast and filter to ensure only strings
          const jsonFeatures = subscriptionResponse.data.features as any;
          featuresArray = Array.isArray(jsonFeatures) 
            ? jsonFeatures.filter(item => typeof item === 'string').map(item => String(item))
            : PLAN_FEATURES[planId].features;
        } else {
          featuresArray = PLAN_FEATURES[planId].features;
        }
        
        // Create subscription data based on plan
        const subscriptionInfo: SubscriptionData = {
          planId: planId,
          messageLimit: subscriptionResponse.data.message_limit ?? (planId === 'starter' ? 50 : planId === 'free' ? 10 : Infinity),
          features: featuresArray,
          expiresAt: subscriptionResponse.data.expires_at ? new Date(subscriptionResponse.data.expires_at) : null
        };
        
        setSubscription(subscriptionInfo);
      } else {
        // No active subscriptions found - create default free subscription
        try {
          // If no active subscription found, create default free subscription in DB
          await Promise.all([
            supabase
              .from('subscriptions')
              .insert({
                user_id: user.id,
                plan_id: 'free',
                message_limit: 10,
                features: PLAN_FEATURES.free.features
              }),
              
            // Initialize message usage counter if not exists
            supabase
              .from('message_usage')
              .upsert({
                user_id: user.id,
                messages_used: 0
              }).throwOnError()
          ]);
        } catch (error) {
          console.error('Error creating default subscription data:', error);
        }
        
        setSubscription(defaultSubscription);
      }
    } catch (error) {
      console.error('Error fetching subscription:', error);
      toast.error('Failed to load subscription data');
      setSubscription(defaultSubscription);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchSubscription();
    } else {
      setSubscription(defaultSubscription);
      setIsLoading(false);
    }
  }, [user]);

  const refreshSubscription = async () => {
    await fetchSubscription();
  };

  const hasFeature = (feature: string): boolean => {
    if (!subscription) return false;
    return subscription.features.includes(feature);
  };

  const getRemainingMessages = (): number => {
    if (!user) return 0; // No messages for non-authenticated users
    if (!subscription) return 0;
    
    // For unlimited plans, return Infinity
    if (subscription.planId === 'popular' || subscription.planId === 'pro') {
      return Infinity;
    }
    
    // For limited plans, calculate remaining based on usage from DB
    return Math.max(subscription.messageLimit - messagesUsed, 0);
  };

  const isFeatureEnabled = (feature: string): boolean => {
    if (!user) return false; // No features for non-authenticated users
    if (!subscription) return false;
    
    // Check if the feature is included in the user's plan
    return hasFeature(feature);
  };

  const contextValue = useMemo(() => ({
    subscription,
    isLoading,
    hasFeature,
    getRemainingMessages,
    isFeatureEnabled,
    refreshSubscription
  }), [subscription, isLoading, messagesUsed, user]);

  return (
    <SubscriptionContext.Provider value={contextValue}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};
