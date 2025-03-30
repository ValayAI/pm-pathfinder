
import { useState, FormEvent, useEffect } from "react";
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
  
  const { subscription, getRemainingMessages, refreshSubscription } = useSubscription();
  const remainingMessages = getRemainingMessages();
  const messageLimit = subscription?.messageLimit || 5; // Default to 5 instead of 10
  const hasLimitedMessages = subscription?.planId === 'free' || subscription?.planId === 'starter';
  const isPremium = subscription?.planId === 'popular' || subscription?.planId === 'pro';

  // When component mounts, refresh subscription data to ensure we have accurate limits
  useEffect(() => {
    refreshSubscription();
  }, []);

  // Only show paywall if user has actually used up their messages
  useEffect(() => {
    // Only check limits for authenticated users with limited plans
    if (hasLimitedMessages && remainingMessages <= 0 && usedMessages > 0) {
      setShowPaywall(true);
    } else {
      setShowPaywall(false);
    }
  }, [hasLimitedMessages, remainingMessages, usedMessages, messageLimit]);

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
    
    // Check if user has remaining messages before proceeding
    if (hasLimitedMessages && remainingMessages <= 0 && usedMessages > 0) {
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
      
      // Increment used messages count if on a limited plan
      if (hasLimitedMessages) {
        const newUsedCount = usedMessages + 1;
        setUsedMessages(newUsedCount);
        
        // Refresh subscription data to get updated message count
        await refreshSubscription();
        
        // Check if we should show warning or paywall message
        if (newUsedCount >= messageLimit) {
          toast.error("Message limit reached", {
            description: "You've used all your free messages. Please upgrade to continue.",
          });
          
          // Show paywall after a short delay
          setTimeout(() => {
            setShowPaywall(true);
          }, 1500);
        } else if (messageLimit - newUsedCount <= 2) { // Changed from 3 to 2 for 5 message limit
          toast.warning("Message limit approaching", {
            description: `You have ${messageLimit - newUsedCount} messages remaining in your plan.`,
          });
        }
      }
      
      updateCache(input, response);
      
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

  const handleUpgrade = async (plan: string) => {
    toast.success("Upgrade successful!", {
      description: `You now have unlimited access to your PM Coach with the ${plan} plan.`,
    });
    
    setShowPaywall(false);
    await refreshSubscription();
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
