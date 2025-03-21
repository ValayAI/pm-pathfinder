
import { useState, useEffect } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { useSubscription } from '@/providers/SubscriptionProvider';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Mail, LogOut } from 'lucide-react';
import { getUserProfile, updateUserProfile, UserProfile } from '@/utils/profileUtils';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user, signOut } = useAuth();
  const { subscription } = useSubscription();
  const [isUpdating, setIsUpdating] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: ''
  });
  
  // Load profile data
  useEffect(() => {
    const loadProfile = async () => {
      if (user) {
        const profileData = await getUserProfile(user.id);
        setProfile(profileData);
        
        if (profileData) {
          setFormData({
            firstName: profileData.first_name || '',
            lastName: profileData.last_name || ''
          });
        }
      }
    };
    
    loadProfile();
  }, [user]);
  
  const handleSignOut = async () => {
    await signOut();
    toast.success('Signed out successfully');
  };
  
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    setIsUpdating(true);
    
    try {
      const success = await updateUserProfile(user.id, {
        first_name: formData.firstName,
        last_name: formData.lastName
      });
      
      if (success) {
        toast.success('Profile updated successfully');
        
        // Refresh profile data
        const updatedProfile = await getUserProfile(user.id);
        setProfile(updatedProfile);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsUpdating(false);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [id === 'first-name' ? 'firstName' : 'lastName']: value
    }));
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto p-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Your Profile</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-4">
              <Card>
                <CardHeader>
                  <CardTitle>Account Info</CardTitle>
                  <CardDescription>Your basic account information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Email</div>
                      <div className="font-medium">{user?.email}</div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    <p>Account ID: {user?.id?.substring(0, 8)}...</p>
                    <p>Last sign in: {new Date(user?.last_sign_in_at || '').toLocaleDateString()}</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={handleSignOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="md:col-span-8">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>Update your profile information</CardDescription>
                </CardHeader>
                <form onSubmit={handleUpdateProfile}>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First Name</Label>
                        <Input 
                          id="first-name" 
                          placeholder="Your first name" 
                          value={formData.firstName}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input 
                          id="last-name" 
                          placeholder="Your last name" 
                          value={formData.lastName}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          className="pl-10"
                          value={user?.email || ''}
                          disabled
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">Your email cannot be changed</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" disabled={isUpdating}>
                      {isUpdating ? 'Updating...' : 'Update Profile'}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Subscription</CardTitle>
                  <CardDescription>Your current subscription plan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className={`p-4 rounded-lg ${
                    subscription?.planId === 'free' ? 'bg-blue-50 dark:bg-blue-950' :
                    subscription?.planId === 'starter' ? 'bg-green-50 dark:bg-green-950' :
                    subscription?.planId === 'popular' ? 'bg-purple-50 dark:bg-purple-950' :
                    'bg-amber-50 dark:bg-amber-950'
                  }`}>
                    <h3 className={`font-semibold ${
                      subscription?.planId === 'free' ? 'text-blue-600 dark:text-blue-400' :
                      subscription?.planId === 'starter' ? 'text-green-600 dark:text-green-400' :
                      subscription?.planId === 'popular' ? 'text-purple-600 dark:text-purple-400' :
                      'text-amber-600 dark:text-amber-400'
                    }`}>
                      {subscription?.planId === 'free' ? 'Free Plan' :
                       subscription?.planId === 'starter' ? 'Starter Plan' :
                       subscription?.planId === 'popular' ? 'Most Popular Plan' :
                       subscription?.planId === 'pro' ? 'Pro Coaching Plan' : 'Loading...'}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mt-1">
                      {subscription?.planId === 'free' 
                        ? "You're currently on the free plan. Upgrade to access premium features."
                        : `You have access to ${subscription?.features.length} premium features.`}
                    </p>
                    
                    {subscription?.planId !== 'free' && (
                      <div className="mt-2">
                        <p className="text-sm font-medium">Available features:</p>
                        <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                          {subscription?.features.map((feature, index) => (
                            <li key={index}>• {feature}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Link to="/pricing" className="w-full">
                    <Button variant="outline" className="w-full">
                      {subscription?.planId === 'free' ? 'View Pricing' : 'Manage Subscription'}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
