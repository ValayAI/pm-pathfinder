import React from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { LockIcon, UserPlus } from 'lucide-react';

interface TeaserWrapperProps {
  children: React.ReactNode;
  previewContent: React.ReactNode;
  title: string;
  description: string;
}

const TeaserWrapper = ({ children, previewContent, title, description }: TeaserWrapperProps) => {
  const { user, isLoading } = useAuth();
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  // If user is logged in, show full content
  if (user) {
    return <>{children}</>;
  }
  
  // Otherwise show teaser content
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </div>
        
        {/* Preview content */}
        <div className="mb-12">
          {previewContent}
        </div>
        
        {/* Blurred overlay with signup CTA */}
        <div className="rounded-lg bg-background border border-border p-8 relative overflow-hidden">
          <div className="absolute inset-0 backdrop-blur-sm bg-background/50 flex flex-col items-center justify-center z-10">
            <div className="bg-card p-8 rounded-lg shadow-lg text-center max-w-md">
              <div className="bg-primary/10 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                <LockIcon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Unlock Full Access</h3>
              <p className="text-muted-foreground mb-6">
                Sign up for free to access all our premium tools, resources, and coaching.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild size="lg">
                  <Link to="/sign-up" className="gap-1.5">
                    <UserPlus className="w-4 h-4" />
                    Sign up free
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/signin">Sign in</Link>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Blurred content in background */}
          <div className="h-[300px] overflow-hidden opacity-30">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeaserWrapper;
