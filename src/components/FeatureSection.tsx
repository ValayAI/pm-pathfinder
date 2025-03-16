
import { cn } from "@/lib/utils";
import { 
  BookText, Users, Award, BarChart3, Target, Briefcase, 
  BookOpen, MessageCircle, GraduationCap 
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
      title: "Career Pathways",
      description: "Personalized guidance for your product management journey, from junior to executive roles.",
      icon: <GraduationCap />
    },
    {
      title: "Interview Preparation",
      description: "Focused coaching for product management interviews at top tech companies.",
      icon: <Briefcase />
    },
    {
      title: "PM Frameworks",
      description: "Curated collection of frameworks for prioritization, roadmapping, and decision-making.",
      icon: <Target />
    },
    {
      title: "Industry Insights",
      description: "Specialized knowledge for B2B, B2C, fintech, SaaS, and other industry verticals.",
      icon: <BarChart3 />
    },
    {
      title: "Expert Mentorship",
      description: "Connect with experienced product leaders for personalized coaching sessions.",
      icon: <MessageCircle />
    },
    {
      title: "Resource Library",
      description: "Extensive collection of templates, guides, and best practices for product managers.",
      icon: <BookOpen />
    },
  ];
  
  return (
    <section id="feature-section" className="py-24 relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={cn(
            "text-3xl md:text-4xl font-bold tracking-tight transition-all duration-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            Everything You Need to Excel in Product Management
          </h2>
          <p className={cn(
            "mt-4 text-lg text-muted-foreground max-w-2xl mx-auto transition-all duration-700 delay-100",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            Comprehensive resources and guidance tailored to your specific product management needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={cn(
                "glass-card glass-card-hover rounded-xl p-6 transition-all duration-700",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                inView && `delay-[${200 + (index * 100)}ms]`
              )}
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-5">
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
