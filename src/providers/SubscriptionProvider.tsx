
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';
import { supabase } from '@/lib/supabase';
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
}

const defaultSubscription: SubscriptionData = {
  planId: 'free',
  messageLimit: 10,
  features: ['50 messages/month', 'PM career & interview tips'],
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

  useEffect(() => {
    const fetchSubscription = async () => {
      setIsLoading(true);
      
      // If user is not authenticated, set the default subscription
      if (!user) {
        setSubscription(defaultSubscription);
        setIsLoading(false);
        return;
      }

      try {
        // Fetch the user's subscription from localStorage first (temporary solution)
        // In a real application, this would come from a database
        const storedPlan = localStorage.getItem('userSubscription');
        
        if (storedPlan) {
          const planId = JSON.parse(storedPlan) as PlanType;
          
          // Create subscription data based on plan
          const subscriptionData: SubscriptionData = {
            planId: planId,
            messageLimit: planId === 'starter' ? 50 : planId === 'free' ? 10 : Infinity,
            features: planFeatures[planId],
            expiresAt: planId === 'starter' ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) : null // 30 days for starter
          };
          
          setSubscription(subscriptionData);
          console.log(`User subscription loaded: ${planId}`);
        } else {
          // If no subscription found, set the default free plan
          setSubscription(defaultSubscription);
          console.log('No subscription found, using free plan');
        }
      } catch (error) {
        console.error('Error fetching subscription:', error);
        toast.error('Failed to load subscription data');
        setSubscription(defaultSubscription);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscription();
  }, [user]);

  const hasFeature = (feature: string): boolean => {
    if (!subscription) return false;
    return subscription.features.includes(feature);
  };

  const getRemainingMessages = (): number => {
    if (!subscription) return 0;
    
    // For unlimited plans, return Infinity
    if (subscription.planId === 'popular' || subscription.planId === 'pro') {
      return Infinity;
    }
    
    // For limited plans, we would normally calculate remaining messages
    // based on usage data from the database
    const usedMessages = parseInt(localStorage.getItem('usedMessages') || '0');
    return Math.max(subscription.messageLimit - usedMessages, 0);
  };

  const isFeatureEnabled = (feature: string): boolean => {
    if (!subscription) return false;
    
    // Check if the feature is included in the user's plan
    return hasFeature(feature);
  };

  const value = {
    subscription,
    isLoading,
    hasFeature,
    getRemainingMessages,
    isFeatureEnabled
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
