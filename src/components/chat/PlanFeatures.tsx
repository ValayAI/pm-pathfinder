
import { useActivity } from '@/hooks/useActivity';
import { useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Star, Zap } from 'lucide-react';

interface PlanFeaturesProps {
  planId?: string;
}

const PlanFeatures = ({ planId }: PlanFeaturesProps) => {
  const { trackFeatureUsage } = useActivity();
  
  useEffect(() => {
    // Track that the user viewed this component
    trackFeatureUsage('view_plan_features', { planId });
  }, [planId, trackFeatureUsage]);
  
  const getPlanIcon = () => {
    switch (planId) {
      case 'pro':
        return <Sparkles className="h-4 w-4 mr-1.5 text-amber-500" />;
      case 'popular':
        return <Star className="h-4 w-4 mr-1.5 text-purple-500" />;
      case 'starter':
        return <Zap className="h-4 w-4 mr-1.5 text-blue-500" />;
      default:
        return null;
    }
  };

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

  const getBadgeColor = () => {
    switch (planId) {
      case 'pro':
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 hover:bg-amber-200";
      case 'popular':
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 hover:bg-purple-200";
      case 'starter':
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  return (
    <div className="text-center mt-4 mb-6">
      <Badge 
        variant="outline" 
        className={`inline-flex items-center px-3 py-1 rounded-md text-xs ${getBadgeColor()} transition-colors border-0`}
      >
        {getPlanIcon()}
        {getPlanFeatureMessage()}
      </Badge>
    </div>
  );
};

export default PlanFeatures;
