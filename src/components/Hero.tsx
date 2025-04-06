
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Sparkles, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function Hero() {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setLoaded(true);
  }, []);
  
  const features = [
    "Expert PM coaching",
    "AI-powered guidance",
    "Saved users 10+ hours/week",
    "Interview preparation",
    "Roadmap frameworks"
  ];
  
  return (
    <div className="relative overflow-hidden pt-20 pb-16 sm:pt-24 sm:pb-20">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute w-full h-full bg-gradient-to-b from-blue-50/80 via-indigo-50/40 to-transparent dark:from-blue-950/20 dark:via-indigo-950/10 blur-3xl opacity-70"></div>
        
        {/* Decorative elements */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-200/30 dark:bg-purple-900/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{ 
            y: [0, 15, 0], 
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-200/30 dark:bg-blue-900/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{ 
            y: [0, -15, 0], 
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1 
          }}
        />
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          {/* Pill badge */}
          <motion.div 
            className={cn(
              "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 dark:from-blue-900/30 dark:to-indigo-900/30 dark:text-blue-300 mb-5 shadow-sm border border-blue-100/50 dark:border-blue-800/30",
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
            transition={{ duration: 0.7 }}
          >
            <Sparkles className="mr-1.5 h-3.5 w-3.5 text-amber-500" />
            <span>Your PM coach, powered by AI</span>
          </motion.div>
          
          {/* Headline */}
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-outfit font-bold tracking-tight max-w-2xl mx-auto leading-tight bg-gradient-to-r from-gray-900 via-gray-700 to-gray-800 dark:from-white dark:via-gray-200 dark:to-gray-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Product Management Excellence at Your Fingertips
          </motion.h1>
          
          {/* Added tagline */}
          <motion.h2
            className="mt-4 text-xl sm:text-2xl md:text-3xl font-medium bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            Nail Your PM Interviews. Sharpen Strategy. Get Hired Faster.
          </motion.h2>
          
          {/* Subheadline */}
          <motion.p 
            className="mt-6 text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Get instant product management advice, frameworks, and career guidance with our AI-powered coaching platform.
          </motion.p>
          
          {/* CTA buttons */}
          <motion.div 
            className="mt-10 flex flex-col sm:flex-row gap-5 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <Link to="/chat">
              <div className="flex flex-col items-center">
                <Button size="lg" className="group rounded-lg px-8 py-7 h-auto text-base bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-300">
                  Chat with AI Coach
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <span className="text-xs text-muted-foreground mt-2 flex items-center">
                  <Star className="h-3 w-3 text-amber-400 fill-amber-400 mr-1" />
                  Get free AI-powered product management advice now!
                </span>
              </div>
            </Link>
            <Link to="/explore">
              <Button size="lg" variant="outline" className="rounded-lg px-8 py-7 h-auto text-base border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300">
                Explore Resources
              </Button>
            </Link>
          </motion.div>
          
          {/* Features list */}
          <motion.div 
            className="mt-14 flex flex-wrap justify-center gap-x-6 gap-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {features.map((feature, i) => (
              <motion.div 
                key={i} 
                className="flex items-center text-sm bg-white/70 dark:bg-gray-900/40 px-4 py-2 rounded-full shadow-sm border border-gray-100 dark:border-gray-800"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.5 + (i * 0.1) }}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.9)" }}
              >
                <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                <span className="font-medium">{feature}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
