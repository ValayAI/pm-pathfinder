import React, { useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
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
  ThumbsUp,
  Leaf
} from "lucide-react";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StripeCheckout from "@/components/StripeCheckout";
import { toast } from "sonner";
import { useAuth } from "@/providers/AuthProvider";
import { useSubscription } from "@/providers/SubscriptionProvider";
import { updateSubscription } from "@/utils/subscriptionUtils";

const Pricing = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { subscription } = useSubscription();
  
  // Extract any required feature from location state (passed from protected routes)
  const requiredFeature = location.state?.requiredFeature;
  
  useEffect(() => {
    // Show toast if user was redirected here due to required feature
    if (requiredFeature && user) {
      toast.info(`Upgrade required`, {
        description: `The "${requiredFeature}" feature requires a subscription upgrade.`,
      });
    } else if (requiredFeature && !user) {
      // If user is not logged in but was redirected for a required feature
      toast.info(`Sign in required`, {
        description: `Please sign in to access the "${requiredFeature}" feature.`,
      });
    }
  }, [requiredFeature, user]);

  const plans = [
    {
      id: "starter",
      name: "Starter",
      description: "Basic",
      price: "$29",
      period: "/month",
      icon: Rocket,
      priceId: "prod_RxEyhiWdXOWnUk", // Updated product ID for starter plan
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
      priceId: "prod_Rxhow56qBX4uRZ", // Updated product ID for popular plan
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
      priceId: "prod_Rxhqlof4dblRZT", // Updated product ID for pro plan
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
    if (user) {
      updateSubscription(planId);
      
      // If the user was redirected here from another page, navigate back
      if (location.state?.from) {
        navigate(location.state.from.pathname);
      }
    }
  };

  const handleLogin = () => {
    if (!user) {
      navigate('/signin');
    } else {
      toast.success("Already logged in", {
        description: `You're currently on the ${subscription?.planId || 'free'} plan.`,
      });
    }
  };

  // Determine button text based on current subscription and login status
  const getButtonText = (planId: string) => {
    if (!user) return "Sign in to Subscribe";
    
    if (!subscription) return "Select Plan";
    
    if (subscription.planId === planId) {
      return "Current Plan";
    } else if (
      (planId === 'popular' && subscription.planId === 'pro') || 
      (planId === 'starter' && (subscription.planId === 'popular' || subscription.planId === 'pro'))
    ) {
      return "Downgrade";
    } else {
      return "Upgrade Plan";
    }
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
          
          {/* Sustainability message */}
          <div className="mt-5 flex items-center justify-center">
            <Leaf className="h-5 w-5 text-green-500 mr-2" />
            <p className="font-eco text-green-600 dark:text-green-400">
              1% of your purchase goes to removing CO₂ from the atmosphere
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {plans.map((plan) => {
            const isCurrentPlan = subscription?.planId === plan.id;
            const isDisabled = (user && isCurrentPlan) || 
              (user && plan.id === 'popular' && subscription?.planId === 'pro') || 
              (user && plan.id === 'starter' && (subscription?.planId === 'popular' || subscription?.planId === 'pro'));
            
            return (
              <Card 
                key={plan.id}
                className={cn(
                  "border-2 transition-all duration-200 hover:shadow-md", 
                  isCurrentPlan ? "border-green-400 dark:border-green-600 shadow-md" : 
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
                      isCurrentPlan ? "text-green-600 dark:text-green-400" :
                        plan.highlight ? "text-purple-600 dark:text-purple-400" : "text-muted-foreground"
                    )} />
                    {isCurrentPlan ? (
                      <Badge className="bg-green-600 hover:bg-green-700">
                        Current Plan
                      </Badge>
                    ) : plan.highlight && (
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
                  {isDisabled ? (
                    <Button 
                      variant={isCurrentPlan ? "default" : "outline"}
                      className={isCurrentPlan ? "bg-green-600 hover:bg-green-700 cursor-default" : ""}
                      disabled
                    >
                      {isCurrentPlan ? "Current Plan" : "Already Included"}
                    </Button>
                  ) : !user ? (
                    <Button 
                      variant={plan.buttonVariant}
                      onClick={() => navigate('/signin', { state: { from: location, planId: plan.id } })}
                    >
                      Sign in to Subscribe
                    </Button>
                  ) : (
                    <StripeCheckout 
                      planId={plan.id}
                      planName={plan.name}
                      priceId={plan.priceId}
                      variant={plan.buttonVariant}
                      highlight={plan.highlight}
                      onSuccess={() => handlePlanSuccess(plan.id)}
                    />
                  )}
                </CardFooter>
              </Card>
            );
          })}
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
              {user ? "View Subscription" : "Log in"}
            </Button>
          </AlertDescription>
        </Alert>
      </div>
      <Footer />
    </div>
  );
};

export default Pricing;
