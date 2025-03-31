
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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
        <div className="absolute top-0 w-full h-full bg-gradient-to-b from-transparent via-blue-50/50 to-blue-50/80 dark:from-transparent dark:via-blue-950/10 dark:to-blue-950/20"></div>
        <motion.div 
          className="absolute top-20 left-1/4 w-64 h-64 bg-indigo-200/20 dark:bg-indigo-900/10 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{ 
            x: [0, 20, 0], 
            y: [0, -20, 0], 
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
      </div>
    
      <div className="container mx-auto">
        <motion.div 
          className={cn(
            "text-center glass-effect rounded-2xl py-16 px-10 max-w-3xl mx-auto shadow-xl border border-white/70 dark:border-white/5 bg-white/80 dark:bg-gray-900/70 backdrop-blur-lg",
          )}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ 
            opacity: inView ? 1 : 0, 
            scale: inView ? 1 : 0.95,
            y: inView ? 0 : 20
          }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.div 
            className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300 mb-5 shadow-sm border border-blue-100/80 dark:border-blue-800/30"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -10 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Sparkles className="mr-1.5 h-3.5 w-3.5 text-amber-500" />
            <span>Start your PM journey today</span>
          </motion.div>
          
          <motion.h2 
            className="text-3xl sm:text-4xl font-outfit font-bold mb-5 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -10 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Get Instant Product Management Guidance
          </motion.h2>
          
          <motion.p 
            className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto mb-10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -10 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Try our AI-powered PM coach for free. Get answers to your product management questions, career advice, and strategic guidance.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-5 justify-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -10 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Link to="/chat">
              <Button size="lg" className="rounded-lg px-8 py-7 h-auto text-base bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-300">
                Chat with AI Coach
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/explore">
              <Button size="lg" variant="outline" className="rounded-lg px-8 py-7 h-auto text-base border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300">
                Explore Resources
              </Button>
            </Link>
          </motion.div>
          
          <motion.p 
            className="mt-8 text-xs text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Free plan includes 10 messages. No credit card required.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

export default CTASection;
