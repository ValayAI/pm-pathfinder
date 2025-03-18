
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Menu, X, Compass, BookOpen, MessageSquare, User, Moon, Sun, DollarSign, Sparkles
} from "lucide-react";

// Define the type for navigation items
type NavItem = {
  name: string;
  path: string;
  icon: React.ReactNode;
  highlight?: boolean;
};

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  
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
        isScrolled ? "bg-white/80 dark:bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">P</span>
              </div>
              <span className="font-medium text-lg tracking-tight">PM Pathfinder</span>
            </NavLink>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navItems.map(item => (
                <NavLink 
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) => cn(
                    "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200",
                    isActive 
                      ? "text-primary bg-primary/10" 
                      : "text-foreground/80 hover:text-primary hover:bg-primary/5",
                    item.highlight && !isActive && "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300",
                    item.highlight && isActive && "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200"
                  )}
                >
                  {item.icon}
                  {item.name}
                </NavLink>
              ))}
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleDarkMode} 
                className="ml-2"
                aria-label="Toggle dark mode"
              >
                {isDark ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
              </Button>
              <NavLink to="/profile">
                <Button variant="outline" size="sm" className="ml-2">
                  <User className="h-4 w-4 mr-1" />
                  Profile
                </Button>
              </NavLink>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleDarkMode} 
              className="mr-2"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={cn(
        "md:hidden transition-all duration-300 ease-in-out overflow-hidden",
        isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 backdrop-blur-md bg-white/80 dark:bg-background/80 border-t border-border">
          {navItems.map(item => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors duration-200",
                isActive 
                  ? "text-primary bg-primary/10" 
                  : "text-foreground/80 hover:text-primary hover:bg-primary/5",
                item.highlight && !isActive && "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300",
                item.highlight && isActive && "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200"
              )}
              onClick={() => setIsOpen(false)}
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
          <NavLink 
            to="/profile"
            className="flex items-center px-3 py-2 rounded-md text-base font-medium text-foreground/80 hover:text-primary hover:bg-primary/5"
            onClick={() => setIsOpen(false)}
          >
            <User className="h-4 w-4 mr-1" />
            Profile
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
