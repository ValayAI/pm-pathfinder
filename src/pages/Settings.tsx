
import { useState, useEffect, Suspense } from 'react';
import { useAuth } from "@/providers/AuthProvider";
import { useSubscription } from "@/providers/SubscriptionProvider";
import { useTheme } from "@/components/ui/theme-provider";
import Dashboard from "@/components/Dashboard";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { updateUserProfile, getUserProfile, UserProfile } from '@/utils/profileUtils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

const Settings = () => {
  const { user, signOut } = useAuth();
  const { subscription } = useSubscription();
  const { theme, setTheme } = useTheme();
  
  const [notifications, setNotifications] = useState({
    email: true,
    marketing: false,
    newFeatures: true,
    weeklyDigest: true
  });
  
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  
  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          setIsPageLoading(true);
          // First check localStorage for existing profile data
          const storedProfile = localStorage.getItem('userProfile');
          let profileData = null;
          
          if (storedProfile) {
            try {
              profileData = JSON.parse(storedProfile);
              // Use stored data immediately while fetching fresh data
              setProfile(profileData);
              setFirstName(profileData.first_name || '');
              setLastName(profileData.last_name || '');
            } catch (error) {
              console.error('Error parsing user profile from localStorage:', error);
            }
          }
          
          // Fetch fresh data from Supabase
          const freshProfileData = await getUserProfile(user.id);
          if (freshProfileData) {
            setProfile(freshProfileData);
            setFirstName(freshProfileData.first_name || '');
            setLastName(freshProfileData.last_name || '');
            
            // Update localStorage with fresh data
            localStorage.setItem('userProfile', JSON.stringify(freshProfileData));
          } else if (!profileData) {
            // If no profile data exists anywhere, initialize empty
            setProfile(null);
            setFirstName('');
            setLastName('');
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
          toast.error('Failed to load profile data');
        } finally {
          setIsPageLoading(false);
        }
      }
    };
    
    fetchProfile();
  }, [user]);
  
  // Toggle dark mode using the ThemeProvider
  const toggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  
  const handleSaveSettings = async () => {
    setLoading(true);
    
    if (user) {
      // Save profile information
      const success = await updateUserProfile(user.id, {
        first_name: firstName,
        last_name: lastName
      });
      
      if (success) {
        // Update local storage with the new profile data
        const updatedProfile = {
          ...(profile || {}),
          first_name: firstName,
          last_name: lastName
        };
        localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
        
        toast.success("Settings saved successfully");
      }
    }
    
    setLoading(false);
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success('Signed out successfully');
  };
  
  // Loading state for the entire settings page
  if (isPageLoading) {
    return (
      <Dashboard>
        <div className="max-w-4xl mx-auto flex justify-center items-center py-16">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mb-4"></div>
            <p className="text-muted-foreground">Loading your settings...</p>
          </div>
        </div>
      </Dashboard>
    );
  }
  
  return (
    <Dashboard>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Account & Settings</h1>
        <p className="text-muted-foreground mb-6">
          Manage your profile, account preferences and settings
        </p>
        
        <Tabs defaultValue="profile" className="space-y-8">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>
          
          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>Update your profile information</CardDescription>
              </CardHeader>
              <form onSubmit={(e) => { e.preventDefault(); handleSaveSettings(); }}>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input 
                        id="first-name" 
                        placeholder="Your first name" 
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input 
                        id="last-name" 
                        placeholder="Your last name" 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
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
                  <Button type="submit" disabled={loading}>
                    {loading ? 'Updating...' : 'Update Profile'}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          {/* Account Settings */}
          <TabsContent value="account" className="space-y-4">
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
          </TabsContent>

          {/* Subscription Tab */}
          <TabsContent value="subscription" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Plan</CardTitle>
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
          </TabsContent>
          
          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch 
                    id="email-notifications" 
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="marketing">Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive emails about new products and features
                    </p>
                  </div>
                  <Switch 
                    id="marketing" 
                    checked={notifications.marketing}
                    onCheckedChange={(checked) => setNotifications({...notifications, marketing: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="new-features">New Feature Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when we launch new features
                    </p>
                  </div>
                  <Switch 
                    id="new-features" 
                    checked={notifications.newFeatures}
                    onCheckedChange={(checked) => setNotifications({...notifications, newFeatures: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="weekly-digest">Weekly Digest</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive a weekly summary of product management resources
                    </p>
                  </div>
                  <Switch 
                    id="weekly-digest" 
                    checked={notifications.weeklyDigest}
                    onCheckedChange={(checked) => setNotifications({...notifications, weeklyDigest: checked})}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveSettings} disabled={loading}>
                  {loading ? "Saving..." : "Save Notification Settings"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Appearance Settings */}
          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize your application display preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Toggle between light and dark mode
                    </p>
                  </div>
                  <Switch 
                    id="dark-mode" 
                    checked={theme === "dark"}
                    onCheckedChange={toggleDarkMode}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Dashboard>
  );
};

export default Settings;
