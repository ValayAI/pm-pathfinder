
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { 
  Home, 
  Compass, 
  BookOpen, 
  MessageSquare, 
  BarChart3, 
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
                <h1 className="text-3xl font-semibold">{greeting}, {displayName}!</h1>
                <p className="text-muted-foreground">Welcome to your PM Pathfinder dashboard.</p>
              </section>

              <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Quick Actions */}
                <div className="bg-card rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
                  <h2 className="text-lg font-semibold mb-2">Quick Actions</h2>
                  <div className="space-y-3">
                    <Button asChild variant="secondary" className="w-full justify-start">
                      <Link to="/chat" className="flex items-center w-full">
                        <Sparkles className="mr-2 h-4 w-4" />
                        <span>Ask PM Coach</span>
                        <ArrowUpRight className="ml-auto h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="secondary" className="w-full justify-start">
                      <Link to="/explore" className="flex items-center w-full">
                        <Compass className="mr-2 h-4 w-4" />
                        <span>Explore Resources</span>
                        <ArrowUpRight className="ml-auto h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="secondary" className="w-full justify-start">
                      <Link to="/coaching" className="flex items-center w-full">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        <span>Get Coaching</span>
                        <ArrowUpRight className="ml-auto h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Learning Paths */}
                <div className="bg-card rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
                  <h2 className="text-lg font-semibold mb-2">Learning Paths</h2>
                  <p className="text-muted-foreground text-sm mb-3">
                    Start a guided learning path to master product management skills.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center justify-between hover:bg-accent/5 rounded-md p-2 transition-colors duration-200">
                      <Link to="/roadmap" className="flex items-center w-full">
                        <span className="font-medium">Mastering Prioritization</span>
                        <ArrowUpRight className="ml-auto h-4 w-4" />
                      </Link>
                    </li>
                    <li className="flex items-center justify-between hover:bg-accent/5 rounded-md p-2 transition-colors duration-200">
                      <Link to="/roadmap" className="flex items-center w-full">
                        <span className="font-medium">Effective Communication</span>
                        <ArrowUpRight className="ml-auto h-4 w-4" />
                      </Link>
                    </li>
                  </ul>
                  <Button asChild variant="link" className="mt-4">
                    <Link to="/roadmap">
                      View All Paths
                    </Link>
                  </Button>
                </div>

                {/* Progress Overview */}
                <div className="bg-card rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
                  <h2 className="text-lg font-semibold mb-2">Progress Overview</h2>
                  <p className="text-muted-foreground text-sm">
                    Track your progress and see how far you've come.
                  </p>
                  <BarChart3 className="mx-auto h-10 w-10 mt-4 text-primary" />
                  <p className="text-center mt-2">Complete 65% of your current path</p>
                  <Button variant="outline" className="w-full mt-4">
                    See Detailed Progress
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
