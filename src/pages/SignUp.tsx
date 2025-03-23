
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/providers/AuthProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { User, KeyRound, ArrowRight, Mail, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { addSubscriber } from '@/utils/subscriberUtils';

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
        // If user opted in to newsletter, add them to ConvertKit via form submission
        if (subscribeNewsletter) {
          // Track subscription in local storage
          addSubscriber(email);
          
          // Create a hidden form and submit it to ConvertKit
          const form = document.createElement('form');
          form.method = 'post';
          form.action = 'https://app.convertkit.com/forms/7822296/subscriptions';
          form.style.display = 'none';
          
          const emailInput = document.createElement('input');
          emailInput.name = 'email_address';
          emailInput.value = email;
          
          const firstNameInput = document.createElement('input');
          firstNameInput.name = 'fields[first_name]';
          firstNameInput.value = firstName;
          
          form.appendChild(emailInput);
          form.appendChild(firstNameInput);
          document.body.appendChild(form);
          form.submit();
        }
        
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
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="page-container flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold flex items-center">
                <CheckCircle className="mr-2 h-6 w-6 text-green-500" />
                Sign Up Successful
              </CardTitle>
              <CardDescription>
                Please check your email inbox to complete registration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted rounded-md space-y-3">
                <h3 className="font-medium flex items-center">
                  <Mail className="mr-2 h-4 w-4" />
                  Two confirmation emails have been sent:
                </h3>
                <ol className="list-decimal ml-5 space-y-2">
                  <li>
                    <strong>Account verification email</strong> - Click the link to verify your account
                  </li>
                  {subscribeNewsletter && (
                    <li>
                      <strong>Newsletter confirmation email</strong> - Please confirm your subscription
                    </li>
                  )}
                </ol>
                <p className="text-sm text-muted-foreground mt-3">
                  Please check your spam folder if you don't see these emails in your inbox.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => navigate('/signin')}>
                Go to Sign In
              </Button>
              <Button onClick={() => navigate('/')}>
                Return to Home
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="page-container flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
            <CardDescription>
              Enter your details to get started
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input
                    id="first-name"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input
                    id="last-name"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>
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
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                    minLength={6}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10"
                    required
                    minLength={6}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="subscribe-newsletter"
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  checked={subscribeNewsletter}
                  onChange={(e) => setSubscribeNewsletter(e.target.checked)}
                />
                <Label htmlFor="subscribe-newsletter" className="text-sm font-normal">
                  Subscribe to our newsletter for PM insights, frameworks, and AI tips
                </Label>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
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
                <Link to="/signin" className="text-primary hover:underline">
                  Sign in
                  <ArrowRight className="ml-1 inline-block h-3 w-3" />
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
