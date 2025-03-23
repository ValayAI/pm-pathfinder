
import { useState, FormEvent } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { chatWithOpenAI } from "@/api/chat";
import { Message, CachedResponse } from "@/types/chat";
import { useSubscription } from "@/providers/SubscriptionProvider";
import { Clock } from "lucide-react";

const CACHE_EXPIRY_HOURS = 24;

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [usedMessages, setUsedMessages] = useLocalStorage<number>("usedMessages", 0);
  const [responseCache, setResponseCache] = useLocalStorage<CachedResponse[]>("responseCache", []);
  const [isVisible, setIsVisible] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const navigate = useNavigate();
  
  const { subscription, getRemainingMessages } = useSubscription();
  const remainingMessages = getRemainingMessages();
  const messageLimit = subscription?.messageLimit || 10;
  const hasLimitedMessages = subscription?.planId === 'free' || subscription?.planId === 'starter';
  const isPremium = subscription?.planId === 'popular' || subscription?.planId === 'pro';

  const checkCache = (query: string): string | null => {
    const normalizedQuery = query.trim().toLowerCase();
    const now = Date.now();
    const expiryTime = CACHE_EXPIRY_HOURS * 60 * 60 * 1000;
    
    const cachedItem = responseCache.find(item => 
      item.query.toLowerCase() === normalizedQuery && 
      (now - item.timestamp) < expiryTime
    );
    
    return cachedItem ? cachedItem.response : null;
  };

  const updateCache = (query: string, response: string) => {
    const normalizedQuery = query.trim();
    const now = Date.now();
    
    const expiryTime = CACHE_EXPIRY_HOURS * 60 * 60 * 1000;
    const validCache = responseCache.filter(item => (now - item.timestamp) < expiryTime);
    
    const newCache = [...validCache, { query: normalizedQuery, response, timestamp: now }];
    
    if (newCache.length > 50) {
      newCache.shift();
    }
    
    setResponseCache(newCache);
  };

  const handleSelectPrompt = (prompt: string) => {
    setInput(prompt);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    if (hasLimitedMessages && remainingMessages <= 0) {
      setShowPaywall(true);
      return;
    }
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: Date.now(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    const cachedResponse = checkCache(input);
    
    if (cachedResponse) {
      setTimeout(() => {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: cachedResponse,
          role: "assistant",
          timestamp: Date.now(),
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        
        toast("Retrieved from cache", {
          icon: <Clock className="h-4 w-4" />,
        });
      }, 500);
      
      setInput("");
      return;
    }
    
    setIsLoading(true);
    setInput("");
    
    try {
      const response = await chatWithOpenAI(input);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: "assistant",
        timestamp: Date.now(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
      if (hasLimitedMessages) {
        setUsedMessages(prev => prev + 1);
      }
      
      updateCache(input, response);
      
      if (hasLimitedMessages && remainingMessages <= 1) {
        toast.error("Message limit reached", {
          description: "You've used all your free messages. Please upgrade to continue.",
        });
      } else if (hasLimitedMessages && remainingMessages <= 5) {
        toast.warning("Message limit approaching", {
          description: `You have ${remainingMessages - 1} messages remaining in your plan.`,
        });
      }
      
    } catch (error) {
      console.error("Chat error:", error);
      
      toast.error("Error", {
        description: "Failed to get response. Please try again.",
      });
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I couldn't process your request. Please try again.",
        role: "assistant",
        timestamp: Date.now(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpgrade = (plan: string) => {
    toast.success("Upgrade successful!", {
      description: `You now have unlimited access to your PM Coach with the ${plan} plan.`,
    });
    
    setShowPaywall(false);
  };

  const handleLogin = () => {
    navigate('/signin');
  };

  return {
    messages,
    input,
    setInput,
    isLoading,
    usedMessages,
    messageLimit,
    remainingMessages,
    hasLimitedMessages,
    isPremium,
    isVisible,
    setIsVisible,
    showPaywall,
    setShowPaywall,
    subscription,
    handleSelectPrompt,
    handleSubmit,
    handleUpgrade,
    handleLogin
  };
}
