
import React from 'react';
import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  message: {
    role: string;
    content: string;
  };
}

const ChatBubble = ({ message }: ChatBubbleProps) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={cn("mb-4", isUser ? "text-right" : "")}>
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
    </div>
  );
};

export default ChatBubble;
