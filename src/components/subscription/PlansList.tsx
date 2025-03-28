
import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { subscriptionPlans } from '@/data/subscriptionPlans';
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import PlanCard from "./PlanCard";
import { useAuth } from "@/providers/AuthProvider";
import { useSubscription } from "@/providers/SubscriptionProvider";
import { toast } from "sonner";
import { useActivity } from '@/hooks/useActivity';

interface PlansListProps {
  showHeader?: boolean;
  compact?: boolean;
}

const PlansList: React.FC<PlansListProps> = ({ 
  showHeader = true, 
  compact = false 
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { subscription } = useSubscription();
  const { trackFeatureUsage } = useActivity();
  
  const requiredFeature = location.state?.requiredFeature;
  
  const handlePlanSuccess = (planId: string) => {
    trackFeatureUsage('plan_purchase_success', { planId });
    
    if (user) {
      if (location.state?.from) {
        navigate(location.state.from.pathname);
      }
    }
  };

  return (
    <>
      {showHeader && (
        <div className="text-center mb-12">
          <div className="title-badge bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
            <span>Pricing Plans</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">Choose Your Perfect Plan</h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Get expert Product Management advice tailored to your career goals. 
            Select the plan that best fits your needs and ambitions.
          </p>
          
          {requiredFeature && user && (
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md max-w-lg mx-auto">
              <p className="text-amber-700">
                Upgrade your plan to access the <strong>{requiredFeature}</strong> feature.
              </p>
            </div>
          )}
          
          {requiredFeature && !user && (
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md max-w-lg mx-auto">
              <p className="text-amber-700">
                Please <Button variant="link" className="p-0 h-auto" onClick={() => navigate('/signin')}>sign in</Button> to access the <strong>{requiredFeature}</strong> feature.
              </p>
            </div>
          )}
          
          {subscription && subscription.planId !== 'free' && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md max-w-lg mx-auto">
              <p className="text-green-700">
                You're currently on the <strong>{subscription.planId}</strong> plan.
              </p>
            </div>
          )}
          
          <div className="mt-5 flex items-center justify-center">
            <Leaf className="h-5 w-5 text-green-500 mr-2" />
            <p className="font-eco text-green-600 dark:text-green-400">
              1% of your purchase goes to removing CO₂ from the atmosphere
            </p>
          </div>
        </div>
      )}

      <div className={`grid grid-cols-1 ${compact ? 'md:grid-cols-3 gap-4' : 'md:grid-cols-3 gap-6'} max-w-5xl mx-auto mb-12`}>
        {subscriptionPlans.map((plan) => {
          const isCurrentPlan = subscription?.planId === plan.id;
          const isDisabled = (user && isCurrentPlan) || 
            (user && plan.id === 'popular' && subscription?.planId === 'pro') || 
            (user && plan.id === 'starter' && (subscription?.planId === 'popular' || subscription?.planId === 'pro'));
          
          return (
            <div 
              key={plan.id}
              className={compact ? 'scale-[0.9] transform origin-top' : ''}
            >
              <PlanCard 
                plan={{
                  ...plan,
                  highlight: plan.highlight || isCurrentPlan
                }}
                onPlanSuccess={handlePlanSuccess}
                isCurrentPlan={isCurrentPlan}
                isDisabled={isDisabled}
                user={user}
                location={location}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PlansList;
