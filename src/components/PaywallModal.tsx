
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
import { useAuth } from '@/providers/AuthProvider';
import { useSubscription } from '@/providers/SubscriptionProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import { subscriptionPlans } from '@/data/subscriptionPlans';
import PlanCard from '@/components/subscription/PlanCard';
import LoginPrompt from '@/components/subscription/LoginPrompt';
import { useActivity } from '@/hooks/useActivity';

interface PaywallModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpgrade: (planId: string) => void;
  onLogin: () => void;
  requiredFeature?: string;
}

const PaywallModal: React.FC<PaywallModalProps> = ({ 
  open, 
  onOpenChange, 
  onUpgrade, 
  onLogin,
  requiredFeature
}) => {
  const { user } = useAuth();
  const { trackFeatureUsage } = useActivity();
  const location = useLocation();

  const handlePlanSelect = (planId: string) => {
    if (requiredFeature) {
      trackFeatureUsage('selected_plan_for_feature', {
        planId,
        requiredFeature,
      });
    }
    onOpenChange(false);
    onUpgrade(planId);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {requiredFeature ? `Unlock ${requiredFeature}` : "Upgrade your plan"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {requiredFeature ?
              `To use ${requiredFeature}, you need to upgrade your plan.`
              : "Choose a plan to access premium features and unlimited coaching."
            }
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="pb-4">
          {!user ? (
            <LoginPrompt onLogin={onLogin} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {subscriptionPlans.map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  user={user}
                  location={null}
                  onPlanSuccess={(planId) => handlePlanSelect(planId)}
                />
              ))}
            </div>
          )}
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PaywallModal;
