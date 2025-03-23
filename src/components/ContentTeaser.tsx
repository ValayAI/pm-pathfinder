
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface ContentTeaserProps {
  title: string;
  description: string;
  className?: string;
  children: React.ReactNode;
  cta?: string;
}

const ContentTeaser = ({
  title,
  description,
  className,
  children,
  cta = "Sign up for free access",
}: ContentTeaserProps) => {
  return (
    <div className={cn("relative mx-auto max-w-5xl", className)}>
      <Card className="border-2 border-primary/20">
        <CardHeader className="bg-primary/5 border-b border-primary/10">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Sparkles className="h-5 w-5 text-primary" />
              {title}
            </CardTitle>
            <div className="bg-primary/10 px-2 py-1 rounded-full flex items-center gap-1 text-xs font-medium text-primary">
              <Lock className="h-3 w-3" />
              <span>Preview</span>
            </div>
          </div>
          <p className="text-muted-foreground mt-2">{description}</p>
        </CardHeader>
        
        <CardContent className="relative pt-6 overflow-hidden">
          {/* Main content area */}
          {children}
          
          {/* Blur overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-0 top-[60%] pointer-events-none" />
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:space-x-4 sm:space-y-0 bg-muted/30 p-4 border-t">
          <p className="text-sm text-muted-foreground">
            Create your free account to unlock all features
          </p>
          <div className="flex space-x-3">
            <Button variant="outline" asChild>
              <Link to="/signin">Sign In</Link>
            </Button>
            <Button asChild>
              <Link to="/signup" className="flex items-center gap-1">
                {cta} <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ContentTeaser;
