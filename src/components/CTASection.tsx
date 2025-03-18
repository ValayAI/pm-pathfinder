
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquareText, Sparkles } from "lucide-react";
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
    <section id="cta-section" className="py-12 relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 w-full h-full bg-gradient-to-b from-transparent via-blue-50/50 to-blue-50/80 dark:from-transparent dark:via-blue-950/10 dark:to-blue-950/20"></div>
      </div>
    
      <div className="container mx-auto">
        <div className={cn(
          "text-center glass-effect rounded-xl py-8 px-6 transition-all duration-700 max-w-3xl mx-auto",
          inView ? "opacity-100 scale-100" : "opacity-0 scale-95"
        )}>
          <div className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300 mb-3">
            <Sparkles className="mr-1.5 h-3 w-3" />
            <span>Start your PM journey today</span>
          </div>
          
          <h2 className="text-xl sm:text-2xl font-outfit font-semibold mb-3">
            Get Instant Product Management Guidance
          </h2>
          
          <p className="text-sm text-muted-foreground max-w-xl mx-auto mb-6">
            Try our AI-powered PM coach for free. Get answers to your product management questions, career advice, and strategic guidance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/chat">
              <Button size="default" className="group bg-gradient-to-r from-blue-600 to-indigo-600 shadow-sm">
                <MessageSquareText className="mr-1.5 h-3.5 w-3.5" />
                Chat with AI Coach
                <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
            <Button size="default" variant="outline">
              Explore Resources
            </Button>
          </div>
          
          <p className="mt-4 text-xs text-muted-foreground">
            Free plan includes 10 messages. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
