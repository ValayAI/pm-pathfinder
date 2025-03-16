
import React from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Rocket, 
  Flame, 
  Briefcase, 
  CheckCircle2, 
  Lock, 
  LockOpen,
  CreditCard,
  DollarSign,
  ThumbsUp 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PaywallModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpgrade: (plan: string) => void;
  onLogin: () => void;
}

const PaywallModal = ({ open, onOpenChange, onUpgrade, onLogin }: PaywallModalProps) => {
  const plans = [
    {
      id: "starter",
      name: "Starter",
      description: "Basic",
      price: "$29",
      period: "/month",
      icon: Rocket,
      features: [
        "50 messages/month",
        "PM career & interview tips"
      ],
      highlight: false,
      color: "bg-blue-50 dark:bg-blue-950",
      borderColor: "border-blue-200 dark:border-blue-800",
      buttonVariant: "outline" as const
    },
    {
      id: "popular",
      name: "Most Popular",
      description: "Best Value",
      price: "$99",
      period: " one-time",
      icon: Flame,
      features: [
        "Unlimited messages",
        "Resume & interview coaching",
        "Frameworks & strategy guides",
        "Exclusive PM resources"
      ],
      highlight: true,
      color: "bg-purple-50 dark:bg-purple-950",
      borderColor: "border-purple-300 dark:border-purple-800",
      buttonVariant: "default" as const
    },
    {
      id: "pro",
      name: "Pro Coaching",
      description: "Premium",
      price: "$249",
      period: " one-time",
      icon: Briefcase,
      features: [
        "Everything in Most Popular",
        "1-on-1 PM coaching call",
        "Personalized resume review"
      ],
      highlight: false,
      color: "bg-amber-50 dark:bg-amber-950",
      borderColor: "border-amber-200 dark:border-amber-800",
      buttonVariant: "outline" as const
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <div className="w-full flex justify-center -mt-2 mb-2">
            <Badge variant="outline" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 border-purple-300 dark:border-purple-700 px-3 py-1">
              <Lock className="h-3.5 w-3.5 mr-1" />
              Upgrade Required
            </Badge>
          </div>
          <DialogTitle className="text-2xl text-center">
            You've Reached Your Free Limit!
          </DialogTitle>
          <DialogDescription className="text-center max-w-md mx-auto pt-2">
            You've used 10 free messages – want expert Product Management advice without limits? Choose the plan that fits your needs:
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 py-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <Card 
                key={plan.id}
                className={cn(
                  "border-2 transition-all duration-200 hover:shadow-md", 
                  plan.highlight ? "border-purple-400 dark:border-purple-600 shadow-md" : plan.borderColor,
                  plan.color
                )}
              >
                <CardHeader className={cn(
                  "pb-2",
                  plan.highlight && "pb-4"
                )}>
                  <div className="flex justify-between items-center mb-1">
                    <plan.icon className={cn(
                      "h-5 w-5",
                      plan.highlight ? "text-purple-600 dark:text-purple-400" : "text-muted-foreground"
                    )} />
                    {plan.highlight && (
                      <Badge className="bg-purple-600 hover:bg-purple-700">
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        Best Value
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">{plan.name}</CardTitle>
                  <CardDescription className="text-sm">({plan.description})</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-baseline mb-4">
                    <span className="text-2xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground text-sm ml-1">{plan.period}</span>
                  </div>
                  <ul className="space-y-2 min-h-[160px]">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex">
                        <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className={cn(
                      "w-full", 
                      plan.highlight ? "bg-purple-600 hover:bg-purple-700" : ""
                    )} 
                    variant={plan.buttonVariant}
                    onClick={() => onUpgrade(plan.id)}
                  >
                    {plan.highlight ? (
                      <>
                        <DollarSign className="h-4 w-4 mr-1" />
                        Choose Plan
                      </>
                    ) : (
                      "Select Plan"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800">
            <LockOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <AlertTitle>Already purchased?</AlertTitle>
            <AlertDescription className="flex justify-between items-center">
              <span>Log in to access your unlimited coaching</span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onLogin}
                className="mt-2 sm:mt-0"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Log in
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaywallModal;
