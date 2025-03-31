
import React, { useRef, useEffect } from 'react';
import ChatBubble from './ChatBubble';
import { motion } from "framer-motion";

interface ChatMessagesProps {
  messages: {
    role: string;
    content: string;
  }[];
  isTyping: boolean;
  chatContainerRef: React.RefObject<HTMLDivElement>;
}

const ChatMessages = ({ messages, isTyping, chatContainerRef }: ChatMessagesProps) => {
  return (
    <div 
      ref={chatContainerRef}
      className="bg-muted/20 backdrop-blur-sm rounded-lg p-4 mb-5 h-[320px] overflow-y-auto shadow-inner border"
    >
      {messages.map((msg, index) => (
        <ChatBubble 
          key={index} 
          message={msg} 
          delay={index * 0.1}
        />
      ))}
      
      {isTyping && (
        <motion.div 
          className="mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="inline-block p-3 rounded-lg max-w-[85%] bg-card border">
            <div className="flex space-x-2">
              <div className="h-2 w-2 bg-primary/40 rounded-full animate-bounce"></div>
              <div className="h-2 w-2 bg-primary/60 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="h-2 w-2 bg-primary/80 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ChatMessages;
