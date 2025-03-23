
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Sparkles, MessageSquare, Clock } from 'lucide-react';
import ContentTeaser from '../ContentTeaser';

const PMCoachTeaser = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'user',
      content: 'How do I answer "Tell me about a product you launched"?',
      timestamp: new Date().getTime() - 120000
    },
    {
      role: 'assistant',
      content: 'When answering "Tell me about a product you launched," use the STAR framework:\n\n1. Situation: Set the context (your role, company)\n2. Task: Explain the product goals and your responsibility\n3. Action: Describe your specific contributions and approach\n4. Result: Share measurable outcomes (user growth, revenue)\n\nFocus on your unique contributions and decisions, especially how you overcame challenges. Keep it concise (2-3 minutes) and show passion for the product!',
      timestamp: new Date().getTime() - 60000
    }
  ]);
  const [freeMessagesSent, setFreeMessagesSent] = useState(0);
  const MAX_FREE_MESSAGES = 2;

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Add user message
    const userMessage = {
      role: 'user',
      content: message,
      timestamp: new Date().getTime()
    };
    
    setMessages([...messages, userMessage]);
    setMessage('');
    setFreeMessagesSent(freeMessagesSent + 1);
    
    // Simulate AI response if under free message limit
    if (freeMessagesSent < MAX_FREE_MESSAGES - 1) {
      setTimeout(() => {
        const responses = [
          "That's a great question about product management! To answer effectively, consider focusing on the specific metrics that matter for your product's success. Would you like me to elaborate on key PM metrics?",
          "When preparing for a PM interview, make sure to practice product critique questions. Choose products you're familiar with and analyze them from user experience, business model, and technical feasibility perspectives."
        ];
        
        const aiMessage = {
          role: 'assistant',
          content: responses[freeMessagesSent],
          timestamp: new Date().getTime()
        };
        
        setMessages(prev => [...prev, aiMessage]);
      }, 1000);
    }
  };
  
  return (
    <ContentTeaser
      title="PM Coach"
      description="Get expert guidance on product management career growth and strategy"
      cta="Get unlimited coaching"
    >
      <div className="space-y-4">
        <div className="bg-card rounded-lg border p-4 space-y-4 max-h-[400px] overflow-auto">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg p-3 ${
                  msg.role === 'user' 
                    ? 'bg-primary text-primary-foreground ml-4' 
                    : 'bg-muted border border-border mr-4'
                }`}
              >
                {msg.role === 'assistant' && (
                  <div className="flex items-center mb-1">
                    <Sparkles className="h-3.5 w-3.5 mr-1.5 text-primary" />
                    <span className="text-xs font-medium">PM Coach</span>
                  </div>
                )}
                <div className="whitespace-pre-line text-sm">{msg.content}</div>
                <div className="text-xs opacity-70 mt-1 text-right">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </div>
          ))}
          
          {freeMessagesSent >= MAX_FREE_MESSAGES && (
            <Card className="bg-muted/30 border border-primary/20 p-3 mt-4">
              <CardContent className="p-0 text-center space-y-2">
                <MessageSquare className="h-10 w-10 text-primary/40 mx-auto" />
                <h3 className="font-medium">Message limit reached</h3>
                <p className="text-sm text-muted-foreground">
                  Sign up for free to continue coaching
                </p>
              </CardContent>
            </Card>
          )}
        </div>
        
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask your PM coach anything..."
            className="flex-grow"
            disabled={freeMessagesSent >= MAX_FREE_MESSAGES}
          />
          <Button 
            type="submit" 
            size="icon"
            disabled={!message.trim() || freeMessagesSent >= MAX_FREE_MESSAGES}
            className="bg-primary hover:bg-primary/90 h-10 w-10 rounded-full flex-shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
        
        <div className="text-xs text-center text-muted-foreground">
          <div className="flex items-center justify-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            <span>{MAX_FREE_MESSAGES - freeMessagesSent} free messages remaining</span>
          </div>
        </div>
      </div>
    </ContentTeaser>
  );
};

export default PMCoachTeaser;
