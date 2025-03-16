
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
    <section id="cta-section" className="py-20 relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 w-full h-full bg-primary/5"></div>
      </div>
    
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn(
          "text-center transition-all duration-700",
          inView ? "opacity-100 scale-100" : "opacity-0 scale-95"
        )}>
          <div className="inline-flex items-center rounded-full px-4 py-1 text-sm font-medium bg-primary/10 text-primary mb-4">
            <Sparkles className="mr-2 h-4 w-4" />
            <span>Start your PM journey today</span>
          </div>
          
          <h2 className="text-3xl font-bold tracking-tight mb-6">
            Get Instant Product Management Guidance
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Try our AI-powered PM coach for free. Get answers to your product management questions, career advice, and strategic guidance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/chat">
              <Button size="lg" className="group bg-gradient-to-r from-primary to-primary/80 shadow-lg shadow-primary/10">
                <MessageSquareText className="mr-2 h-5 w-5" />
                Chat with AI Coach
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              Explore Resources
            </Button>
          </div>
          
          <p className="mt-6 text-sm text-muted-foreground">
            Free plan includes 10 messages. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
