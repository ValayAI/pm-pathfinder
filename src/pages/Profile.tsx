
import { useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Mail, LogOut } from 'lucide-react';

const Profile = () => {
  const { user, signOut } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  
  const handleSignOut = async () => {
    await signOut();
    toast.success('Signed out successfully');
  };
  
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    
    // This is a placeholder for future profile update functionality
    setTimeout(() => {
      setIsUpdating(false);
      toast.success('Profile updated successfully');
    }, 1000);
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
                    <p>Last sign in: {new Date().toLocaleDateString()}</p>
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
                    <div className="space-y-2">
                      <Label htmlFor="display-name">Display Name</Label>
                      <Input 
                        id="display-name" 
                        placeholder="Your name" 
                        defaultValue={user?.user_metadata?.name || ''}
                      />
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
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <h3 className="font-semibold text-primary">Free Plan</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      You're currently on the free plan. Upgrade to access premium features.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Pricing
                  </Button>
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
