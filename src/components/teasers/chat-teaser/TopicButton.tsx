
import React from 'react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface TopicButtonProps {
  topic: string;
  onClick: () => void;
  disabled: boolean;
  delay?: number;
}

const TopicButton = ({ topic, onClick, disabled, delay = 0 }: TopicButtonProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.3, 
        delay: delay,
        ease: "easeOut" 
      }}
    >
      <Button 
        variant="outline" 
        size="sm" 
        className="text-sm bg-muted/30 border-primary/10 hover:bg-muted/50 hover:border-primary/20 transition-all w-full"
        onClick={onClick}
        disabled={disabled}
      >
        {topic}
      </Button>
    </motion.div>
  );
};

export default TopicButton;
