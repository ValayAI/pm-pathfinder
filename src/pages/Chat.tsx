
import React, { useState, useEffect } from 'react';
import Dashboard from '../components/Dashboard';
import MessageBubble from '../components/MessageBubble';
import PreloadedPrompts from '../components/PreloadedPrompts';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from '@/providers/AuthProvider';
import { handleChatRequest } from "@/api/chat";
import { SendIcon, Bot, Sparkles } from "lucide-react";

// Define the Message type to match what MessageBubble expects
type Message = {
  role: "user" | "assistant";
  content: string;
};

// Intro message for first-time users
const INTRO_MESSAGE: Message = {
  role: 'assistant',
  content: "👋 Hi, I'm your AI Product Management Coach! I can help with:\n\n• Interview prep & practice\n• Career & skill development\n• Product strategy & roadmapping\n• Prioritization frameworks\n• User research & insights\n\nAsk me anything about product management!"
};

// Demo message example
const DEMO_EXCHANGE: Message[] = [
  {
    role: 'user',
    content: "How do I answer 'Tell me about a product you launched'?"
  },
  {
    role: 'assistant',
    content: "Great question! The 'Tell me about a product you launched' question is testing your execution abilities and end-to-end product thinking.\n\nUse the STAR framework for a structured response:\n\n1️⃣ **Situation**: Briefly describe the context\n- What was the product/feature?\n- What was your specific role?\n\n2️⃣ **Task**: Explain the objectives\n- What problem were you solving?\n- What were the success metrics?\n\n3️⃣ **Action**: Detail your process (focus here!)\n- How did you gather requirements?\n- How did you work with different teams?\n- How did you handle challenges?\n- How did you make key decisions?\n\n4️⃣ **Result**: Share the outcomes\n- Quantify the impact (metrics, adoption)\n- What did you learn?\n- How would you improve it?\n\nKeep your answer to 2-3 minutes, focusing most on your specific contributions and decision-making process.\n\nWould you like me to help you structure a response for a specific product you've worked on?"
  }
];

const Chat = () => {
  const { user, isLoading } = useAuth();
  const [messages, setMessages] = useState<Message[]>([INTRO_MESSAGE]);
  const [newMessage, setNewMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [freeMessagesUsed, setFreeMessagesUsed] = useState(0);
  const FREE_MESSAGE_LIMIT = 2;
  const isFreeTierLimitReached = !user && freeMessagesUsed >= FREE_MESSAGE_LIMIT;
  
  // For non-authenticated users, show demo exchange after a delay
  useEffect(() => {
    if (!user && messages.length === 1) {
      const timer = setTimeout(() => {
        setMessages([INTRO_MESSAGE, ...DEMO_EXCHANGE]);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [user, messages]);
  
  // Load free message count from local storage
  useEffect(() => {
    if (!user) {
      const storedCount = localStorage.getItem('freeMessagesUsed');
      if (storedCount) {
        setFreeMessagesUsed(parseInt(storedCount));
      }
    }
  }, [user]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || isProcessing) return;
    
    // For non-authenticated users, check if they've reached the limit
    if (!user) {
      const newCount = freeMessagesUsed + 1;
      setFreeMessagesUsed(newCount);
      localStorage.setItem('freeMessagesUsed', newCount.toString());
      
      if (newCount > FREE_MESSAGE_LIMIT) {
        return; // Don't process if over limit
      }
    }
    
    const userMessage: Message = { 
      role: 'user' as const, 
      content: newMessage 
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsProcessing(true);
    
    try {
      const response = await handleChatRequest({ message: newMessage });
      const assistantMessage: Message = { 
        role: 'assistant' as const, 
        content: response.message 
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: Message = { 
        role: 'assistant' as const, 
        content: "I'm sorry, I encountered an error. Please try again later." 
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handlePromptSelect = (prompt: string) => {
    setNewMessage(prompt);
  };
  
  // Content for non-authenticated users with limit reached
  const renderLimitReachedMessage = () => (
    <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 my-6">
      <div className="flex items-start">
        <div className="bg-primary/10 p-2.5 rounded-full mr-3">
          <Sparkles className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-1">
            You've used your free messages
          </h3>
          <p className="text-muted-foreground mb-4">
            Sign up for free to continue chatting with your PM Coach and unlock all features.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild>
              <a href="/sign-up">Sign up free</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/signin">Sign in</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
  
  return (
    <Dashboard>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center">
          <div className="bg-primary/10 p-2 rounded-full mr-3">
            <Bot className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Product Management Coach</h1>
            <p className="text-muted-foreground">
              Your AI assistant for product management advice and guidance
            </p>
          </div>
        </div>

        {!user && !isLoading && (
          <div className="mb-6 bg-muted/50 rounded-lg p-4 border border-border">
            <div className="flex items-center">
              <div className="text-sm">
                <strong className="font-medium">Free preview:</strong>{' '}
                <span className="text-muted-foreground">
                  {FREE_MESSAGE_LIMIT - freeMessagesUsed} of {FREE_MESSAGE_LIMIT} free messages remaining
                </span>
              </div>
            </div>
          </div>
        )}
        
        <div className="bg-card border border-border rounded-lg mb-4 p-4 h-[calc(100vh-300px)] overflow-y-auto">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <MessageBubble
                key={index}
                message={{
                  id: `msg-${index}`,
                  role: message.role,
                  content: message.content,
                  timestamp: Date.now()
                }}
              />
            ))}
            {isProcessing && (
              <div className="flex justify-start">
                <div className="bg-muted text-muted-foreground rounded-lg px-4 py-2 max-w-[80%]">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-current animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-current animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 rounded-full bg-current animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {isFreeTierLimitReached ? (
          renderLimitReachedMessage()
        ) : (
          <>
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="flex space-x-2">
                <Textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Ask me anything about product management..."
                  className="resize-none"
                />
                <Button type="submit" disabled={!newMessage.trim() || isProcessing} size="icon" className="h-auto">
                  <SendIcon className="h-4 w-4" />
                </Button>
              </div>
            </form>
            
            <PreloadedPrompts onSelectPrompt={handlePromptSelect} />
          </>
        )}
      </div>
    </Dashboard>
  );
};

export default Chat;
