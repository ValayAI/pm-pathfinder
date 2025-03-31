
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Quote, Star } from "lucide-react";

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
    <section id="testimonials-section" className="py-24 bg-gradient-to-b from-white to-blue-50/50 dark:from-gray-900 dark:to-blue-950/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex mb-4 items-center rounded-full px-3 py-1 text-xs font-medium bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300 shadow-sm border border-purple-100/80 dark:border-purple-800/30">
            <Star className="mr-1.5 h-3.5 w-3.5 text-amber-400 fill-amber-400" />
            <span>Trusted by Product Leaders</span>
          </div>
          
          <h2 className={cn(
            "text-3xl md:text-4xl font-bold tracking-tight transition-all duration-700 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent",
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
                "bg-white dark:bg-gray-800/60 rounded-xl p-8 shadow-md border border-gray-100 dark:border-gray-700/50 transition-all duration-700 relative hover:shadow-lg hover:-translate-y-1",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                inView && `delay-[${200 + (index * 100)}ms]`
              )}
            >
              <Quote className="h-8 w-8 text-primary/20 absolute top-6 left-6 -z-10" />
              <p className="text-foreground/90 mb-6 relative">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full overflow-hidden mr-4 border-2 border-primary/10">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.author}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <div className="absolute bottom-8 right-8 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
