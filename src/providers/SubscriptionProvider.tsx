
import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { useAuth } from './AuthProvider';
import { supabase, cachedSupabase } from '@/lib/supabase';
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

const SUBSCRIPTION_CACHE_KEY = 'user_subscription';
const MESSAGE_USAGE_CACHE_KEY = 'user_message_usage';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [messagesUsed, setMessagesUsed] = useState<number>(0);
  const [lastFetchTime, setLastFetchTime] = useState<number>(0);

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

  const fetchSubscription = async (forceRefresh = false) => {
    if (isLoading === false) setIsLoading(true);
    
    // If user is not authenticated, set the default subscription
    if (!user) {
      setSubscription(defaultSubscription);
      setIsLoading(false);
      return;
    }

    try {
      // Check if we should use cached data (unless force refresh is requested)
      const now = Date.now();
      if (!forceRefresh && (now - lastFetchTime < CACHE_DURATION)) {
        console.log('Using cached subscription data');
        setIsLoading(false);
        return;
      }
      
      // First, clean up any duplicate active subscriptions
      // This ensures the user only has one active subscription
      await cleanupUserSubscriptions(user.id);
      
      // Use Promise.all to fetch both subscription and usage data in parallel
      // And use cached queries where possible to reduce DB load
      const [subscriptionResponse, usageResponse] = await Promise.all([
        cachedSupabase.cachedSelect(
          'subscriptions',
          '*',
          `${SUBSCRIPTION_CACHE_KEY}_${user.id}`,
          CACHE_DURATION
        ).then(result => {
          if (result.error) throw result.error;
          return result.data.filter(sub => sub.user_id === user.id && sub.active)[0] || null;
        }),
          
        cachedSupabase.cachedSelect(
          'message_usage',
          'messages_used',
          `${MESSAGE_USAGE_CACHE_KEY}_${user.id}`,
          CACHE_DURATION
        ).then(result => {
          if (result.error) throw result.error;
          return result.data.filter(usage => usage.user_id === user.id)[0] || null;
        })
      ]);
      
      if (usageResponse) {
        setMessagesUsed(usageResponse.messages_used);
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
          // Clear the message usage cache since we've updated it
          cachedSupabase.clearCache(`${MESSAGE_USAGE_CACHE_KEY}_${user.id}`);
        } catch (error) {
          console.error("Failed to initialize message usage:", error);
        }
      }
      
      // If subscription found, use it
      if (subscriptionResponse) {
        const planId = subscriptionResponse.plan_id as PlanType;
        
        // Convert JSON features array to string array with fallback to plan features
        let featuresArray: string[] = [];
        if (subscriptionResponse.features) {
          // Safely typecast and filter to ensure only strings
          const jsonFeatures = subscriptionResponse.features as any;
          featuresArray = Array.isArray(jsonFeatures) 
            ? jsonFeatures.filter(item => typeof item === 'string').map(item => String(item))
            : PLAN_FEATURES[planId].features;
        } else {
          featuresArray = PLAN_FEATURES[planId].features;
        }
        
        // Create subscription data based on plan
        const subscriptionInfo: SubscriptionData = {
          planId: planId,
          messageLimit: subscriptionResponse.message_limit ?? (planId === 'starter' ? 50 : planId === 'free' ? 10 : Infinity),
          features: featuresArray,
          expiresAt: subscriptionResponse.expires_at ? new Date(subscriptionResponse.expires_at) : null
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
          
          // Clear caches since we've updated these tables
          cachedSupabase.clearCache(`${SUBSCRIPTION_CACHE_KEY}_${user.id}`);
          cachedSupabase.clearCache(`${MESSAGE_USAGE_CACHE_KEY}_${user.id}`);
        } catch (error) {
          console.error('Error creating default subscription data:', error);
        }
        
        setSubscription(defaultSubscription);
      }
      
      // Update the last fetch time
      setLastFetchTime(now);
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
    // Force refresh by ignoring cache
    await fetchSubscription(true);
  };

  // Use memoized values for these functions to prevent unnecessary re-renders
  const hasFeature = useCallback((feature: string): boolean => {
    if (!subscription) return false;
    return subscription.features.includes(feature);
  }, [subscription]);

  const getRemainingMessages = useCallback((): number => {
    if (!user) return 0; // No messages for non-authenticated users
    if (!subscription) return 0;
    
    // For unlimited plans, return Infinity
    if (subscription.planId === 'popular' || subscription.planId === 'pro') {
      return Infinity;
    }
    
    // For limited plans, calculate remaining based on usage from DB
    return Math.max(subscription.messageLimit - messagesUsed, 0);
  }, [user, subscription, messagesUsed]);

  const isFeatureEnabled = useCallback((feature: string): boolean => {
    if (!user) return false; // No features for non-authenticated users
    if (!subscription) return false;
    
    // Check if the feature is included in the user's plan
    return hasFeature(feature);
  }, [user, subscription, hasFeature]);

  const contextValue = useMemo(() => ({
    subscription,
    isLoading,
    hasFeature,
    getRemainingMessages,
    isFeatureEnabled,
    refreshSubscription
  }), [subscription, isLoading, hasFeature, getRemainingMessages, isFeatureEnabled, refreshSubscription]);

  return (
    <SubscriptionContext.Provider value={contextValue}>
      {children}
    </SubscriptionContext.Provider>
  );
};

// Add useCallback for optimal performance
const useCallback = React.useCallback;

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};
