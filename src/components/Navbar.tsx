
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Menu, X, Compass, BookOpen, MessageSquare, User, Moon, Sun, DollarSign, Sparkles, Home
} from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/providers/AuthProvider";

type NavItem = {
  name: string;
  path: string;
  icon: React.ReactNode;
  highlight?: boolean;
};

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const isMobile = useIsMobile();
  const { user } = useAuth();
  
  // Handle scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Handle dark mode toggle
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);
  
  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };
  
  const navItems: NavItem[] = [
    // Home link that directs to dashboard when logged in, otherwise to index page
    { name: 'Home', path: '/', icon: <Home className="h-4 w-4 mr-1" /> },
    { name: 'Explore', path: '/explore', icon: <Compass className="h-4 w-4 mr-1" /> },
    { name: 'Resources', path: '/resources', icon: <BookOpen className="h-4 w-4 mr-1" /> },
    { 
      name: 'PM Coach', 
      path: '/chat', 
      icon: <Sparkles className="h-4 w-4 mr-1" />, 
      highlight: true 
    },
    { name: 'Coaching', path: '/coaching', icon: <MessageSquare className="h-4 w-4 mr-1" /> },
    { name: 'Pricing', path: '/pricing', icon: <DollarSign className="h-4 w-4 mr-1" /> },
  ];
  
  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled ? "glass-effect py-1" : "bg-transparent py-2"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-12">
          {/* Logo and brand */}
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">P</span>
              </div>
              <span className="font-outfit font-medium text-md">PM Pathfinder</span>
            </NavLink>
          </div>
          
          {/* Condensed desktop menu with hamburger */}
          <div className="hidden md:flex items-center space-x-1">
            <Drawer>
              <DrawerTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Menu"
                  className="h-7 w-7 rounded-md"
                >
                  <Menu className="h-4 w-4" />
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader className="text-left">
                  <DrawerTitle>Menu</DrawerTitle>
                  <DrawerDescription>
                    Navigate to different sections
                  </DrawerDescription>
                </DrawerHeader>
                <div className="p-4 space-y-3">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      className={({ isActive }) => cn(
                        "flex items-center p-2 rounded-md text-sm font-medium transition-colors duration-200 w-full",
                        isActive 
                          ? "text-primary bg-primary/5" 
                          : "text-foreground/70 hover:text-primary hover:bg-primary/5",
                        item.highlight && !isActive && "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
                        item.highlight && isActive && "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                      )}
                    >
                      {item.icon}
                      <span className="ml-2">{item.name}</span>
                    </NavLink>
                  ))}
                  <NavLink 
                    to="/profile"
                    className={({ isActive }) => cn(
                      "flex items-center p-2 rounded-md text-sm font-medium transition-colors duration-200 w-full",
                      isActive 
                        ? "text-primary bg-primary/5" 
                        : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                    )}
                  >
                    <User className="h-4 w-4 mr-1" />
                    <span className="ml-2">Profile</span>
                  </NavLink>
                </div>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="outline">Close</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleDarkMode} 
              className="ml-1 h-7 w-7 rounded-md"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="h-[0.9rem] w-[0.9rem]" /> : <Moon className="h-[0.9rem] w-[0.9rem]" />}
            </Button>
            
            {user ? (
              <NavLink to="/profile">
                <Button variant="outline" size="sm" className="ml-1 h-7 px-2">
                  <User className="h-3.5 w-3.5" />
                </Button>
              </NavLink>
            ) : (
              <NavLink to="/signin">
                <Button variant="default" size="sm" className="ml-1 h-7">
                  Sign In
                </Button>
              </NavLink>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleDarkMode} 
              className="mr-1 h-7 w-7 rounded-md"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="h-[0.9rem] w-[0.9rem]" /> : <Moon className="h-[0.9rem] w-[0.9rem]" />}
            </Button>
            
            {/* Drawer for hamburger menu */}
            <Drawer>
              <DrawerTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Menu"
                  className="h-7 w-7 rounded-md"
                >
                  <Menu className="h-4 w-4" />
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader className="text-left">
                  <DrawerTitle>Menu</DrawerTitle>
                  <DrawerDescription>
                    Navigate to different sections
                  </DrawerDescription>
                </DrawerHeader>
                <div className="p-4 space-y-3">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      className={({ isActive }) => cn(
                        "flex items-center p-2 rounded-md text-sm font-medium transition-colors duration-200 w-full",
                        isActive 
                          ? "text-primary bg-primary/5" 
                          : "text-foreground/70 hover:text-primary hover:bg-primary/5",
                        item.highlight && !isActive && "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
                        item.highlight && isActive && "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                      )}
                    >
                      {item.icon}
                      <span className="ml-2">{item.name}</span>
                    </NavLink>
                  ))}
                  <NavLink 
                    to={user ? "/profile" : "/signin"}
                    className={({ isActive }) => cn(
                      "flex items-center p-2 rounded-md text-sm font-medium transition-colors duration-200 w-full",
                      isActive 
                        ? "text-primary bg-primary/5" 
                        : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                    )}
                  >
                    <User className="h-4 w-4 mr-1" />
                    <span className="ml-2">{user ? "Profile" : "Sign In"}</span>
                  </NavLink>
                </div>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="outline">Close</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
