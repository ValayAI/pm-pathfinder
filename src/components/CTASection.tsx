
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function CTASection() {
  const [inView, setInView] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    const element = document.getElementById('cta-section');
    if (element) observer.observe(element);
    
    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);
  
  return (
    <section id="cta-section" className="py-20 relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 w-full h-full bg-gradient-to-b from-transparent via-blue-50/50 to-blue-50/80 dark:from-transparent dark:via-blue-950/10 dark:to-blue-950/20"></div>
      </div>
    
      <div className="container mx-auto">
        <div className={cn(
          "text-center glass-effect rounded-xl py-12 px-8 transition-all duration-700 max-w-3xl mx-auto shadow-lg border border-white/60 dark:border-white/5 bg-white/70 dark:bg-gray-900/60 backdrop-blur-lg",
          inView ? "opacity-100 scale-100" : "opacity-0 scale-95"
        )}>
          <div className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300 mb-4 shadow-sm border border-blue-100/80 dark:border-blue-800/30">
            <Sparkles className="mr-1.5 h-3.5 w-3.5 text-amber-500" />
            <span>Start your PM journey today</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-outfit font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Get Instant Product Management Guidance
          </h2>
          
          <p className="text-base text-muted-foreground max-w-xl mx-auto mb-8">
            Try our AI-powered PM coach for free. Get answers to your product management questions, career advice, and strategic guidance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/chat">
              <Button size="lg" className="rounded-lg px-6 py-6 h-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-300">
                Chat with AI Coach
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/explore">
              <Button size="lg" variant="outline" className="rounded-lg px-6 py-6 h-auto border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300">
                Explore Resources
              </Button>
            </Link>
          </div>
          
          <p className="mt-6 text-xs text-muted-foreground">
            Free plan includes 10 messages. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
