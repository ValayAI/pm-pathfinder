
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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
  messageLimit: 10,
  features: ['Basic chat access', 'Limited messages'],
  expiresAt: null
};

const planFeatures = {
  free: ['Basic chat access', 'Limited messages'],
  starter: ['50 messages/month', 'PM career & interview tips'],
  popular: [
    'Unlimited messages',
    'Resume & interview coaching',
    'Frameworks & strategy guides',
    'Exclusive PM resources'
  ],
  pro: [
    'Unlimited messages',
    'Resume & interview coaching',
    'Frameworks & strategy guides',
    'Exclusive PM resources',
    '1-on-1 PM coaching call',
    'Personalized resume review'
  ]
};

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [messagesUsed, setMessagesUsed] = useState<number>(0);

  const fetchSubscription = async () => {
    setIsLoading(true);
    
    // If user is not authenticated, set the default subscription
    if (!user) {
      setSubscription(defaultSubscription);
      setIsLoading(false);
      return;
    }

    try {
      // Fetch the user's subscription from Supabase
      const { data: subscriptionData, error: subscriptionError } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .eq('active', true)
        .maybeSingle();
      
      if (subscriptionError) {
        throw subscriptionError;
      }
      
      // Fetch message usage
      const { data: usageData, error: usageError } = await supabase
        .from('message_usage')
        .select('messages_used')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (usageError) {
        throw usageError;
      }
      
      if (usageData) {
        setMessagesUsed(usageData.messages_used);
      }
      
      // If subscription found, use it
      if (subscriptionData) {
        const planId = subscriptionData.plan_id as PlanType;
        
        // Convert JSON features array to string array with fallback to plan features
        let featuresArray: string[] = [];
        if (subscriptionData.features) {
          // Safely typecast and filter to ensure only strings
          const jsonFeatures = subscriptionData.features as any;
          featuresArray = Array.isArray(jsonFeatures) 
            ? jsonFeatures.filter(item => typeof item === 'string').map(item => String(item))
            : planFeatures[planId];
        } else {
          featuresArray = planFeatures[planId];
        }
        
        // Create subscription data based on plan
        const subscriptionInfo: SubscriptionData = {
          planId: planId,
          messageLimit: subscriptionData.message_limit ?? (planId === 'starter' ? 50 : planId === 'free' ? 10 : Infinity),
          features: featuresArray,
          expiresAt: subscriptionData.expires_at ? new Date(subscriptionData.expires_at) : null
        };
        
        setSubscription(subscriptionInfo);
        console.log(`User subscription loaded from DB: ${planId}`);
      } else {
        // If no active subscription found, create default free subscription in DB
        const { error: insertError } = await supabase
          .from('subscriptions')
          .insert({
            user_id: user.id,
            plan_id: 'free',
            message_limit: 10,
            features: planFeatures.free
          });
        
        if (insertError) {
          console.error('Error creating default subscription:', insertError);
        }
        
        // Initialize message usage counter if not exists
        const { error: msgUsageError } = await supabase
          .from('message_usage')
          .insert({
            user_id: user.id,
            messages_used: 0
          });
        
        if (msgUsageError && msgUsageError.code !== '23505') { // Ignore duplicate key errors
          console.error('Error initializing message usage:', msgUsageError);
        }
        
        setSubscription(defaultSubscription);
        console.log('No subscription found, created free plan');
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
    fetchSubscription();
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

  const value = {
    subscription,
    isLoading,
    hasFeature,
    getRemainingMessages,
    isFeatureEnabled,
    refreshSubscription
  };

  return (
    <SubscriptionContext.Provider value={value}>
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
