
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import React, { useState, createContext, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X,
  Home,
  Compass,
  BookOpen,
  MessageSquare,
  Sparkles,
  BarChart3,
  Settings,
  User
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface Links {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp = true,
  setOpen: setOpenProp = () => {},
  animate = false,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const isMobile = useIsMobile();
  const [openState, setOpenState] = useState(!isMobile);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;
  
  // Update sidebar state when mobile status changes
  useEffect(() => {
    if (openProp === undefined) {
      setOpenState(!isMobile);
    }
  }, [isMobile, openProp]);

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open = true,
  setOpen = () => {},
  animate = false,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

interface SidebarBodyProps {
  className?: string;
  children: React.ReactNode;
}

export const SidebarBody: React.FC<SidebarBodyProps> = ({ 
  className, 
  children 
}) => {
  return (
    <>
      <DesktopSidebar className={className}>
        {children}
      </DesktopSidebar>
      <MobileSidebar className={className}>
        {children}
      </MobileSidebar>
    </>
  );
};

interface DesktopSidebarProps {
  className?: string;
  children: React.ReactNode;
}

export const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  className,
  children,
}) => {
  const { open, animate } = useSidebar();
  return (
    <motion.div
      className={cn(
        "h-full px-4 py-4 hidden md:flex md:flex-col bg-neutral-100 dark:bg-neutral-800 w-[300px] flex-shrink-0",
        className
      )}
      animate={{
        width: "300px", // Always keep the width at 300px
      }}
    >
      {children}
    </motion.div>
  );
};

interface MobileSidebarProps {
  className?: string;
  children: React.ReactNode;
}

export const MobileSidebar: React.FC<MobileSidebarProps> = ({
  className,
  children,
}) => {
  const { open, setOpen } = useSidebar();
  
  return (
    <>
      <div
        className={cn(
          "h-16 px-4 py-2 flex flex-row md:hidden items-center justify-between bg-neutral-100 dark:bg-neutral-800 w-full fixed top-0 left-0 z-50"
        )}
      >
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center mr-2">
            <span className="text-primary-foreground font-bold text-lg">P</span>
          </div>
          <span className="text-xl font-semibold">PM Pathfinder</span>
        </div>
        <Menu
          className="text-neutral-800 dark:text-neutral-200 cursor-pointer h-6 w-6"
          onClick={() => setOpen(true)}
        />
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
              }}
              className={cn(
                "fixed h-full w-full inset-0 bg-white dark:bg-neutral-900 p-6 z-[100] flex flex-col",
                className
              )}
            >
              <div
                className="absolute right-6 top-6 z-50 text-neutral-800 dark:text-neutral-200 cursor-pointer"
                onClick={() => setOpen(false)}
              >
                <X className="h-6 w-6" />
              </div>
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export const SidebarLink = ({
  link,
  className,
  ...props
}: {
  link: Links;
  className?: string;
}) => {
  const { setOpen } = useSidebar();
  const isMobile = useIsMobile();
  
  const handleClick = () => {
    if (isMobile) {
      setOpen(false);
    }
  };
  
  return (
    <Link
      to={link.href}
      className={cn(
        "flex items-center justify-start gap-2 group/sidebar py-2",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {link.icon}
      <span className="text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0">
        {link.label}
      </span>
    </Link>
  );
};
