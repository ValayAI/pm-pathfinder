
import React from "react";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  LockOpen,
  CreditCard,
  Clock,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/providers/AuthProvider";
import { useActivity } from '@/hooks/useActivity';
import PlansList from "@/components/subscription/PlansList";

const Pricing = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { trackPageView } = useActivity();
  
  React.useEffect(() => {
    trackPageView('pricing_page');
  }, [trackPageView]);

  const handleLogin = () => {
    if (!user) {
      navigate('/signin');
    } else {
      navigate('/profile');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <PlansList />

        <Alert className="bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800 max-w-3xl mx-auto mb-6">
          <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <AlertTitle>Premium Features Coming Soon</AlertTitle>
          <AlertDescription>
            Some premium features like 1-on-1 coaching calls, resume review, and interview coaching will be available soon. Purchase now to get early access when they launch!
          </AlertDescription>
        </Alert>

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
