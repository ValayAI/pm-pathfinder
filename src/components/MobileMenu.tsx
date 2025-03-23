
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { SheetClose } from "@/components/ui/sheet";

interface MobileMenuProps {
  navigationItems: {
    label: string;
    href: string;
    highlight?: boolean;
  }[];
}

const MobileMenu = ({ navigationItems }: MobileMenuProps) => {
  return (
    <div className="flex flex-col gap-2 py-2">
      {navigationItems.map((item) => (
        <SheetClose key={item.label} asChild>
          <NavLink
            to={item.href}
            className={({ isActive }) => cn(
              "flex items-center px-4 py-2.5 rounded-md text-base font-medium transition-colors",
              isActive 
                ? "bg-primary/10 text-primary" 
                : "text-foreground/70 hover:bg-muted",
              item.highlight && !isActive && "text-blue-600 dark:text-blue-400"
            )}
          >
            <span>{item.label}</span>
          </NavLink>
        </SheetClose>
      ))}
    </div>
  );
};

export default MobileMenu;
