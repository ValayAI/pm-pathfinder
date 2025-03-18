
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export function Hero() {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setLoaded(true);
  }, []);
  
  const features = [
    "Expert PM coaching",
    "AI-powered guidance",
    "Interview preparation",
    "Roadmap frameworks"
  ];
  
  return (
    <div className="relative overflow-hidden pt-16 pb-12 sm:pt-20 sm:pb-16">
      {/* Simple background gradient */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full aspect-square bg-gradient-to-b from-primary/10 via-transparent to-transparent blur-3xl opacity-30"></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Pill badge */}
          <div className={cn(
            "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-primary/10 text-primary mb-5 transition-all duration-700",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            <Sparkles className="mr-1.5 h-3.5 w-3.5" />
            <span>Your PM coach, powered by AI</span>
          </div>
          
          {/* Headline */}
          <h1 className={cn(
            "text-3xl md:text-4xl font-bold tracking-tight max-w-xl mx-auto transition-all duration-700 delay-100 leading-tight",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            Product Management Excellence at Your Fingertips
          </h1>
          
          {/* Subheadline */}
          <p className={cn(
            "mt-4 text-base text-muted-foreground max-w-md mx-auto transition-all duration-700 delay-200",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            Get instant product management advice, frameworks, and career guidance with our AI-powered coaching platform.
          </p>
          
          {/* CTA buttons */}
          <div className={cn(
            "mt-8 flex flex-col sm:flex-row gap-3 justify-center transition-all duration-700 delay-300",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            <Link to="/chat">
              <Button size="sm" className="group rounded-full px-4 bg-gradient-to-r from-primary to-primary/90 shadow shadow-primary/20">
                Chat with AI Coach
                <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
            <Button size="sm" variant="outline" className="rounded-full px-4">
              Explore Resources
            </Button>
          </div>
          
          {/* Features list */}
          <div className={cn(
            "mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 transition-all duration-700 delay-400",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            {features.map((feature, i) => (
              <div key={i} className="flex items-center text-xs sm:text-sm">
                <CheckCircle2 className="mr-1.5 h-3.5 w-3.5 text-green-500" />
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
