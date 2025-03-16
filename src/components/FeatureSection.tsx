
import { cn } from "@/lib/utils";
import { 
  MessageSquareText, Lightbulb, Compass, BarChart3, Target, Award
} from "lucide-react";
import { useState, useEffect } from "react";

export function FeatureSection() {
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
    
    const element = document.getElementById('feature-section');
    if (element) observer.observe(element);
    
    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);
  
  const features = [
    {
      title: "AI PM Assistant",
      description: "Get instant answers to your product management questions from our AI-powered assistant.",
      icon: <MessageSquareText />
    },
    {
      title: "Framework Library",
      description: "Access proven PM frameworks for prioritization, roadmapping, and decision-making.",
      icon: <Compass />
    },
    {
      title: "Career Insights",
      description: "Actionable career advice to help you advance your PM journey from junior to executive roles.",
      icon: <Award />
    },
    {
      title: "Interview Prep",
      description: "Prepare for PM interviews with guided practice questions and expert feedback.",
      icon: <Lightbulb />
    },
    {
      title: "Metrics Guide",
      description: "Learn how to define, track, and analyze the right metrics for product success.",
      icon: <BarChart3 />
    },
    {
      title: "Goal Setting",
      description: "Techniques for setting effective product goals that align with business objectives.",
      icon: <Target />
    },
  ];
  
  return (
    <section id="feature-section" className="py-20 relative bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={cn(
            "text-3xl font-bold tracking-tight transition-all duration-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            Everything You Need to Excel in Product Management
          </h2>
          <p className={cn(
            "mt-4 text-lg text-muted-foreground max-w-2xl mx-auto transition-all duration-700 delay-100",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            Simple, powerful tools and resources to help you become a better product manager
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={cn(
                "bg-background rounded-xl p-6 shadow border border-border/50 transition-all duration-700 hover:shadow-md hover:border-primary/20 hover:translate-y-[-2px]",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                inView && `delay-[${200 + (index * 100)}ms]`
              )}
            >
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeatureSection;
