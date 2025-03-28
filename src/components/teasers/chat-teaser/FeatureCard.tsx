
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  feature: {
    icon: React.ReactNode;
    title: string;
    description: string;
    color: string;
  };
  delay: number;
}

const FeatureCard = ({ feature, delay }: FeatureCardProps) => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100 + delay);
    return () => clearTimeout(timer);
  }, [delay]);
  
  const getColorClass = () => {
    switch (feature.color) {
      case 'blue':
        return "from-blue-50/60 to-blue-50/30 dark:from-blue-900/10 dark:to-blue-900/5 border-blue-100 dark:border-blue-900/20";
      case 'indigo':
        return "from-indigo-50/60 to-indigo-50/30 dark:from-indigo-900/10 dark:to-indigo-900/5 border-indigo-100 dark:border-indigo-900/20";
      case 'purple':
        return "from-purple-50/60 to-purple-50/30 dark:from-purple-900/10 dark:to-purple-900/5 border-purple-100 dark:border-purple-900/20";
      default:
        return "from-gray-50/60 to-gray-50/30 dark:from-gray-900/10 dark:to-gray-900/5 border-gray-100 dark:border-gray-900/20";
    }
  };

  return (
    <Card className={cn(
      `bg-gradient-to-br ${getColorClass()} backdrop-blur-sm shadow-sm border hover:shadow-md transition-all hover:scale-[1.01] duration-300`,
      "transition-all duration-500 transform",
      loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    )}>
      <CardContent className="pt-6 p-6">
        <div className="flex justify-center items-center mb-3">
          <div className={cn(
            "p-3 rounded-lg",
            feature.color === 'blue' ? "bg-blue-100/70 dark:bg-blue-900/30" :
            feature.color === 'indigo' ? "bg-indigo-100/70 dark:bg-indigo-900/30" :
            "bg-purple-100/70 dark:bg-purple-900/30"
          )}>
            {feature.icon}
          </div>
        </div>
        <h3 className="text-center font-medium mb-2 text-lg">{feature.title}</h3>
        <p className="text-sm text-center text-muted-foreground">
          {feature.description}
        </p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
