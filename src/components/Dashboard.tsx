
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';
import { 
  Sidebar, 
  SidebarBody, 
  SidebarProvider, 
  SidebarLink,
  useSidebar
} from '@/components/AppSidebar';
import { useIsMobile } from '@/hooks/use-mobile';
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
  const navigate = useNavigate();
  const location = useLocation();
  const [firstName, setFirstName] = useState('');
  const isMobile = useIsMobile();
  const [initialRender, setInitialRender] = useState(true);
  
  // Set initial render flag to false after component mounts
  useEffect(() => {
    setInitialRender(false);
  }, []);
  
  // Fetch user's first name from localStorage if available
  useEffect(() => {
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      const profile = JSON.parse(storedProfile);
      setFirstName(profile.first_name || '');
    }
  }, []);
  
  // Check if user is authenticated
  useEffect(() => {
    if (!user) {
      navigate('/signin');
    }
  }, [user, navigate]);
  
  const links = [
    { label: "Home", href: "/", icon: <Home className="h-5 w-5" /> },
    { label: "Explore", href: "/explore", icon: <Compass className="h-5 w-5" /> },
    { label: "Resources", href: "/resources", icon: <BookOpen className="h-5 w-5" /> },
    { label: "PM Coach", href: "/chat", icon: <Sparkles className="h-5 w-5" /> },
    { label: "Coaching", href: "/coaching", icon: <MessageSquare className="h-5 w-5" /> },
    { label: "Roadmap", href: "/roadmap", icon: <BarChart3 className="h-5 w-5" /> },
    { label: "Settings", href: "/settings", icon: <Settings className="h-5 w-5" /> },
  ];
  
  // Conditional initial sidebar state for mobile vs desktop
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  
  return (
    <div className={`min-h-screen flex flex-col md:flex-row ${initialRender ? 'invisible' : 'visible'}`}>
      <SidebarProvider open={sidebarOpen} setOpen={setSidebarOpen} animate={false}>
        <SidebarBody>
          <div className="flex items-center justify-center p-4 md:p-4">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">P</span>
            </div>
            <span className="ml-2 text-xl font-semibold">PM Pathfinder</span>
          </div>
          
          {/* Greeting with user's first name if available */}
          <div className="px-4 py-2 mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">
              Welcome{firstName ? `, ${firstName}` : ''}
            </h3>
          </div>
          
          <div className="space-y-1 px-2">
            {links.map((link) => (
              <SidebarLink
                key={link.label}
                link={link}
                className={location.pathname === link.href ? "text-primary font-medium" : ""}
              />
            ))}
          </div>
        </SidebarBody>
        
        <main className="flex-1 p-4 md:p-6 lg:p-10 overflow-auto pb-24 md:pb-10 mt-16 md:mt-0">
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
};

export default Dashboard;
