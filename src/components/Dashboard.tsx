
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';
import { getUserProfile, UserProfile } from '@/utils/profileUtils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Sidebar,
  SidebarBody,
  SidebarLink,
} from '@/components/AppSidebar';
import {
  LayoutDashboard,
  Compass,
  BookOpen,
  MessageSquare,
  Sparkles,
  Settings,
  User,
  ArrowRight
} from 'lucide-react';

interface DashboardProps {
  children?: React.ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ children }) => {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState('Good day');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  
  // Fetch user profile
  useEffect(() => {
    if (user) {
      getUserProfile(user.id).then(profileData => {
        setProfile(profileData);
      });
    }
  }, [user]);
  
  // Set time-based greeting
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);
  
  if (!user) {
    return null; // This shouldn't happen due to ProtectedRoute, but just in case
  }

  // Display name - use first name from profile, or fallback to user metadata, or fallback to email
  const displayName = profile?.first_name || 
                      (user.user_metadata?.first_name as string) || 
                      user.email?.split('@')[0] || 
                      'there';

  // Menu items for the sidebar
  const menuItems = [
    {
      label: "Dashboard",
      href: "/",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      label: "Explore Resources",
      href: "/explore",
      icon: <Compass className="h-5 w-5" />,
    },
    {
      label: "Ask PM Coach",
      href: "/chat",
      icon: <Sparkles className="h-5 w-5" />,
    },
    {
      label: "Get Coaching",
      href: "/coaching",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      label: "Roadmap",
      href: "/roadmap",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      label: "Profile",
      href: "/profile",
      icon: <User className="h-5 w-5" />,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: <Settings className="h-5 w-5" />,
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar is intentionally removed from Dashboard page */}
      <div className="flex w-full min-h-screen">
        <Sidebar>
          <SidebarBody>
            <div className="flex flex-col space-y-6">
              <div className="px-2">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                    <svg 
                      viewBox="0 0 24 24" 
                      width="24" 
                      height="24" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      fill="none" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="text-primary-foreground"
                    >
                      <rect x="3" y="3" width="7" height="7" />
                      <rect x="14" y="3" width="7" height="7" />
                      <rect x="14" y="14" width="7" height="7" />
                      <rect x="3" y="14" width="7" height="7" />
                    </svg>
                  </div>
                  <span className="font-outfit font-semibold text-lg">PM Pathfinder</span>
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-xs font-medium text-muted-foreground mb-2 px-2">
                  Navigation
                </p>
                <div className="space-y-1">
                  {menuItems.map((item) => (
                    <SidebarLink key={item.label} link={item} />
                  ))}
                </div>
              </div>
            </div>
          </SidebarBody>
        </Sidebar>
        
        <div className="flex-1 px-6 py-6">
          {children ? children : (
            <div className="space-y-8 max-w-4xl mx-auto">
              {/* Quick Actions - at the top */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Shortcuts to help you navigate</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {menuItems.slice(0, 4).map((item) => (
                      <Link 
                        key={item.label} 
                        to={item.href}
                        className="flex flex-col items-center justify-center p-4 rounded-lg border bg-card hover:bg-accent/20 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                          {React.cloneElement(item.icon as React.ReactElement, { className: "h-5 w-5 text-primary" })}
                        </div>
                        <span className="text-sm font-medium">{item.label}</span>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* User Welcome Section */}
              <Card className="border-none shadow-none bg-transparent">
                <CardHeader className="px-0 pt-0">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={profile?.avatar_url || undefined} alt={displayName} />
                      <AvatarFallback>{displayName.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-3xl font-semibold">
                        {greeting}, {displayName}
                      </CardTitle>
                      <CardDescription className="text-base">
                        Welcome back to your PM learning journey
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
              
              {/* Learning Progress */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Current Path</CardTitle>
                    <CardDescription>Continue where you left off</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 rounded-md bg-accent/10">
                        <h3 className="font-medium">Mastering Prioritization</h3>
                        <div className="mt-1 mb-2">
                          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: '66%' }}></div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">4 of 6 modules completed</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link to="/roadmap">
                        Continue Learning
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>PM Coach</CardTitle>
                    <CardDescription>Get instant answers to your PM questions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center h-24">
                      <Sparkles className="h-12 w-12 text-primary opacity-80" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/chat">
                        Ask PM Coach
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
