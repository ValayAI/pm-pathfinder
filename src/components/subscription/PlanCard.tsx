
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import StripeCheckout from "../StripeCheckout";

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
  buttonVariant: "outline" | "default";
}

interface PlanCardProps {
  plan: PlanType;
  onPlanSuccess: (planId: string) => void;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, onPlanSuccess }) => {
  const { id, name, description, price, period, icon: Icon, priceId, features, highlight, color, borderColor, buttonVariant } = plan;

  return (
    <Card 
      className={cn(
        "border-2 transition-all duration-200 hover:shadow-md", 
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
            highlight ? "text-purple-600 dark:text-purple-400" : "text-muted-foreground"
          )} />
          {highlight && (
            <span className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                <path d="M6 12l6 6 6-6"/>
              </svg>
              Best Value
            </span>
          )}
        </div>
        <CardTitle className="text-lg">{name}</CardTitle>
        <CardDescription className="text-sm">({description})</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
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
        <StripeCheckout 
          planId={id}
          planName={name}
          priceId={priceId}
          variant={buttonVariant}
          highlight={highlight}
          onSuccess={() => onPlanSuccess(id)}
        />
      </CardFooter>
    </Card>
  );
};

export default PlanCard;
