
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
    <div className="relative overflow-hidden pt-12 pb-8 sm:pt-16 sm:pb-12">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute w-full aspect-square bg-gradient-to-b from-blue-50/80 via-indigo-50/30 to-transparent dark:from-blue-950/20 dark:via-indigo-950/10 blur-3xl opacity-60"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto">
          {/* Pill badge */}
          <div className={cn(
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300 mb-4 transition-all duration-700",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            <Sparkles className="mr-1 h-3 w-3" />
            <span>Your PM coach, powered by AI</span>
          </div>
          
          {/* Headline */}
          <h1 className={cn(
            "text-2xl sm:text-3xl md:text-4xl font-outfit font-semibold tracking-tight max-w-xl mx-auto transition-all duration-700 delay-100 leading-tight",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            Product Management Excellence at Your Fingertips
          </h1>
          
          {/* Subheadline */}
          <p className={cn(
            "mt-3 text-sm text-muted-foreground max-w-md mx-auto transition-all duration-700 delay-200",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            Get instant product management advice, frameworks, and career guidance with our AI-powered coaching platform.
          </p>
          
          {/* CTA buttons */}
          <div className={cn(
            "mt-6 flex flex-col sm:flex-row gap-3 justify-center transition-all duration-700 delay-300",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            <Link to="/chat">
              <Button size="default" className="group rounded-md px-4 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-sm">
                Chat with AI Coach
                <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
            <Button size="default" variant="outline" className="rounded-md px-4">
              Explore Resources
            </Button>
          </div>
          
          {/* Features list */}
          <div className={cn(
            "mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 transition-all duration-700 delay-400",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            {features.map((feature, i) => (
              <div key={i} className="flex items-center text-xs sm:text-xs">
                <CheckCircle2 className="mr-1 h-3 w-3 text-green-500" />
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
