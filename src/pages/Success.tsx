
import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLocalStorage } from '@/hooks/use-local-storage';

const Success = () => {
  const [searchParams] = useSearchParams();
  const planId = searchParams.get('plan');
  const [, setSubscriptionStatus] = useLocalStorage('subscription', { active: false, plan: null });

  useEffect(() => {
    // Update subscription status in local storage
    if (planId) {
      setSubscriptionStatus({ active: true, plan: planId });
    }
  }, [planId, setSubscriptionStatus]);

  // Map plan IDs to human-readable names
  const planNames = {
    starter: "Starter Plan",
    popular: "Most Popular Plan",
    pro: "Pro Coaching Plan"
  };

  const planName = planId ? (planNames[planId as keyof typeof planNames] || "Premium Plan") : "Premium Plan";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12 flex items-center justify-center">
        <Card className="w-full max-w-md shadow-lg border-green-200 dark:border-green-800">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-green-100 dark:bg-green-900 p-3">
                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <CardTitle className="text-2xl">Payment Successful!</CardTitle>
            <CardDescription>Thank you for your purchase</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md bg-green-50 dark:bg-green-950 p-4 border border-green-200 dark:border-green-800">
              <p className="text-sm text-green-800 dark:text-green-400">
                You have successfully subscribed to the <strong>{planName}</strong>. Your account has been upgraded and you now have access to all premium features.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">What's next?</h3>
              <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                <li>Access premium content and features</li>
                <li>Engage with our coaching services</li>
                <li>Explore exclusive resources</li>
                <li>Track your progress in your dashboard</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button asChild className="w-full">
              <Link to="/dashboard">
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link to="/chat">
                Try the AI Chat
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Success;
