
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Send, Sparkles, MessageSquare, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

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
  const [freeMessagesUsed, setFreeMessagesUsed] = useState(0);
  const FREE_MESSAGE_LIMIT = 1;
  
  const handleSubmitMessage = (e) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    if (freeMessagesUsed >= FREE_MESSAGE_LIMIT) {
      toast.error("Free message limit reached", {
        description: "Create an account to continue chatting with PM Coach.",
        action: {
          label: "Sign Up",
          onClick: () => window.location.href = "/signup"
        }
      });
      return;
    }
    
    // Add user message
    const userMessage = {
      role: 'user',
      content: message,
      timestamp: new Date().getTime()
    };
    
    setMessages([...messages, userMessage]);
    setMessage('');
    setFreeMessagesUsed(freeMessagesUsed + 1);
    
    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage = {
        role: 'assistant',
        content: "I'd love to help with that! However, you've reached your free message limit. Sign up for free to continue our conversation and get unlimited coaching support.",
        timestamp: new Date().getTime()
      };
      
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
    }, 1000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">PM Coach</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Get expert guidance on product management career growth and strategy
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Your AI Product Management Coach</h2>
          <p className="text-muted-foreground">
            Ask any product management question and get expert guidance, frameworks, and best practices instantly.
          </p>
          
          <div className="space-y-2">
            <h3 className="font-medium">PM Coach can help you with:</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-primary mr-2 mt-0.5" />
                <span>Interview preparation and questions</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-primary mr-2 mt-0.5" />
                <span>Creating product strategies and roadmaps</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-primary mr-2 mt-0.5" />
                <span>Stakeholder management techniques</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-primary mr-2 mt-0.5" />
                <span>Career growth and skill development</span>
              </li>
            </ul>
          </div>
          
          <Card className="bg-muted/40 border-primary/10 border">
            <CardContent className="p-4 text-sm italic text-muted-foreground">
              "PM Coach helped me prepare for my PM interview at Google. The frameworks and tips were exactly what I needed to land the job!"
              <p className="mt-2 font-medium not-italic">David K. — Senior PM at Google</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20">
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">Get unlimited coaching support with a free account</h3>
              <ul className="space-y-1.5 text-sm mb-4">
                <li className="flex items-center">
                  <CheckCircle className="h-3.5 w-3.5 text-primary mr-2" />
                  <span>Unlimited AI coaching sessions</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-3.5 w-3.5 text-primary mr-2" />
                  <span>Interview question database</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-3.5 w-3.5 text-primary mr-2" />
                  <span>Personalized career advice</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-4">
          <Card className="border">
            <CardContent className="p-4 space-y-4">
              <div className="bg-card rounded-lg border p-4 space-y-4 max-h-[300px] overflow-auto">
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
              </div>
              
              <form className="flex items-center gap-2" onSubmit={handleSubmitMessage}>
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask your PM coach anything..."
                  className="flex-grow"
                  disabled={freeMessagesUsed >= FREE_MESSAGE_LIMIT}
                />
                <Button 
                  type="submit" 
                  size="icon"
                  disabled={!message.trim() || freeMessagesUsed >= FREE_MESSAGE_LIMIT}
                  className="bg-primary hover:bg-primary/90 h-10 w-10 rounded-full flex-shrink-0"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
              
              <div className="text-xs text-center text-muted-foreground">
                {freeMessagesUsed < FREE_MESSAGE_LIMIT ? (
                  <span>You have {FREE_MESSAGE_LIMIT - freeMessagesUsed} free message{FREE_MESSAGE_LIMIT - freeMessagesUsed !== 1 ? 's' : ''} remaining</span>
                ) : (
                  <span>You've used all your free messages. Sign up for unlimited access!</span>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="flex justify-center mt-8 border-t pt-6">
        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <Link to="/signin">Sign In</Link>
          </Button>
          <Button asChild>
            <Link to="/signup" className="flex items-center gap-1">
              Start Coaching <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PMCoachTeaser;
