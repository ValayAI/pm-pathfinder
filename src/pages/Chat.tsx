
import { useEffect, useState, useRef, FormEvent } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Send, Sparkles, Clock, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "@/hooks/use-local-storage";
import MessageBubble from "@/components/MessageBubble";
import PaywallModal from "@/components/PaywallModal";

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
  const { toast } = useToast();
  const [isVisible, setIsVisible] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Show paywall if user has reached limit
  useEffect(() => {
    if (usedMessages >= MAX_FREE_MESSAGES) {
      setShowPaywall(true);
    }
  }, [usedMessages]);

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
        toast({
          description: (
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              <span>Retrieved from cache</span>
            </div>
          ),
        });
      }, 500);
      
      setInput("");
      return;
    }
    
    setIsLoading(true);
    setInput("");
    
    try {
      const response = await fetch("api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to get response");
      }
      
      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message,
        role: "assistant",
        timestamp: Date.now(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setUsedMessages(prev => prev + 1);
      updateCache(input, data.message);
      
      // Check if this was the last free message
      if (usedMessages + 1 >= MAX_FREE_MESSAGES) {
        toast({
          title: "Free limit reached",
          description: "You've used all your free messages. Please upgrade to continue.",
          variant: "destructive",
        });
      }
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
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
    // In a real app, this would redirect to a payment page
    toast({
      title: "Upgrade initiated",
      description: `You selected the ${plan} plan. Redirecting to payment...`,
    });
    
    // For demo purposes: simulate successful payment and hide paywall
    setTimeout(() => {
      setShowPaywall(false);
      // Reset message count to simulate unlimited access
      setUsedMessages(0);
      toast({
        title: "Upgrade successful!",
        description: "You now have unlimited access to your PM Coach.",
      });
    }, 2000);
  };

  const handleLogin = () => {
    // For demo purposes only
    toast({
      title: "Login successful",
      description: "Welcome back! You now have full access.",
    });
    setShowPaywall(false);
    // Reset message count to simulate unlimited access
    setUsedMessages(0);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <div className={cn(
          "transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <div className="mb-8 text-center">
            <div className="inline-flex items-center rounded-full px-4 py-1 text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 mb-4">
              <Sparkles className="mr-2 h-4 w-4" />
              <span>Your AI PM Coach</span>
            </div>
            <h1 className="text-3xl font-bold mb-4">Chat with Your PM Coach</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Get expert guidance on product management career growth, interview preparation, and strategic decision-making.
            </p>
          </div>
          
          <Card className="bg-card/50 backdrop-blur-sm border rounded-xl shadow-md mb-4 p-4 min-h-[400px] flex flex-col">
            <div className="flex-grow overflow-y-auto mb-4 space-y-4 p-2">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 text-muted-foreground">
                  <Sparkles className="h-12 w-12 mb-4 text-purple-500/50" />
                  <p className="mb-2">Your PM Coach is ready</p>
                  <p className="text-sm">Ask about career paths, interview prep, or product strategy</p>
                </div>
              ) : (
                messages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))
              )}
              {isLoading && (
                <div className="flex items-center justify-center p-4">
                  <div className="animate-pulse flex space-x-2">
                    <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
                    <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
                    <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <form onSubmit={handleSubmit} className="flex items-center space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask your PM coach anything..."
                disabled={isLoading || usedMessages >= MAX_FREE_MESSAGES}
                className="flex-grow"
              />
              <Button 
                type="submit" 
                disabled={isLoading || !input.trim() || usedMessages >= MAX_FREE_MESSAGES}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </Card>
          
          <div className="mt-4 mb-8">
            <div className="flex justify-between text-sm mb-1">
              <span>Coaching sessions used</span>
              <span className="font-medium">{usedMessages} / {MAX_FREE_MESSAGES}</span>
            </div>
            <Progress 
              value={(usedMessages / MAX_FREE_MESSAGES) * 100} 
              className="h-2" 
              indicatorClassName="bg-purple-600"
            />
            {usedMessages >= MAX_FREE_MESSAGES && (
              <div className="mt-2 flex items-center text-destructive text-sm">
                <AlertCircle className="h-4 w-4 mr-1" />
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
            <h2 className="text-xl font-semibold mb-4">Upgrade to Premium Coaching</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Get unlimited coaching sessions, personalized feedback, and exclusive PM resources and frameworks.
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
