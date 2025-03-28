
import { useActivity } from '@/hooks/useActivity';
import { useEffect } from 'react';

interface PlanFeaturesProps {
  planId?: string;
}

const PlanFeatures = ({ planId }: PlanFeaturesProps) => {
  const { trackFeatureUsage } = useActivity();
  
  useEffect(() => {
    // Track that the user viewed this component
    trackFeatureUsage('view_plan_features', { planId });
  }, [planId, trackFeatureUsage]);
  
  const getPlanFeatureMessage = () => {
    switch (planId) {
      case 'pro':
        return "Pro plan features: Unlimited messages, coaching calls, resume review & all resources";
      case 'popular':
        return "Popular plan features: Unlimited messages, frameworks & all PM resources";
      case 'starter':
        return "Starter plan features: 50 messages/month & career tips";
      default:
        return "Free plan: 10 messages limit";
    }
  };

  return (
    <div className="text-center mt-4 mb-6">
      <div className="inline-block px-3 py-1 rounded-md text-xs bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
        {getPlanFeatureMessage()}
      </div>
    </div>
  );
};

export default PlanFeatures;
