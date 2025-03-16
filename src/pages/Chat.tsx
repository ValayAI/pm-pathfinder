
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

// Message type definition
type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: number;
};

// Response cache type
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

  useEffect(() => {
    setIsVisible(true);
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const checkCache = (query: string): string | null => {
    const normalizedQuery = query.trim().toLowerCase();
    const now = Date.now();
    const expiryTime = CACHE_EXPIRY_HOURS * 60 * 60 * 1000; // Convert hours to milliseconds
    
    const cachedItem = responseCache.find(item => 
      item.query.toLowerCase() === normalizedQuery && 
      (now - item.timestamp) < expiryTime
    );
    
    return cachedItem ? cachedItem.response : null;
  };

  const updateCache = (query: string, response: string) => {
    const normalizedQuery = query.trim();
    const now = Date.now();
    
    // Remove expired items
    const expiryTime = CACHE_EXPIRY_HOURS * 60 * 60 * 1000;
    const validCache = responseCache.filter(item => (now - item.timestamp) < expiryTime);
    
    // Add new response to cache
    const newCache = [...validCache, { query: normalizedQuery, response, timestamp: now }];
    
    // Limit cache size to last 50 items
    if (newCache.length > 50) {
      newCache.shift();
    }
    
    setResponseCache(newCache);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    if (usedMessages >= MAX_FREE_MESSAGES) {
      toast({
        title: "Message limit reached",
        description: "You've reached your free message limit. Please upgrade to continue.",
        variant: "destructive",
      });
      return;
    }
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: Date.now(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Check cache first
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
          description: "Retrieved from cache",
          icon: <Clock className="h-4 w-4" />,
        });
      }, 500); // Small delay to make it feel more natural
      
      setInput("");
      return;
    }
    
    setIsLoading(true);
    setInput("");
    
    try {
      // Call OpenAI API
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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <div className={cn(
          "transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <div className="mb-8 text-center">
            <div className="inline-flex items-center rounded-full px-4 py-1 text-sm font-medium bg-primary/10 text-primary mb-4">
              <Sparkles className="mr-2 h-4 w-4" />
              <span>AI-Powered Product Management Assistant</span>
            </div>
            <h1 className="text-3xl font-bold mb-4">Chat with Your PM Coach</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Get instant advice on product strategy, career growth, interview preparation, and more.
            </p>
          </div>
          
          <Card className="bg-card/50 backdrop-blur-sm border rounded-xl shadow-md mb-4 p-4 min-h-[400px] flex flex-col">
            <div className="flex-grow overflow-y-auto mb-4 space-y-4 p-2">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 text-muted-foreground">
                  <Sparkles className="h-12 w-12 mb-4 text-primary/50" />
                  <p className="mb-2">No messages yet</p>
                  <p className="text-sm">Ask any product management question to get started</p>
                </div>
              ) : (
                messages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))
              )}
              {isLoading && (
                <div className="flex items-center justify-center p-4">
                  <div className="animate-pulse flex space-x-2">
                    <div className="h-2 w-2 bg-primary rounded-full"></div>
                    <div className="h-2 w-2 bg-primary rounded-full"></div>
                    <div className="h-2 w-2 bg-primary rounded-full"></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <form onSubmit={handleSubmit} className="flex items-center space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about product management..."
                disabled={isLoading || usedMessages >= MAX_FREE_MESSAGES}
                className="flex-grow"
              />
              <Button 
                type="submit" 
                disabled={isLoading || !input.trim() || usedMessages >= MAX_FREE_MESSAGES}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </Card>
          
          <div className="mt-4 mb-8">
            <div className="flex justify-between text-sm mb-1">
              <span>Messages used</span>
              <span className="font-medium">{usedMessages} / {MAX_FREE_MESSAGES}</span>
            </div>
            <Progress value={(usedMessages / MAX_FREE_MESSAGES) * 100} className="h-2" />
            {usedMessages >= MAX_FREE_MESSAGES && (
              <div className="mt-2 flex items-center text-destructive text-sm">
                <AlertCircle className="h-4 w-4 mr-1" />
                <span>You've reached your free message limit</span>
              </div>
            )}
            {usedMessages > 0 && usedMessages < MAX_FREE_MESSAGES && (
              <p className="text-xs text-muted-foreground mt-1">
                You have {MAX_FREE_MESSAGES - usedMessages} free messages remaining
              </p>
            )}
          </div>
          
          <div className="text-center mt-8">
            <h2 className="text-xl font-semibold mb-4">Upgrade to Premium</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Get unlimited AI chat messages, personalized coaching, and exclusive PM resources.
            </p>
            <Button size="lg">
              Unlock Unlimited Access
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Chat;
