
import React from 'react';
import { useUser, SignOutButton } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LogOut, User, MessageSquare, BarChart3, Calendar, Settings, Bell, CreditCard } from 'lucide-react';
import { toast } from 'sonner';

const Dashboard = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Please sign in to access your dashboard</div>;
  }

  const handleManageSubscription = () => {
    toast.info("Subscription management", {
      description: "This feature is coming soon!",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full overflow-hidden">
                  <img 
                    src={user.imageUrl} 
                    alt={user.fullName || 'Profile image'} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <CardTitle>{user.fullName || 'User'}</CardTitle>
                  <CardDescription>{user.primaryEmailAddress?.emailAddress}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <nav className="space-y-1">
                <Button variant="ghost" className="w-full justify-start">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Messages
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analytics
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Calendar
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Billing
                </Button>
                <SignOutButton>
                  <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </SignOutButton>
              </nav>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Subscription</CardTitle>
                <CardDescription>Manage your plan and billing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg">Basic Plan</h3>
                      <Badge className="bg-green-100 text-green-800 border-green-300 hover:bg-green-200">
                        Active
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">Renewal on Oct 12, 2024</p>
                  </div>
                  <Button variant="outline" onClick={handleManageSubscription}>
                    Manage Subscription
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="overview">
              <TabsList className="grid grid-cols-3 w-full max-w-md">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="sessions">Coaching</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <Card>
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                    <CardDescription>Recent activity and stats</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Alert>
                      <AlertTitle>Welcome to your dashboard!</AlertTitle>
                      <AlertDescription>
                        This is where you'll see your recent activity, coaching sessions, and resources.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="resources">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Resources</CardTitle>
                    <CardDescription>PM interview preparation materials</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Your premium resources will appear here once available.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="sessions">
                <Card>
                  <CardHeader>
                    <CardTitle>Coaching Sessions</CardTitle>
                    <CardDescription>Your upcoming and past coaching calls</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>No coaching sessions scheduled yet.</p>
                    <Button className="mt-4">Schedule a Session</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
