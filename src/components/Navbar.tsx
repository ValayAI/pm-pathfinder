
import { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Moon, Sun, User, Menu, X, Home, Compass, BookOpen, MessageSquare, Sparkles, BarChart3, Settings, LogOut
} from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileMenu from './MobileMenu';
import { toast } from "sonner";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains('dark')
  );
  
  const { user, signOut } = useAuth();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
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
  
  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out');
    }
  };
  
  // Updated navigation items with icons for authenticated users - removed Settings from main nav
  const navigationItems = user ? [
    { label: "Home", href: "/", icon: <Home className="h-5 w-5" /> },
    { label: "Explore", href: "/explore", icon: <Compass className="h-5 w-5" /> },
    { label: "Resources", href: "/resources", icon: <BookOpen className="h-5 w-5" /> },
    { label: "PM Coach", href: "/chat", icon: <Sparkles className="h-5 w-5" />, highlight: true },
    { label: "Coaching", href: "/coaching", icon: <MessageSquare className="h-5 w-5" /> },
    { label: "Roadmap", href: "/roadmap", icon: <BarChart3 className="h-5 w-5" /> }
  ] : [
    { label: "Home", href: "/" },
    { label: "Explore", href: "/explore" },
    { label: "Resources", href: "/resources" },
    { label: "PM Coach", href: "/chat", highlight: true },
    { label: "Coaching", href: "/coaching" },
    { label: "Pricing", href: "/pricing" }
  ];
  
  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled ? "glass-effect py-1" : "bg-transparent py-2"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-primary to-blue-700 flex items-center justify-center shadow-sm">
                <span className="text-primary-foreground font-bold text-sm">P</span>
              </div>
              <span className="font-outfit font-medium text-md">PM Pathfinder</span>
            </NavLink>
          </div>
          
          <div className="hidden md:flex items-center space-x-5">
            {navigationItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.href}
                className={({ isActive }) => cn(
                  "flex items-center text-sm font-medium transition-colors duration-200 px-3 py-1.5 rounded-md",
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-foreground/70 hover:bg-muted hover:text-primary",
                  item.highlight && !isActive && "text-blue-600 dark:text-blue-400"
                )}
              >
                {user && item.icon && <span className="mr-2">{item.icon}</span>}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
          
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-9 w-9 rounded-md hover:bg-primary/10"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Navigation Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[75vw] sm:w-[350px] py-8 bg-background/95 backdrop-blur-md">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-3 mt-2">
                    <MobileMenu navigationItems={navigationItems} />
                  </div>
                  
                  {user && (
                    <div className="border-t pt-4 mt-2">
                      <div className="flex flex-col gap-3">
                        <SheetClose asChild>
                          <Link to="/settings">
                            <Button variant="outline" className="w-full">
                              <Settings className="mr-2 h-4 w-4" />
                              Settings
                            </Button>
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Button 
                            variant="outline" 
                            className="w-full" 
                            onClick={handleSignOut}
                          >
                            <LogOut className="mr-2 h-4 w-4" />
                            Sign Out
                          </Button>
                        </SheetClose>
                      </div>
                    </div>
                  )}
                  
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
                            <Button 
                              variant="default" 
                              className="w-full bg-gradient-to-r from-blue-600 to-primary hover:from-blue-700 hover:to-primary/90"
                            >
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
          
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleDarkMode} 
              className="h-8 w-8 rounded-md hover:bg-muted"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            
            {user ? (
              <div className="relative">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 px-3 rounded-md border-primary/20 hover:bg-primary/10">
                      <User className="h-3.5 w-3.5 mr-2" />
                      <span className="hidden sm:inline">Account</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/settings" className="w-full cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <NavLink to="/signin" className="hidden md:block">
                  <Button variant="outline" size="sm" className="h-8 px-4 border-primary/20">
                    Sign In
                  </Button>
                </NavLink>
                <NavLink to="/signup" className="hidden md:block">
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="h-8 px-4 bg-gradient-to-r from-blue-600 to-primary hover:from-blue-700 hover:to-primary/90"
                  >
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
