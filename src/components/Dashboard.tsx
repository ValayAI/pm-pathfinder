
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  ChevronRight, 
  Compass, 
  BookOpen, 
  MessageSquare, 
  BarChart3, 
  Sparkles,
  ArrowUpRight,
  Home,
  Settings,
  User
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

interface DashboardProps {
  children?: React.ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ children }) => {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState('Good day');
  const [loaded, setLoaded] = useState(false);
  
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

  // Menu items for the sidebar
  const menuItems = [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Explore Resources",
      url: "/explore",
      icon: Compass,
    },
    {
      title: "Ask PM Coach",
      url: "/chat",
      icon: Sparkles,
    },
    {
      title: "Get Coaching",
      url: "/coaching",
      icon: MessageSquare,
    },
    {
      title: "Roadmap",
      url: "/roadmap",
      icon: BookOpen,
    },
    {
      title: "Profile",
      url: "/profile",
      icon: User,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SidebarProvider defaultOpen={true}>
        <div className="flex w-full min-h-[calc(100vh-4rem)] pt-4">
          <Sidebar>
            <SidebarHeader>
              <div className="text-lg font-semibold px-4">PM Pathfinder</div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {menuItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild tooltip={item.title}>
                          <Link to={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
              <div className="px-4 py-2 text-xs text-muted-foreground">
                PM Pathfinder © {new Date().getFullYear()}
              </div>
            </SidebarFooter>
          </Sidebar>

          <SidebarInset>
            <div className="px-6 py-4">
              {children ? children : (
                <div className="space-y-8">
                  <section>
                    <h1 className="text-3xl font-semibold">{greeting}, {user?.email}!</h1>
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
                            <ChevronRight className="ml-auto h-4 w-4" />
                          </Link>
                        </li>
                        <li className="flex items-center justify-between hover:bg-accent/5 rounded-md p-2 transition-colors duration-200">
                          <Link to="/roadmap" className="flex items-center w-full">
                            <span className="font-medium">Effective Communication</span>
                            <ChevronRight className="ml-auto h-4 w-4" />
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
          </SidebarInset>
        </div>
      </SidebarProvider>
      <Footer />
    </div>
  );
};

export default Dashboard;
