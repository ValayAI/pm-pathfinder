
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Moon, Sun, User
} from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { 
  SidebarTrigger
} from "@/components/ui/sidebar";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains('dark')
  );
  
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
  
  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled ? "glass-effect py-1" : "bg-transparent py-2"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-12">
          {/* Logo and brand - always visible */}
          <div className="flex items-center">
            {user && <SidebarTrigger className="md:hidden mr-2" />}
            <NavLink to="/" className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">P</span>
              </div>
              <span className="font-outfit font-medium text-md">PM Pathfinder</span>
            </NavLink>
          </div>
          
          {/* Only show navigation in Navbar when user is not logged in */}
          {!user && (
            <div className="hidden md:flex items-center space-x-4">
              <NavLink
                to="/"
                className={({ isActive }) => cn(
                  "flex items-center text-sm font-medium transition-colors duration-200",
                  isActive ? "text-primary" : "text-foreground/70 hover:text-primary"
                )}
              >
                <span>Home</span>
              </NavLink>
              
              <NavLink
                to="/explore"
                className={({ isActive }) => cn(
                  "flex items-center text-sm font-medium transition-colors duration-200",
                  isActive ? "text-primary" : "text-foreground/70 hover:text-primary"
                )}
              >
                <span>Explore</span>
              </NavLink>
              
              <NavLink
                to="/resources"
                className={({ isActive }) => cn(
                  "flex items-center text-sm font-medium transition-colors duration-200",
                  isActive ? "text-primary" : "text-foreground/70 hover:text-primary"
                )}
              >
                <span>Resources</span>
              </NavLink>
              
              <NavLink
                to="/chat"
                className={({ isActive }) => cn(
                  "flex items-center text-sm font-medium transition-colors duration-200",
                  isActive ? "text-primary" : "text-foreground/70 hover:text-primary",
                  !isActive && "text-blue-600 dark:text-blue-400"
                )}
              >
                <span>PM Coach</span>
              </NavLink>
              
              <NavLink
                to="/coaching"
                className={({ isActive }) => cn(
                  "flex items-center text-sm font-medium transition-colors duration-200",
                  isActive ? "text-primary" : "text-foreground/70 hover:text-primary"
                )}
              >
                <span>Coaching</span>
              </NavLink>
              
              <NavLink
                to="/pricing"
                className={({ isActive }) => cn(
                  "flex items-center text-sm font-medium transition-colors duration-200",
                  isActive ? "text-primary" : "text-foreground/70 hover:text-primary"
                )}
              >
                <span>Pricing</span>
              </NavLink>
            </div>
          )}
          
          {/* Right side controls - always visible */}
          <div className="flex items-center space-x-2">
            {/* Dark mode toggle */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleDarkMode} 
              className="h-7 w-7 rounded-md"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="h-[0.9rem] w-[0.9rem]" /> : <Moon className="h-[0.9rem] w-[0.9rem]" />}
            </Button>
            
            {/* User controls */}
            {user ? (
              <NavLink to="/settings">
                <Button variant="outline" size="sm" className="h-7 px-2">
                  <User className="h-3.5 w-3.5" />
                </Button>
              </NavLink>
            ) : (
              <div className="flex items-center space-x-2">
                <NavLink to="/signin">
                  <Button variant="outline" size="sm" className="h-7">
                    Sign In
                  </Button>
                </NavLink>
                <NavLink to="/signup" className="hidden sm:block">
                  <Button variant="default" size="sm" className="h-7">
                    Sign Up
                  </Button>
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
