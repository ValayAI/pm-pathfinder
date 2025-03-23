import { useEffect, useState, useRef, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Send, Sparkles, Clock, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "@/hooks/use-local-storage";
import MessageBubble from "@/components/MessageBubble";
import PaywallModal from "@/components/PaywallModal";
import { handleChatRequest } from "@/api/chat";
import PreloadedPrompts from "@/components/PreloadedPrompts";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/providers/AuthProvider";
import { useSubscription, PlanType } from "@/providers/SubscriptionProvider";
import PMCoachTeaser from "@/components/teasers/PMCoachTeaser";

type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: number;
};

type CachedResponse = {
  query: string;
  response: string;
  timestamp: number;
};

const CACHE_EXPIRY_HOURS = 24;

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [usedMessages, setUsedMessages] = useLocalStorage<number>("usedMessages", 0);
  const [responseCache, setResponseCache] = useLocalStorage<CachedResponse[]>("responseCache", []);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  const { user } = useAuth();
  
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8 max-w-3xl">
          <PMCoachTeaser />
        </main>
        <Footer />
      </div>
    );
  }
  
  const { subscription, getRemainingMessages } = useSubscription();
  const remainingMessages = getRemainingMessages();
  const messageLimit = subscription?.messageLimit || 10;
  const hasLimitedMessages = subscription?.planId === 'free' || subscription?.planId === 'starter';
  const isPremium = subscription?.planId === 'popular' || subscription?.planId === 'pro';

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  useEffect(() => {
    if (hasLimitedMessages && remainingMessages <= 0) {
      setShowPaywall(true);
    }
  }, [usedMessages, hasLimitedMessages, remainingMessages]);

  useEffect(() => {
    toast.success("Your PM Coach is ready", {
      description: "Ask me anything about product management!",
      duration: 3000,
    });
  }, []);

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
    scrollToBottom();
    
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
        scrollToBottom();
        
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
      const data = await handleChatRequest({ message: input });
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message,
        role: "assistant",
        timestamp: Date.now(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      scrollToBottom();
      
      if (hasLimitedMessages) {
        setUsedMessages(prev => prev + 1);
      }
      
      updateCache(input, data.message);
      
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
      scrollToBottom();
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

  const getPlanFeatureMessage = () => {
    switch (subscription?.planId) {
      case 'pro':
        return "Pro plan features: Unlimited messages, coaching calls, resume review & all resources";
      case 'popular':
        return "Popular plan features: Unlimited messages, frameworks & all PM resources";
      case 'starter':
        return "Starter plan features: 50 messages/month & career tips";
      default:
        return "Free plan: 10 messages limit";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-3xl">
        <div className={cn(
          "transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <div className="mb-6 text-center">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-200 mb-3">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              <span>PM Coach</span>
            </div>
            <h1 className="text-2xl font-bold mb-2">Chat with Your PM Coach</h1>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              Get expert guidance on product management career growth and strategy
            </p>
            
            {subscription && (
              <div className="mt-2">
                <span className={cn(
                  "inline-block px-3 py-1 rounded-full text-xs font-medium",
                  subscription.planId === 'pro' ? "bg-amber-100 text-amber-800" : 
                  subscription.planId === 'popular' ? "bg-purple-100 text-purple-800" :
                  subscription.planId === 'starter' ? "bg-blue-100 text-blue-800" :
                  "bg-gray-100 text-gray-800"
                )}>
                  {subscription.planId.charAt(0).toUpperCase() + subscription.planId.slice(1)} Plan
                </span>
              </div>
            )}
          </div>
          
          <Card className="bg-card/50 backdrop-blur-sm border rounded-xl shadow-sm mb-4 overflow-hidden flex flex-col">
            <ScrollArea className="h-[450px] px-4 py-4 overflow-y-auto" ref={scrollAreaRef}>
              <div className="space-y-3 pb-2">
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8 min-h-[350px]">
                    <Sparkles className="h-10 w-10 mb-4 text-purple-500/50" />
                    <p className="text-lg font-medium mb-1">Your PM Coach is ready</p>
                    <p className="text-sm text-muted-foreground mb-6 max-w-xs">
                      Ask about career paths, interview prep, or product strategy
                    </p>
                    
                    <div className="max-w-md w-full">
                      <PreloadedPrompts onSelectPrompt={handleSelectPrompt} />
                    </div>
                  </div>
                ) : (
                  messages.map((message) => (
                    <MessageBubble key={message.id} message={message} />
                  ))
                )}
                {isLoading && (
                  <div className="flex items-center justify-center py-2">
                    <div className="flex space-x-1.5">
                      <div className="h-2 w-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <div className="h-2 w-2 bg-purple-500 rounded-full animate-bounce animation-delay-200"></div>
                      <div className="h-2 w-2 bg-purple-600 rounded-full animate-bounce animation-delay-400"></div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            
            <div className="p-3 border-t bg-background/80 backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask your PM coach anything..."
                  disabled={isLoading || (hasLimitedMessages && remainingMessages <= 0)}
                  className="flex-grow bg-background/50"
                />
                <Button 
                  type="submit" 
                  size="icon"
                  disabled={isLoading || !input.trim() || (hasLimitedMessages && remainingMessages <= 0)}
                  className="bg-purple-600 hover:bg-purple-700 h-10 w-10 rounded-full flex-shrink-0"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </Card>
          
          {hasLimitedMessages && (
            <div className="mt-4 mb-6">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Coaching sessions used</span>
                <span className="font-medium">{usedMessages} / {messageLimit}</span>
              </div>
              <Progress 
                value={(usedMessages / messageLimit) * 100} 
                className="h-1.5" 
                indicatorClassName={cn(
                  subscription?.planId === 'starter' ? "bg-blue-600" : "bg-purple-600"
                )}
              />
              {remainingMessages <= 0 && (
                <div className="mt-2 flex items-center text-destructive text-xs">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  <span>You've reached your coaching limit</span>
                </div>
              )}
              {remainingMessages > 0 && (
                <p className="text-xs text-muted-foreground mt-1">
                  You have {remainingMessages} coaching {remainingMessages === 1 ? 'session' : 'sessions'} remaining
                </p>
              )}
            </div>
          )}
          
          <div className="text-center mt-4 mb-6">
            <div className="inline-block px-3 py-1 rounded-md text-xs bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
              {getPlanFeatureMessage()}
            </div>
          </div>
          
          {(subscription?.planId === 'free' || subscription?.planId === 'starter') && (
            <div className="text-center mt-8">
              <h2 className="text-lg font-semibold mb-3">Upgrade to Premium Coaching</h2>
              <p className="text-muted-foreground text-sm mb-5 max-w-xs mx-auto">
                Get unlimited coaching sessions and exclusive PM resources
              </p>
              <Button 
                size="lg" 
                onClick={() => setShowPaywall(true)}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Unlock Premium Coaching
              </Button>
            </div>
          )}
          
          {subscription?.planId === 'popular' && (
            <div className="text-center mt-8">
              <h2 className="text-lg font-semibold mb-3">Upgrade to Pro Coaching</h2>
              <p className="text-muted-foreground text-sm mb-5 max-w-xs mx-auto">
                Get 1-on-1 PM coaching calls and personalized resume reviews
              </p>
              <Button 
                size="lg" 
                onClick={() => navigate('/pricing')}
                className="bg-amber-600 hover:bg-amber-700"
              >
                Upgrade to Pro
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
      
      <PaywallModal 
        open={showPaywall} 
        onOpenChange={setShowPaywall}
        onUpgrade={handleUpgrade}
        onLogin={handleLogin}
        requiredFeature={subscription?.planId === 'free' ? "Unlimited Messages" : undefined}
      />
    </div>
  );
};

export default Chat;
