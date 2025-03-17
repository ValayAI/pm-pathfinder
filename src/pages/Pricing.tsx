
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Rocket, 
  Flame, 
  Briefcase, 
  CheckCircle2, 
  LockOpen,
  CreditCard,
  DollarSign,
  ThumbsUp 
} from "lucide-react";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StripeCheckout from "@/components/StripeCheckout";
import { toast } from "sonner";

const Pricing = () => {
  const plans = [
    {
      id: "starter",
      name: "Starter",
      description: "Basic",
      price: "$29",
      period: "/month",
      icon: Rocket,
      priceId: "price_1NhJHtK225E53DUItest001", // Updated test price ID
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
      priceId: "price_1NhJHGK225E53DUItest002", // Updated test price ID
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
      priceId: "price_1NhJIkK225E53DUItest003", // Updated test price ID
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

  const handlePlanSuccess = (planId: string) => {
    toast.success("Upgrade successful!", {
      description: `You've successfully subscribed to the ${planId} plan.`,
    });
  };

  const handleLogin = () => {
    toast.success("Login successful", {
      description: "Welcome back! You now have full access.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 border-purple-300 dark:border-purple-700 px-3 py-1">
            <DollarSign className="h-3.5 w-3.5 mr-1" />
            Pricing Plans
          </Badge>
          <h1 className="text-3xl font-bold mb-4">Choose Your Perfect Plan</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Get expert Product Management advice tailored to your career goals. 
            Select the plan that best fits your needs and ambitions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
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
                <StripeCheckout 
                  planId={plan.id}
                  planName={plan.name}
                  priceId={plan.priceId}
                  variant={plan.buttonVariant}
                  highlight={plan.highlight}
                  onSuccess={() => handlePlanSuccess(plan.id)}
                />
              </CardFooter>
            </Card>
          ))}
        </div>

        <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800 max-w-3xl mx-auto">
          <LockOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <AlertTitle>Already purchased?</AlertTitle>
          <AlertDescription className="flex justify-between items-center">
            <span>Log in to access your unlimited coaching</span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogin}
              className="mt-2 sm:mt-0"
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Log in
            </Button>
          </AlertDescription>
        </Alert>
      </div>
      <Footer />
    </div>
  );
};

export default Pricing;
