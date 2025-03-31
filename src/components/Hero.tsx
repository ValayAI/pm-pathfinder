
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Sparkles, Star } from "lucide-react";
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
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute w-full h-full bg-gradient-to-b from-blue-50/80 via-indigo-50/40 to-transparent dark:from-blue-950/20 dark:via-indigo-950/10 blur-3xl opacity-60"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-200/30 dark:bg-purple-900/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-200/30 dark:bg-blue-900/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animation-delay-200 animate-float"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto">
          {/* Pill badge */}
          <div className={cn(
            "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 dark:from-blue-900/30 dark:to-indigo-900/30 dark:text-blue-300 mb-5 shadow-sm transition-all duration-700 border border-blue-100/50 dark:border-blue-800/30",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            <Sparkles className="mr-1.5 h-3.5 w-3.5 text-amber-500" />
            <span>Your PM coach, powered by AI</span>
          </div>
          
          {/* Headline */}
          <h1 className={cn(
            "text-3xl sm:text-4xl md:text-5xl font-outfit font-bold tracking-tight max-w-xl mx-auto transition-all duration-700 delay-100 leading-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            Product Management Excellence at Your Fingertips
          </h1>
          
          {/* Subheadline */}
          <p className={cn(
            "mt-4 text-base sm:text-lg text-muted-foreground max-w-md mx-auto transition-all duration-700 delay-200",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            Get instant product management advice, frameworks, and career guidance with our AI-powered coaching platform.
          </p>
          
          {/* CTA buttons */}
          <div className={cn(
            "mt-8 flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-300",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            <Link to="/chat">
              <div className="flex flex-col items-center">
                <Button size="lg" className="group rounded-lg px-6 py-6 h-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-300">
                  Chat with AI Coach
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
                <span className="text-xs text-muted-foreground mt-2 flex items-center">
                  <Star className="h-3 w-3 text-amber-400 fill-amber-400 mr-1" />
                  Get free AI-powered product management advice now!
                </span>
              </div>
            </Link>
            <Link to="/explore">
              <Button size="lg" variant="outline" className="rounded-lg px-6 py-6 h-auto border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300">
                Explore Resources
              </Button>
            </Link>
          </div>
          
          {/* Features list */}
          <div className={cn(
            "mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3 transition-all duration-700 delay-400",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            {features.map((feature, i) => (
              <div key={i} className="flex items-center text-sm sm:text-sm bg-white/60 dark:bg-gray-900/40 px-3 py-1.5 rounded-full shadow-sm border border-gray-100 dark:border-gray-800">
                <CheckCircle2 className="mr-1.5 h-3.5 w-3.5 text-green-500" />
                <span className="font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
