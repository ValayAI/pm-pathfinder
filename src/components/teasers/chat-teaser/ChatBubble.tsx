
import React from 'react';
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ChatBubbleProps {
  message: {
    role: string;
    content: string;
  };
  delay?: number;
}

const ChatBubble = ({ message, delay = 0 }: ChatBubbleProps) => {
  const isUser = message.role === 'user';
  
  return (
    <motion.div 
      className={cn("mb-4", isUser ? "text-right" : "")}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.3, 
        delay: delay,
        ease: "easeOut" 
      }}
    >
      <div 
        className={cn(
          "inline-block p-3 rounded-lg max-w-[85%] shadow-sm", 
          isUser 
            ? "bg-primary text-primary-foreground" 
            : "bg-card border animate-fade-in"
        )}
      >
        {message.content.split('\n').map((line, i) => (
          <React.Fragment key={i}>
            {line}
            {i !== message.content.split('\n').length - 1 && <br />}
          </React.Fragment>
        ))}
      </div>
    </motion.div>
  );
};

export default ChatBubble;
