
import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Moon, Sun, User, Menu, X
} from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { 
  SidebarTrigger
} from "@/components/ui/sidebar";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains('dark')
  );
  
  const { user } = useAuth();
  const isMobile = useIsMobile();
  
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
  
  const navigationItems = [
    { label: "Home", href: "/" },
    { label: "Explore", href: "/explore" },
    { label: "Resources", href: "/resources" },
    { label: "PM Coach", href: "/chat", highlight: true },
    { label: "Coaching", href: "/coaching" },
  ];
  
  // Add pricing for non-authenticated users
  if (!user) {
    navigationItems.push({ label: "Pricing", href: "/pricing" });
  }

  // For logged-in users, also show Roadmap and Settings links
  const userNavigationItems = user ? [
    { label: "Roadmap", href: "/roadmap" },
    { label: "Settings", href: "/settings" }
  ] : [];

  const allNavigationItems = [...navigationItems, ...userNavigationItems];
  
  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled ? "glass-effect py-1" : "bg-transparent py-2"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
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
          
          {/* Navigation links - now visible for all users on desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {navigationItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.href}
                className={({ isActive }) => cn(
                  "flex items-center text-sm font-medium transition-colors duration-200",
                  isActive ? "text-primary" : "text-foreground/70 hover:text-primary",
                  item.highlight && !isActive && "text-blue-600 dark:text-blue-400"
                )}
              >
                <span>{item.label}</span>
              </NavLink>
            ))}
            
            {/* For logged-in users, also show Roadmap and Settings links */}
            {userNavigationItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.href}
                className={({ isActive }) => cn(
                  "flex items-center text-sm font-medium transition-colors duration-200",
                  isActive ? "text-primary" : "text-foreground/70 hover:text-primary"
                )}
              >
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
          
          {/* Mobile navigation menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-9 w-9 rounded-md"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Navigation Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[75vw] sm:w-[350px] py-8">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-3 mt-2">
                    {allNavigationItems.map((item) => (
                      <SheetClose key={item.label} asChild>
                        <NavLink
                          to={item.href}
                          className={({ isActive }) => cn(
                            "flex items-center px-4 py-2.5 rounded-md text-base font-medium transition-colors duration-200",
                            isActive 
                              ? "bg-primary/10 text-primary" 
                              : "text-foreground/70 hover:bg-muted hover:text-primary",
                            item.highlight && !isActive && "text-blue-600 dark:text-blue-400"
                          )}
                        >
                          <span>{item.label}</span>
                        </NavLink>
                      </SheetClose>
                    ))}
                  </div>
                  
                  {!user && (
                    <div className="border-t pt-4 mt-2">
                      <div className="flex flex-col gap-3">
                        <SheetClose asChild>
                          <Link to="/signin">
                            <Button variant="outline" className="w-full">
                              Sign In
                            </Button>
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link to="/signup">
                            <Button variant="default" className="w-full">
                              Sign Up
                            </Button>
                          </Link>
                        </SheetClose>
                      </div>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
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
                <NavLink to="/signin" className="hidden md:block">
                  <Button variant="outline" size="sm" className="h-7">
                    Sign In
                  </Button>
                </NavLink>
                <NavLink to="/signup" className="hidden md:block">
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
