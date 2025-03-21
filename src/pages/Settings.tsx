
import { useState } from 'react';
import { useAuth } from "@/providers/AuthProvider";
import { useSubscription } from "@/providers/SubscriptionProvider";
import Dashboard from "@/components/Dashboard";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const Settings = () => {
  const { user } = useAuth();
  const { isFeatureEnabled } = useSubscription();
  
  const [notifications, setNotifications] = useState({
    email: true,
    marketing: false,
    newFeatures: true,
    weeklyDigest: true
  });
  
  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains('dark')
  );
  
  const [loading, setLoading] = useState(false);
  
  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
    setDarkMode(!darkMode);
  };
  
  const handleSaveSettings = () => {
    setLoading(true);
    
    // Simulate saving settings
    setTimeout(() => {
      setLoading(false);
      toast.success("Settings saved successfully");
    }, 500);
  };
  
  return (
    <div className="h-screen w-full">
      <div className="absolute inset-0">
        <Dashboard />
        
        <div className="absolute inset-0 flex-1 p-6 pt-20 overflow-auto left-[60px] md:left-[300px]">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Settings</h1>
            <p className="text-muted-foreground mb-6">
              Manage your account preferences and settings
            </p>
            
            <div className="space-y-8">
              {/* Profile Settings */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Profile</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" defaultValue={user?.email?.split('@')[0]} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={user?.email} readOnly />
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              {/* Notification Settings */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Notifications</h2>
                <div className="space-y-4">
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
                </div>
              </div>
              
              <Separator />
              
              {/* Appearance Settings */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Appearance</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="dark-mode">Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Toggle between light and dark mode
                      </p>
                    </div>
                    <Switch 
                      id="dark-mode" 
                      checked={darkMode}
                      onCheckedChange={toggleDarkMode}
                    />
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <Button onClick={handleSaveSettings} disabled={loading}>
                  {loading ? "Saving..." : "Save Settings"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
