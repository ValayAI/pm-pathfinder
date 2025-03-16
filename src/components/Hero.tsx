
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export function Hero() {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setLoaded(true);
  }, []);
  
  const features = [
    "Expert PM career coaching",
    "Interview preparation",
    "Roadmap frameworks",
    "Industry-specific insights"
  ];
  
  return (
    <div className="relative overflow-hidden pt-20 pb-16 sm:pt-32 sm:pb-24">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] aspect-square bg-gradient-to-b from-primary/20 via-primary/5 to-transparent blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150%] aspect-square bg-gradient-to-t from-primary/10 via-transparent to-transparent blur-3xl opacity-40"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Pill badge */}
          <div className={cn(
            "inline-flex items-center rounded-full px-4 py-1 text-sm font-medium bg-primary/10 text-primary mb-6 transition-all duration-700",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            <span>Your path to PM excellence</span>
          </div>
          
          {/* Headline */}
          <h1 className={cn(
            "text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl mx-auto transition-all duration-700 delay-100",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            <span className="block">Elevate Your</span>
            <span className="block text-primary">Product Management</span>
            <span className="block">Career</span>
          </h1>
          
          {/* Subheadline */}
          <p className={cn(
            "mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto transition-all duration-700 delay-200",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            Practical insights, frameworks, and expert guidance to help you excel in your product management journey - from interviews to leadership roles.
          </p>
          
          {/* CTA buttons */}
          <div className={cn(
            "mt-10 flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-300",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            <Button size="lg" className="group">
              Start Your Journey
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline">
              Explore Resources
            </Button>
          </div>
          
          {/* Features list */}
          <div className={cn(
            "mt-12 flex flex-wrap justify-center gap-x-12 gap-y-3 transition-all duration-700 delay-400",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            {features.map((feature, i) => (
              <div key={i} className="flex items-center text-sm sm:text-base">
                <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
