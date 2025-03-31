import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/providers/AuthProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { User, KeyRound, ArrowRight, Mail, CheckCircle, Sparkles, InfoIcon } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { addSubscriber } from '@/utils/subscriberUtils';
import { Switch } from '@/components/ui/switch';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [signupComplete, setSignupComplete] = useState(false);
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match', {
        description: 'Please make sure your passwords match.',
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      console.log('Attempting to sign up with firstName:', firstName, 'lastName:', lastName);
      const { error, success } = await signUp(email, password, { 
        firstName: firstName.trim(), 
        lastName: lastName.trim() 
      });
      
      if (error) {
        toast.error('Sign up failed', {
          description: error.message || 'Please check your information and try again.',
        });
        return;
      }
      
      if (success) {
        // Always subscribe users to the newsletter
        // Track subscription in local storage
        addSubscriber(email);
        
        // Submit to ConvertKit via fetch instead of form redirect
        const formData = new FormData();
        formData.append('email_address', email);
        formData.append('fields[first_name]', firstName);
        
        fetch('https://app.convertkit.com/forms/7822296/subscriptions', {
          method: 'POST',
          body: formData,
          headers: {
            accept: 'application/json',
          }
        }).then(response => {
          console.log('ConvertKit subscription response:', response.status);
          if (!response.ok) {
            console.error('Failed to subscribe to newsletter');
          }
        }).catch(error => {
          console.error('Newsletter subscription error:', error);
        });
        
        setSignupComplete(true);
        
        toast.success('Account created', {
          description: 'Please check your email to confirm your account.',
        });
      }
    } catch (error) {
      console.error('Unexpected error during sign-up:', error);
      toast.error('Sign up failed', {
        description: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (signupComplete) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        <Navbar />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
        <div className="page-container flex items-center justify-center pt-24 md:pt-28 pb-12">
          <Card className="w-full max-w-md shadow-xl border-primary/20 rounded-xl overflow-hidden bg-card/95 backdrop-blur-sm">
            <div className="absolute right-12 top-6 hidden md:block">
              <Sparkles className="text-green-500/60 h-10 w-10 animate-pulse" />
            </div>
            <CardHeader className="space-y-2 bg-muted/50 border-b pb-6">
              <CardTitle className="text-2xl font-bold flex items-center">
                <CheckCircle className="mr-3 h-6 w-6 text-green-500" />
                Sign Up Successful
              </CardTitle>
              <CardDescription className="text-base">
                Please check your email inbox to complete registration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="p-5 bg-gradient-to-r from-muted/50 to-transparent rounded-lg space-y-3 border shadow-sm">
                <h3 className="font-medium flex items-center text-lg">
                  <Mail className="mr-2 h-5 w-5 text-primary" />
                  Two confirmation emails have been sent:
                </h3>
                <ol className="list-decimal ml-6 space-y-3">
                  <li className="text-base">
                    <strong>Account verification email</strong> - Click the link to verify your account
                  </li>
                  <li className="text-base">
                    <strong>Newsletter confirmation email</strong> - Please confirm your subscription
                  </li>
                </ol>
                <p className="text-sm text-muted-foreground mt-4 bg-muted/30 p-3 rounded-md border border-dashed">
                  Please check your spam folder if you don't see these emails in your inbox.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-4 bg-muted/30 border-t">
              <Button variant="outline" onClick={() => navigate('/signin')} className="min-w-32">
                Go to Sign In
              </Button>
              <Button onClick={() => navigate('/')} className="min-w-32 bg-primary/90 hover:bg-primary">
                Return to Home
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Navbar />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
      <div className="page-container flex items-center justify-center pt-24 md:pt-28 pb-12">
        <div className="relative w-full max-w-md">
          <div className="absolute -top-6 right-0 hidden md:block">
            <Sparkles className="text-primary/60 h-10 w-10 animate-pulse" />
          </div>
          <Card className="w-full shadow-xl border-primary/20 rounded-xl overflow-hidden bg-card/95 backdrop-blur-sm">
            <CardHeader className="space-y-2 bg-muted/50 border-b">
              <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
              <CardDescription className="text-base">
                Enter your details to get started
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-5 pt-6">
                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="first-name" className="text-sm font-medium">First Name</Label>
                    <Input
                      id="first-name"
                      placeholder="John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="border-input/60 focus:border-primary/40 shadow-sm"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name" className="text-sm font-medium">Last Name</Label>
                    <Input
                      id="last-name"
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="border-input/60 focus:border-primary/40 shadow-sm"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 border-input/60 focus:border-primary/40 shadow-sm"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 border-input/60 focus:border-primary/40 shadow-sm"
                      required
                      minLength={6}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="text-sm font-medium">Confirm Password</Label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 border-input/60 focus:border-primary/40 shadow-sm"
                      required
                      minLength={6}
                    />
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-start">
                      <div className="mr-2 mt-0.5">
                        <InfoIcon className="h-4 w-4 text-blue-500" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-blue-800">Newsletter Subscription</h4>
                        <p className="text-xs text-blue-600 mt-0.5">
                          Get valuable PM insights, frameworks, and AI tips in your inbox
                        </p>
                      </div>
                    </div>
                    <Switch
                      id="subscribe-newsletter"
                      checked={true}
                      className="data-[state=checked]:bg-blue-500"
                      disabled={true}
                    />
                  </div>
                  <p className="text-xs text-blue-600 pl-6">
                    By creating an account, you'll be subscribed to our newsletter. 
                    You can unsubscribe at any time.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4 border-t bg-muted/30 pt-6">
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-primary hover:from-blue-700 hover:to-primary/90 shadow-sm" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span className="ml-2">Creating account...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>Create account</span>
                    </div>
                  )}
                </Button>
                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link to="/signin" className="text-primary hover:underline font-medium">
                    Sign in
                    <ArrowRight className="ml-1 inline-block h-3 w-3" />
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
