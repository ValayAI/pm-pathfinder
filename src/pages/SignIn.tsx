
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/providers/AuthProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { User, KeyRound, ArrowRight, Mail, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();

  // Check if the user was directed from pricing page with a specific plan
  const fromPricing = location.state?.from?.pathname === '/pricing';
  const selectedPlanId = location.state?.planId;

  useEffect(() => {
    // Show a message if redirected from pricing with a plan
    if (fromPricing && selectedPlanId) {
      toast.info('Sign in to subscribe', {
        description: `Complete sign in to subscribe to the ${selectedPlanId} plan.`,
      });
    }
  }, [fromPricing, selectedPlanId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      const { error: signInError, success } = await signIn(email, password);
      
      if (signInError) {
        setError(signInError.message || 'Please check your credentials and try again.');
        return;
      }
      
      if (success) {
        toast.success('Welcome back!', {
          description: 'You have successfully signed in.',
        });

        // If the user came from pricing with a plan, redirect back to pricing
        if (fromPricing) {
          navigate('/pricing', { state: location.state });
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Unexpected error during sign-in:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
          <CardDescription>
            Enter your email and password to access your account
            {fromPricing && selectedPlanId && (
              <p className="mt-2 text-sm font-medium text-purple-600 dark:text-purple-400">
                Sign in to subscribe to the {selectedPlanId} plan
              </p>
            )}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || !email || !password}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span className="ml-2">Signing in...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>Sign in</span>
                </div>
              )}
            </Button>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/sign-up" className="text-primary hover:underline">
                Sign up
                <ArrowRight className="ml-1 inline-block h-3 w-3" />
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SignIn;
