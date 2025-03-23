
import React from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Lock } from "lucide-react";
import PlanCard from "./subscription/PlanCard";
import LoginPrompt from "./subscription/LoginPrompt";
import { subscriptionPlans } from "@/data/subscriptionPlans";
import { updateSubscription } from "@/utils/subscriptionUtils";

interface PaywallModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpgrade: (plan: string) => void;
  onLogin: () => void;
  requiredFeature?: string;
}

const PaywallModal = ({ open, onOpenChange, onUpgrade, onLogin, requiredFeature }: PaywallModalProps) => {
  const handlePlanSuccess = (planId: string) => {
    // Update the user's subscription
    updateSubscription(planId);
    
    // Call the parent component's onUpgrade callback
    onUpgrade(planId);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <div className="w-full flex justify-center -mt-2 mb-2">
            <Badge variant="outline" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 border-purple-300 dark:border-purple-700 px-3 py-1">
              <Lock className="h-3.5 w-3.5 mr-1" />
              {requiredFeature ? 'Feature Upgrade Required' : 'Upgrade Required'}
            </Badge>
          </div>
          <DialogTitle className="text-2xl text-center">
            {requiredFeature 
              ? `Upgrade to Access ${requiredFeature}` 
              : "You've Reached Your Free Limit!"}
          </DialogTitle>
          <DialogDescription className="text-center max-w-md mx-auto pt-2">
            {requiredFeature 
              ? `This feature requires a premium subscription. Choose a plan to unlock ${requiredFeature} and more:` 
              : "You've used 10 free messages – want expert Product Management advice without limits? Choose the plan that fits your needs:"}
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 py-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {subscriptionPlans.map((plan) => (
              <PlanCard 
                key={plan.id} 
                plan={plan} 
                onPlanSuccess={handlePlanSuccess} 
              />
            ))}
          </div>

          <LoginPrompt onLogin={onLogin} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaywallModal;
