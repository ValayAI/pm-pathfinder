
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Quote } from "lucide-react";

export function TestimonialsSection() {
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
    
    const element = document.getElementById('testimonials-section');
    if (element) observer.observe(element);
    
    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);
  
  const testimonials = [
    {
      quote: "PM Pathfinder helped me transition from engineering to product management at a leading tech company. The interview preparation was invaluable.",
      author: "Sarah Chen",
      role: "Senior PM at Dropbox",
      avatar: "https://i.pravatar.cc/150?img=32"
    },
    {
      quote: "The frameworks and guidance provided by PM Pathfinder revolutionized how I approach product strategy and stakeholder management.",
      author: "Michael Johnson",
      role: "Product Lead at Stripe",
      avatar: "https://i.pravatar.cc/150?img=12"
    },
    {
      quote: "As someone pivoting into product from marketing, the industry-specific resources were exactly what I needed to succeed in my interviews.",
      author: "Priya Sharma",
      role: "PM at Airbnb",
      avatar: "https://i.pravatar.cc/150?img=25"
    }
  ];
  
  return (
    <section id="testimonials-section" className="py-8 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className={cn(
            "text-3xl md:text-4xl font-bold tracking-tight transition-all duration-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            Success Stories from Product Leaders
          </h2>
          <p className={cn(
            "mt-4 text-lg text-muted-foreground max-w-2xl mx-auto transition-all duration-700 delay-100",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            Hear from product managers who transformed their careers with our guidance
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className={cn(
                "bg-card rounded-xl p-8 shadow-sm border border-border transition-all duration-700 relative",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                inView && `delay-[${200 + (index * 100)}ms]`
              )}
            >
              <Quote className="h-8 w-8 text-primary/30 absolute top-6 left-6 -z-10" />
              <p className="text-foreground/90 mb-6 relative">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.author}
                  className="h-12 w-12 rounded-full object-cover mr-4"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-medium">{testimonial.author}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
