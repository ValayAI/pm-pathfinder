
import { useEffect, useState, useRef, FormEvent } from "react";
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
import { handleChatRequest } from "@/api/chat.tsx";
import PreloadedPrompts from "@/components/PreloadedPrompts";
import { ScrollArea } from "@/components/ui/scroll-area";

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

const MAX_FREE_MESSAGES = 10;
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

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Auto-scroll when messages change
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [messages]);

  useEffect(() => {
    if (usedMessages >= MAX_FREE_MESSAGES) {
      setShowPaywall(true);
    }
  }, [usedMessages]);

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
    
    if (usedMessages >= MAX_FREE_MESSAGES) {
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
      const data = await handleChatRequest({ message: input });
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message,
        role: "assistant",
        timestamp: Date.now(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setUsedMessages(prev => prev + 1);
      updateCache(input, data.message);
      
      if (usedMessages + 1 >= MAX_FREE_MESSAGES) {
        toast.error("Free limit reached", {
          description: "You've used all your free messages. Please upgrade to continue.",
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
    toast.success("Upgrade initiated", {
      description: `You selected the ${plan} plan. Redirecting to payment...`,
    });
    
    setTimeout(() => {
      setShowPaywall(false);
      setUsedMessages(0);
      
      toast.success("Upgrade successful!", {
        description: "You now have unlimited access to your PM Coach.",
      });
    }, 2000);
  };

  const handleLogin = () => {
    toast.success("Login successful", {
      description: "Welcome back! You now have full access.",
    });
    setShowPaywall(false);
    setUsedMessages(0);
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
          </div>
          
          <Card className="bg-card/50 backdrop-blur-sm border rounded-xl shadow-sm mb-4 overflow-hidden flex flex-col">
            <ScrollArea ref={scrollAreaRef} className="h-[450px] p-4">
              <div className="space-y-6 pb-2">
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8 min-h-[350px]">
                    <Sparkles className="h-10 w-10 mb-4 text-purple-500/50" />
                    <p className="text-lg font-medium mb-1">Your PM Coach is ready</p>
                    <p className="text-sm text-muted-foreground mb-8 max-w-xs">
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
                  disabled={isLoading || usedMessages >= MAX_FREE_MESSAGES}
                  className="flex-grow bg-background/50"
                />
                <Button 
                  type="submit" 
                  size="icon"
                  disabled={isLoading || !input.trim() || usedMessages >= MAX_FREE_MESSAGES}
                  className="bg-purple-600 hover:bg-purple-700 h-10 w-10 rounded-full flex-shrink-0"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </Card>
          
          <div className="mt-4 mb-6">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">Coaching sessions used</span>
              <span className="font-medium">{usedMessages} / {MAX_FREE_MESSAGES}</span>
            </div>
            <Progress 
              value={(usedMessages / MAX_FREE_MESSAGES) * 100} 
              className="h-1.5" 
              indicatorClassName="bg-purple-600"
            />
            {usedMessages >= MAX_FREE_MESSAGES && (
              <div className="mt-2 flex items-center text-destructive text-xs">
                <AlertCircle className="h-3 w-3 mr-1" />
                <span>You've reached your free coaching limit</span>
              </div>
            )}
            {usedMessages > 0 && usedMessages < MAX_FREE_MESSAGES && (
              <p className="text-xs text-muted-foreground mt-1">
                You have {MAX_FREE_MESSAGES - usedMessages} free coaching sessions remaining
              </p>
            )}
          </div>
          
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
        </div>
      </main>
      <Footer />
      
      <PaywallModal 
        open={showPaywall} 
        onOpenChange={setShowPaywall}
        onUpgrade={handleUpgrade}
        onLogin={handleLogin}
      />
    </div>
  );
}

export default Chat;
