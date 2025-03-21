
import { useState, useEffect } from 'react';
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

const Settings = () => {
  const { user } = useAuth();
  const { isFeatureEnabled } = useSubscription();
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
  
  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const profileData = await getUserProfile(user.id);
        setProfile(profileData);
        if (profileData) {
          setFirstName(profileData.first_name || '');
          setLastName(profileData.last_name || '');
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
        toast.success("Settings saved successfully");
      }
    }
    
    setLoading(false);
  };
  
  return (
    <Dashboard>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground mb-6">
          Manage your account preferences and settings
        </p>
        
        <Tabs defaultValue="account" className="space-y-8">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>
          
          {/* Account Settings */}
          <TabsContent value="account" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName" 
                  value={firstName} 
                  onChange={(e) => setFirstName(e.target.value)} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName" 
                  value={lastName} 
                  onChange={(e) => setLastName(e.target.value)} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={user?.email} readOnly />
              </div>
            </div>
          </TabsContent>
          
          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-4">
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
          </TabsContent>
          
          {/* Appearance Settings */}
          <TabsContent value="appearance" className="space-y-4">
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
          </TabsContent>
          
          <div className="pt-4">
            <Button onClick={handleSaveSettings} disabled={loading}>
              {loading ? "Saving..." : "Save Settings"}
            </Button>
          </div>
        </Tabs>
      </div>
    </Dashboard>
  );
};

export default Settings;
