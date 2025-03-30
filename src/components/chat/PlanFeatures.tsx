
import React from 'react';

interface PlanFeaturesProps {
  planId?: string;
}

const PlanFeatures: React.FC<PlanFeaturesProps> = ({ planId }) => {
  if (planId === 'free') {
    return (
      <div className="px-1 py-2 text-center text-xs text-muted-foreground">
        <span className="py-1 px-2 bg-gray-100 dark:bg-gray-800 rounded-full">
          Free plan: 5 messages limit
        </span>
      </div>
    );
  }
  
  if (planId === 'starter') {
    return (
      <div className="px-1 py-2 text-center text-xs text-muted-foreground">
        <span className="py-1 px-2 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 rounded-full">
          Starter plan: 50 messages/month
        </span>
      </div>
    );
  }
  
  if (planId === 'popular') {
    return (
      <div className="px-1 py-2 text-center text-xs text-muted-foreground">
        <span className="py-1 px-2 bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-400 rounded-full">
          Premium plan: Unlimited coaching sessions
        </span>
      </div>
    );
  }
  
  if (planId === 'pro') {
    return (
      <div className="px-1 py-2 text-center text-xs text-muted-foreground">
        <span className="py-1 px-2 bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 rounded-full">
          Pro plan: Unlimited coaching + 1-on-1 call
        </span>
      </div>
    );
  }
  
  return null;
};

export default PlanFeatures;
