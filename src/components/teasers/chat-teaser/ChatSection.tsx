
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Bot } from 'lucide-react';
import { motion } from "framer-motion";
import { ChatProvider, useChatContext } from './ChatContext';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import TopicButtonGroup from './TopicButtonGroup';

const ChatSectionContent = () => {
  const {
    message,
    setMessage,
    messages,
    hasInteracted,
    isTyping,
    chatContainerRef,
    handleSendMessage,
    handleTopicClick
  } = useChatContext();

  return (
    <Card className="mb-16 shadow-xl border rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
      <CardHeader className="pb-3 bg-gradient-to-r from-primary/5 via-primary/10 to-transparent">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-indigo-500/20 to-blue-500/20 p-3 rounded-lg">
            <Bot className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">PM Coach</h3>
            <p className="text-sm text-muted-foreground">Powered by AI</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-6">
        <ChatMessages 
          messages={messages} 
          isTyping={isTyping} 
          chatContainerRef={chatContainerRef} 
        />
        
        <ChatInput 
          message={message}
          setMessage={setMessage}
          handleSendMessage={handleSendMessage}
          disabled={hasInteracted}
        />
      </CardContent>
      
      <CardFooter className="flex flex-col gap-5 bg-gradient-to-b from-muted/20 via-muted/10 to-transparent">
        <TopicButtonGroup 
          hasInteracted={hasInteracted} 
          handleTopicClick={handleTopicClick} 
        />
      </CardFooter>
    </Card>
  );
};

const ChatSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <ChatProvider>
        <ChatSectionContent />
      </ChatProvider>
    </motion.div>
  );
};

export default ChatSection;
