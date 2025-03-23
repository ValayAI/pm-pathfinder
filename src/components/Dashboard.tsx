
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader
} from '@/components/ui/sidebar';
import {
  Home,
  Compass,
  BookOpen,
  MessageSquare,
  Settings,
  Sparkles,
  BarChart3
} from "lucide-react";

interface DashboardProps {
  children: React.ReactNode;
}

const Dashboard = ({ children }: DashboardProps) => {
  const { user } = useAuth();
  const location = useLocation();
  const [firstName, setFirstName] = useState('');
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      try {
        const profile = JSON.parse(storedProfile);
        setFirstName(profile.first_name || '');
      } catch (error) {
        console.error('Error parsing user profile from localStorage:', error);
      }
    }
  }, []);
  
  const navigationItems = [
    { label: "Home", href: "/", icon: <Home className="h-5 w-5" /> },
    { label: "Explore", href: "/explore", icon: <Compass className="h-5 w-5" /> },
    { label: "Resources", href: "/resources", icon: <BookOpen className="h-5 w-5" /> },
    { label: "PM Coach", href: "/chat", icon: <Sparkles className="h-5 w-5" /> },
    { label: "Coaching", href: "/coaching", icon: <MessageSquare className="h-5 w-5" /> },
    { label: "Roadmap", href: "/roadmap", icon: <BarChart3 className="h-5 w-5" /> },
    { label: "Settings", href: "/settings", icon: <Settings className="h-5 w-5" /> },
  ];
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex flex-1 w-full">
        <Sidebar collapsible={isMobile ? "offcanvas" : "icon"} variant="inset">
          <SidebarHeader className="px-4 py-4">
            <h3 className="text-sm font-medium text-sidebar-foreground/70">
              {firstName ? `Hi, ${firstName}` : 'Welcome'}
            </h3>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton 
                    asChild
                    isActive={location.pathname === item.href}
                    tooltip={item.label}
                  >
                    <Link to={item.href} className="flex items-center gap-2">
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        
        <main className="flex-1 overflow-auto pb-24 md:pb-10 pt-20 md:pt-24 px-4 md:px-6 lg:px-10">
          <div className="pt-4 md:pt-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
