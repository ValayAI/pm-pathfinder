import { useState } from 'react';
import { useAuth } from "@/providers/AuthProvider";
import { useSubscription } from '@/providers/SubscriptionProvider';
import { 
  Compass, 
  BookOpen, 
  MessageSquare, 
  User, 
  Settings, 
  DollarSign, 
  LogOut, 
  BarChart3, 
  Sparkles, 
  Home
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
  SidebarSeparator,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from "sonner";

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { isFeatureEnabled } = useSubscription();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("You have been signed out successfully");
      navigate('/');
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out. Please try again.");
    }
  };

  const hasPMCoachAccess = isFeatureEnabled('pm_coach');
  const hasRoadmapAccess = isFeatureEnabled('roadmap_generator');
  
  const mainNavItems = [
    { title: 'Home', icon: Home, href: '/', active: location.pathname === '/' },
    { title: 'Explore', icon: Compass, href: '/explore', active: location.pathname === '/explore' },
    { title: 'Resources', icon: BookOpen, href: '/resources', active: location.pathname === '/resources' },
    { title: 'PM Coach', icon: Sparkles, href: '/chat', active: location.pathname === '/chat', premium: !hasPMCoachAccess },
    { title: 'Coaching', icon: MessageSquare, href: '/coaching', active: location.pathname === '/coaching' },
  ];
  
  const toolsNavItems = [
    { title: 'Roadmap Generator', icon: BarChart3, href: '/roadmap', active: location.pathname === '/roadmap', premium: !hasRoadmapAccess },
  ];
  
  const accountNavItems = [
    { title: 'Profile', icon: User, href: '/profile' },
    { title: 'Pricing', icon: DollarSign, href: '/pricing' },
    { title: 'Settings', icon: Settings, href: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      <SidebarProvider defaultOpen={sidebarOpen}>
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center space-x-2 px-2">
              <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">P</span>
              </div>
              <span className="font-outfit font-medium text-md">PM Pathfinder</span>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {mainNavItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild
                        tooltip={item.title}
                        isActive={item.active}
                      >
                        <Button
                          variant="ghost" 
                          className={cn(
                            "w-full justify-start",
                            item.premium && "text-muted-foreground"
                          )}
                          onClick={() => navigate(item.href)}
                        >
                          <item.icon className="mr-2 h-4 w-4" />
                          <span>{item.title}</span>
                          {item.premium && (
                            <span className="ml-auto text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded">
                              PRO
                            </span>
                          )}
                        </Button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            <SidebarSeparator />
            
            <SidebarGroup>
              <SidebarGroupLabel>Tools</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {toolsNavItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild
                        tooltip={item.title}
                        isActive={item.active}
                      >
                        <Button
                          variant="ghost" 
                          className={cn(
                            "w-full justify-start",
                            item.premium && "text-muted-foreground"
                          )}
                          onClick={() => navigate(item.href)}
                        >
                          <item.icon className="mr-2 h-4 w-4" />
                          <span>{item.title}</span>
                          {item.premium && (
                            <span className="ml-auto text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded">
                              PRO
                            </span>
                          )}
                        </Button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            <SidebarSeparator />
            
            <SidebarGroup>
              <SidebarGroupLabel>Account</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {accountNavItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild
                        tooltip={item.title}
                      >
                        <Button
                          variant="ghost" 
                          className="w-full justify-start"
                          onClick={() => navigate(item.href)}
                        >
                          <item.icon className="mr-2 h-4 w-4" />
                          <span>{item.title}</span>
                        </Button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign Out</span>
            </Button>
            
            <div className="px-3 py-2 mt-2">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div className="flex flex-col text-sm">
                  <span className="font-medium">{user?.email?.split('@')[0]}</span>
                  <span className="text-xs text-muted-foreground truncate max-w-[160px]">
                    {user?.email}
                  </span>
                </div>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <div className="flex-1 p-6 pt-20">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Welcome to your Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Recent Activity Card */}
              <div className="border rounded-lg p-4 shadow-sm">
                <h2 className="text-lg font-semibold mb-2">Recent Activity</h2>
                <p className="text-muted-foreground text-sm">
                  You haven't had any recent activity. Start exploring resources or use PM Coach to get started.
                </p>
                <Button variant="outline" className="mt-4 w-full" onClick={() => navigate('/explore')}>
                  Explore Resources
                </Button>
              </div>
              
              {/* PM Coach Card */}
              <div className="border rounded-lg p-4 shadow-sm bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
                <h2 className="text-lg font-semibold mb-2 flex items-center">
                  <Sparkles className="h-4 w-4 mr-2 text-blue-500" />
                  PM Coach
                </h2>
                <p className="text-muted-foreground text-sm">
                  Get advice on product management challenges using our AI-powered coach.
                </p>
                <Button 
                  className="mt-4 w-full" 
                  onClick={() => navigate('/chat')}
                  disabled={!hasPMCoachAccess}
                >
                  {hasPMCoachAccess ? "Start Chatting" : "Upgrade to Access"}
                </Button>
              </div>
              
              {/* Roadmap Generator Card */}
              <div className="border rounded-lg p-4 shadow-sm bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30">
                <h2 className="text-lg font-semibold mb-2 flex items-center">
                  <BarChart3 className="h-4 w-4 mr-2 text-green-500" />
                  Roadmap Generator
                </h2>
                <p className="text-muted-foreground text-sm">
                  Create beautiful product roadmaps with our easy-to-use tool.
                </p>
                <Button 
                  className="mt-4 w-full" 
                  onClick={() => navigate('/roadmap')}
                  disabled={!hasRoadmapAccess}
                >
                  {hasRoadmapAccess ? "Create Roadmap" : "Upgrade to Access"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Dashboard;
