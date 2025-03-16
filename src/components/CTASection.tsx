
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
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
    <section id="cta-section" className="py-24 relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-primary/5 mix-blend-multiply"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] aspect-square bg-gradient-to-b from-primary/10 via-transparent to-transparent blur-3xl opacity-60"></div>
      </div>
    
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn(
          "glass-card rounded-3xl p-12 md:p-16 text-center transition-all duration-700",
          inView ? "opacity-100 scale-100" : "opacity-0 scale-95"
        )}>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Ready to Accelerate Your Product Management Career?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Join thousands of product managers who have transformed their careers with PM Pathfinder's expert guidance and resources.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="group">
              Get Started Now
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline">
              Explore Membership Options
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
