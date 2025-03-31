import { useState, FormEvent, useEffect, useCallback, useRef } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { chatWithOpenAI } from "@/api/chat";
import { Message, CachedResponse } from "@/types/chat";
import { useSubscription } from "@/providers/SubscriptionProvider";
import { Clock } from "lucide-react";
import { supabase, cachedSupabase } from "@/lib/supabase";

const CACHE_EXPIRY_HOURS = 24;
const SUBSCRIPTION_REFRESH_INTERVAL = 60 * 1000; // 1 minute

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
  const messageLimit = subscription?.messageLimit || 5;
  const hasLimitedMessages = subscription?.planId === 'free' || subscription?.planId === 'starter';
  const isPremium = subscription?.planId === 'popular' || subscription?.planId === 'pro';
  
  const lastRefreshTimeRef = useRef<number>(Date.now());
  
  useEffect(() => {
    const now = Date.now();
    if (now - lastRefreshTimeRef.current > SUBSCRIPTION_REFRESH_INTERVAL) {
      refreshSubscription();
      lastRefreshTimeRef.current = now;
    }
  }, [refreshSubscription]);

  useEffect(() => {
    if (hasLimitedMessages && remainingMessages <= 0 && usedMessages > 0) {
      setShowPaywall(true);
    } else {
      setShowPaywall(false);
    }
  }, [hasLimitedMessages, remainingMessages, usedMessages, messageLimit]);

  const checkCache = useCallback((query: string): string | null => {
    const normalizedQuery = query.trim().toLowerCase();
    const now = Date.now();
    const expiryTime = CACHE_EXPIRY_HOURS * 60 * 60 * 1000;
    
    const cachedItem = responseCache.find(item => 
      item.query.toLowerCase() === normalizedQuery && 
      (now - item.timestamp) < expiryTime
    );
    
    return cachedItem ? cachedItem.response : null;
  }, [responseCache]);

  const updateCache = useCallback((query: string, response: string) => {
    const normalizedQuery = query.trim();
    const now = Date.now();
    
    const expiryTime = CACHE_EXPIRY_HOURS * 60 * 60 * 1000;
    const validCache = responseCache.filter(item => (now - item.timestamp) < expiryTime);
    
    const newCache = [...validCache, { query: normalizedQuery, response, timestamp: now }];
    
    if (newCache.length > 50) {
      newCache.shift();
    }
    
    setResponseCache(newCache);
  }, [responseCache, setResponseCache]);

  const handleSelectPrompt = useCallback((prompt: string) => {
    setInput(prompt);
  }, []);

  const debouncedIncrementMessageUsage = useCallback(async (userId: string) => {
    try {
      const cacheKey = `message_usage_${userId}`;
      
      const { data, error: checkError } = await cachedSupabase.cachedSelect(
        'message_usage',
        '*',
        cacheKey,
        60000 // 1 minute cache
      );
      
      if (checkError) {
        throw checkError;
      }
      
      const userUsage = data.find(item => item.user_id === userId);
      
      if (!userUsage) {
        await supabase
          .from('message_usage')
          .insert({
            user_id: userId,
            messages_used: 1,
            last_updated: new Date().toISOString()
          });
      } else {
        await supabase
          .from('message_usage')
          .update({ 
            messages_used: userUsage.messages_used + 1,
            last_updated: new Date().toISOString()
          })
          .eq('user_id', userId);
      }
      
      cachedSupabase.clearCache(cacheKey);
      
      return true;
    } catch (error) {
      console.error('Error incrementing message usage:', error);
      return false;
    }
  }, []);

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
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
      
      if (hasLimitedMessages) {
        const newUsedCount = usedMessages + 1;
        setUsedMessages(newUsedCount);
        
        const now = Date.now();
        if (now - lastRefreshTimeRef.current > SUBSCRIPTION_REFRESH_INTERVAL) {
          await refreshSubscription();
          lastRefreshTimeRef.current = now;
        }
        
        if (newUsedCount >= messageLimit) {
          toast.error("Message limit reached", {
            description: "You've used all your free messages. Please upgrade to continue.",
          });
          
          setTimeout(() => {
            setShowPaywall(true);
          }, 1500);
        } else if (messageLimit - newUsedCount <= 2) {
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
  }, [input, hasLimitedMessages, remainingMessages, usedMessages, checkCache, messageLimit, refreshSubscription, updateCache]);

  const handleUpgrade = useCallback(async (plan: string) => {
    toast.success("Upgrade successful!", {
      description: `You now have unlimited access to your PM Coach with the ${plan} plan.`,
    });
    
    setShowPaywall(false);
    await refreshSubscription();
  }, [refreshSubscription]);

  const handleLogin = useCallback(() => {
    navigate('/signin');
  }, [navigate]);

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
