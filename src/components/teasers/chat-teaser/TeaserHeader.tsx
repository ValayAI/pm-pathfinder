
import React from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface TeaserHeaderProps {
  loaded: boolean;
}

const TeaserHeader = ({ loaded }: TeaserHeaderProps) => {
  return (
    <motion.div 
      className={cn(
        "relative mb-16 mt-12",
        loaded ? "opacity-100" : "opacity-0"
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 hidden md:block">
        <Sparkles className="text-indigo-600/60 h-12 w-12 animate-pulse" />
      </div>
      <div className="text-center">
        <motion.h2 
          className="text-3xl md:text-4xl font-semibold leading-tight md:leading-snug tracking-tight mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <span className="bg-gradient-to-br from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Accelerate your PM career
          </span>
        </motion.h2>
        <motion.p 
          className="text-muted-foreground max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Get expert product management advice and career guidance whenever you need it
        </motion.p>
      </div>
    </motion.div>
  );
};

export default TeaserHeader;
