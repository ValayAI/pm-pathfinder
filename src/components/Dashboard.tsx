
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { 
  Home, 
  Compass, 
  BookOpen, 
  MessageSquare, 
  Sparkles,
  ArrowUpRight,
  Settings,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getUserProfile, UserProfile } from '@/utils/profileUtils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Sidebar,
  SidebarBody,
  SidebarLink,
} from '@/components/AppSidebar';

interface DashboardProps {
  children?: React.ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ children }) => {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState('Good day');
  const [loaded, setLoaded] = useState(false);
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
    
    // Set loaded state for animations after a brief delay
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
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
      label: "Home",
      href: "/",
      icon: <Home className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Explore Resources",
      href: "/explore",
      icon: <Compass className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Ask PM Coach",
      href: "/chat",
      icon: <Sparkles className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Get Coaching",
      href: "/coaching",
      icon: <MessageSquare className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Roadmap",
      href: "/roadmap",
      icon: <BookOpen className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Profile",
      href: "/profile",
      icon: <User className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: <Settings className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />,
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex w-full min-h-[calc(100vh-4rem)] pt-4">
        <Sidebar>
          <SidebarBody>
            <div className="flex flex-col space-y-6">
              <div className="px-2">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-sm">P</span>
                  </div>
                  <span className="font-outfit font-medium text-md">PM Pathfinder</span>
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-2 px-2">
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
        
        <div className="flex-1 px-6 py-4">
          {children ? children : (
            <div className="space-y-8">
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={profile?.avatar_url || undefined} alt={displayName} />
                    <AvatarFallback>{displayName.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-2xl font-semibold">{greeting}, {displayName}!</h1>
                    <p className="text-muted-foreground">Welcome to your PM Pathfinder dashboard.</p>
                  </div>
                </div>
              </section>

              {/* Simplified Dashboard Content */}
              <section className="grid grid-cols-1 gap-6">
                {/* Progress Overview */}
                <div className="bg-card rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow duration-300 border border-border">
                  <h2 className="text-lg font-semibold mb-3">Continue Your Learning</h2>
                  <p className="text-muted-foreground text-sm mb-4">
                    Pick up where you left off with your current learning path
                  </p>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between p-3 bg-accent/10 rounded-md">
                      <div>
                        <h3 className="font-medium">Mastering Prioritization</h3>
                        <p className="text-xs text-muted-foreground">4 of 6 modules completed</p>
                      </div>
                      <Button size="sm" variant="ghost">
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button asChild variant="default" className="w-full justify-center">
                    <Link to="/roadmap">
                      Continue Learning
                    </Link>
                  </Button>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
