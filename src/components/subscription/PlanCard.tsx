
import React from "react";
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ThumbsUp, DollarSign, Gift } from "lucide-react";
import { cn } from "@/lib/utils";
import StripeCheckout from "../StripeCheckout";
import { Button } from "@/components/ui/button";
import { User } from "@supabase/supabase-js";

export type PlanType = {
  id: string;
  name: string;
  description: string;
  price: string;
  period: string;
  icon: React.ElementType;
  priceId: string;
  features: string[];
  highlight: boolean;
  color: string;
  borderColor: string;
  buttonText?: string; 
  buttonVariant: "outline" | "default";
}

interface PlanCardProps {
  plan: PlanType;
  onPlanSuccess: (planId: string) => void;
  isCurrentPlan?: boolean;
  isDisabled?: boolean;
  user: User | null;
  location: any;
}

const PlanCard: React.FC<PlanCardProps> = ({ 
  plan, 
  onPlanSuccess, 
  isCurrentPlan = false,
  isDisabled = false,
  user,
  location
}) => {
  const navigate = useNavigate();
  const { id, name, description, price, period, icon: Icon, priceId, features, highlight, color, borderColor, buttonVariant, buttonText } = plan;

  const getButtonText = () => {
    if (isCurrentPlan) return "Current Plan";
    if (isDisabled) return "Already Included";
    return buttonText || (highlight ? "Choose Plan" : "Select Plan");
  };

  // Check if any features contain "Bonus" text
  const hasBonusFeature = features.some(feature => feature.includes("Bonus"));

  return (
    <Card 
      className={cn(
        "border-2 transition-all duration-200 hover:shadow-md", 
        isCurrentPlan ? "border-green-400 dark:border-green-600 shadow-md" : 
          highlight ? "border-purple-400 dark:border-purple-600 shadow-md" : borderColor,
        color
      )}
    >
      <CardHeader className={cn(
        "pb-2",
        highlight && "pb-4"
      )}>
        <div className="flex justify-between items-center mb-1">
          <Icon className={cn(
            "h-5 w-5",
            isCurrentPlan ? "text-green-600 dark:text-green-400" :
              highlight ? "text-purple-600 dark:text-purple-400" : "text-muted-foreground"
          )} />
          {isCurrentPlan ? (
            <Badge className="bg-green-600 hover:bg-green-700">
              Current Plan
            </Badge>
          ) : highlight && !isCurrentPlan && (
            <Badge className="bg-purple-600 hover:bg-purple-700">
              <ThumbsUp className="h-3 w-3 mr-1" />
              Best Value
            </Badge>
          )}
        </div>
        <CardTitle className="text-lg">{name}</CardTitle>
        <CardDescription className="text-sm">({description})</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        {/* Show bonus credits highlight if applicable */}
        {hasBonusFeature && (
          <div className="mb-2 p-1.5 bg-amber-50 border border-amber-200 rounded-md flex items-center dark:bg-amber-900/30 dark:border-amber-700/50">
            <Gift className="h-4 w-4 text-amber-500 mr-1.5 flex-shrink-0" />
            <span className="text-sm font-medium text-amber-700 dark:text-amber-300">Bonus Credits Included!</span>
          </div>
        )}
        <div className="flex items-baseline mb-4">
          <span className="text-2xl font-bold">{price}</span>
          <span className="text-muted-foreground text-sm ml-1">{period}</span>
        </div>
        <ul className="space-y-2 min-h-[160px]">
          {features.map((feature, idx) => (
            <li key={idx} className="flex">
              <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        {isDisabled ? (
          <Button 
            variant={isCurrentPlan ? "default" : "outline"}
            className={isCurrentPlan ? "bg-green-600 hover:bg-green-700 cursor-default w-full" : "w-full"}
            disabled
          >
            {getButtonText()}
          </Button>
        ) : !user ? (
          <Button 
            variant={buttonVariant}
            onClick={() => navigate('/signin', { state: { from: location, planId: id } })}
            className="w-full"
          >
            Sign in to Subscribe
          </Button>
        ) : (
          <StripeCheckout 
            planId={id}
            planName={name}
            priceId={priceId}
            buttonText={getButtonText()}
            variant={buttonVariant}
            highlight={highlight}
            onSuccess={() => onPlanSuccess(id)}
            className="w-full"
          />
        )}
      </CardFooter>
    </Card>
  );
};

export default PlanCard;
