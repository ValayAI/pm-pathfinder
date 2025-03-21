
import { useEffect, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';
import { useSubscription } from '@/providers/SubscriptionProvider';
import { supabase } from '@/integrations/supabase/client';
import { updateSubscription } from '@/utils/subscriptionUtils';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Success = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { refreshSubscription } = useSubscription();
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const planId = searchParams.get('plan');
  
  useEffect(() => {
    const processSubscription = async () => {
      if (!user || !planId) {
        setIsProcessing(false);
        if (!planId) {
          setError('No plan information was provided.');
        }
        return;
      }
      
      try {
        // Local update for immediate feedback
        const updated = await updateSubscription(planId);
        
        if (!updated) {
          setError('Failed to update subscription. Please contact support.');
        } else {
          // Call the edge function to ensure server-side processing
          const { error } = await supabase.functions.invoke('handle-subscription', {
            body: { userId: user.id, planId }
          });
          
          if (error) {
            console.error('Error invoking edge function:', error);
            setError('There was an issue finalizing your subscription. Please contact support.');
          } else {
            // Refresh subscription data
            await refreshSubscription();
          }
        }
      } catch (err) {
        console.error('Error processing subscription:', err);
        setError('An unexpected error occurred. Please contact support.');
      } finally {
        setIsProcessing(false);
      }
    };
    
    processSubscription();
  }, [user, planId, refreshSubscription]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center p-6">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="text-center">
            {!error ? (
              <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-2" />
            ) : (
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-2">
                <span className="text-red-500 text-xl font-bold">!</span>
              </div>
            )}
            
            <CardTitle className="text-2xl">
              {isProcessing 
                ? 'Processing Your Purchase...' 
                : error 
                  ? 'Something Went Wrong' 
                  : 'Payment Successful!'}
            </CardTitle>
            
            <CardDescription>
              {isProcessing 
                ? 'Please wait while we set up your account...' 
                : error 
                  ? error 
                  : `Your ${planId} plan is now active.`}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {isProcessing ? (
              <div className="flex justify-center my-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : !error ? (
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <h3 className="font-medium text-green-800 dark:text-green-300">What's next?</h3>
                <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                  Your account has been upgraded and you now have access to all the features included in the {planId} plan.
                </p>
              </div>
            ) : null}
          </CardContent>
          
          <CardFooter className="flex justify-center">
            {!isProcessing && (
              <Link to={error ? "/pricing" : "/chat"}>
                <Button className="group">
                  {error ? 'Return to Pricing' : 'Start Using Your Plan'}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </Link>
            )}
          </CardFooter>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default Success;
