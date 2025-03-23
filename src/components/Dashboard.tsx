
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
import Navbar from '@/components/Navbar';
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
  
  // Fetch user's first name from localStorage
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
  
  // Set sidebar to always closed on mobile, open on desktop
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Update sidebar state when screen size changes
  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);
  
  return (
    <div className={`min-h-screen flex flex-col ${initialRender ? 'invisible' : 'visible'}`}>
      <Navbar />
      
      <div className="flex flex-1 pt-16">
        <SidebarProvider open={sidebarOpen} setOpen={setSidebarOpen} animate={false}>
          <SidebarBody>
            {/* Greeting with user's first name if available */}
            <div className="px-4 py-4 mb-2">
              <h3 className="text-sm font-medium text-muted-foreground">
                {firstName ? `Hi, ${firstName}` : 'Welcome'}
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
          
          <main className="flex-1 p-4 md:p-6 lg:p-10 overflow-auto pb-24 md:pb-10">
            {children}
          </main>
        </SidebarProvider>
      </div>
    </div>
  );
};

export default Dashboard;
