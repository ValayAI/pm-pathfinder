import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ArrowRight, Bot, Send, Lock, MessageSquare, DollarSign } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const PMCoachTeaser = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      content: "Hi! I'm your PM Coach. Ask me anything about product management, interviews, or career growth."
    }
  ]);
  const [hasAskedQuestion, setHasAskedQuestion] = useState(false);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: message }]);
    
    // Simulate AI response
    setTimeout(() => {
      if (!hasAskedQuestion) {
        setMessages(prev => [...prev, { 
          role: 'ai', 
          content: "Great question! Here's a quick answer:\n\nFor product management interviews, I recommend using the STAR framework (Situation, Task, Action, Result) to structure your responses. This helps you deliver concise, impactful answers that highlight your skills.\n\nSign up for free to get more detailed coaching and unlimited responses!" 
        }]);
        setHasAskedQuestion(true);
      }
    }, 1000);
    
    setMessage('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <Card className="mb-8 shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-full">
              <Bot className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">PM Coach</CardTitle>
              <CardDescription>Powered by AI</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="bg-muted/50 rounded-lg p-4 mb-4 h-[320px] overflow-y-auto">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`mb-3 ${msg.role === 'user' ? 'text-right' : ''}`}
              >
                <div 
                  className={`inline-block p-3 rounded-lg max-w-[85%] ${
                    msg.role === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted'
                  }`}
                >
                  {msg.content.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i !== msg.content.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="relative">
            <Textarea 
              placeholder="Ask about product management, interviews, or career advice..." 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="pr-12 resize-none"
              rows={2}
              disabled={hasAskedQuestion}
            />
            <Button 
              className="absolute right-2 bottom-2" 
              size="icon" 
              onClick={handleSendMessage}
              disabled={!message.trim() || hasAskedQuestion}
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          {hasAskedQuestion ? (
            <div className="w-full p-3 bg-muted/50 rounded-lg border border-dashed">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="h-4 w-4 text-muted-foreground" />
                <p className="font-medium">Sign up to continue the conversation</p>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Create a free account to get unlimited coaching and personalized advice for your product management career.
              </p>
              <div className="flex gap-3 justify-center">
                <Button variant="outline" asChild size="sm">
                  <Link to="/signin">Sign In</Link>
                </Button>
                <Button asChild size="sm">
                  <Link to="/signup" className="flex items-center gap-1">
                    Sign Up Free <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">
              Ask one free question, or <Link to="/signup" className="text-primary hover:underline">sign up</Link> for unlimited coaching
            </p>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full">
            <Button variant="outline" size="sm" className="text-xs">
              Interview tips
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              Career growth
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              Roadmap help
            </Button>
          </div>
        </CardFooter>
      </Card>
      
      <div className="text-center">
        <h2 className="text-lg font-medium mb-3">What can the PM Coach help with?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-muted/30">
            <CardContent className="pt-6">
              <div className="flex justify-center items-center mb-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
              </div>
              <h3 className="text-center font-medium mb-2">Interview Prep</h3>
              <p className="text-sm text-center text-muted-foreground">
                Get personalized advice for PM interview questions and feedback on your responses
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-muted/30">
            <CardContent className="pt-6">
              <div className="flex justify-center items-center mb-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
              </div>
              <h3 className="text-center font-medium mb-2">Career Growth</h3>
              <p className="text-sm text-center text-muted-foreground">
                Advice on advancing your PM career, skills development, and navigating challenges
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-muted/30">
            <CardContent className="pt-6">
              <div className="flex justify-center items-center mb-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
              </div>
              <h3 className="text-center font-medium mb-2">Product Strategy</h3>
              <p className="text-sm text-center text-muted-foreground">
                Guidance on frameworks, prioritization, and building successful product strategies
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Button asChild size="lg">
          <Link to="/signup" className="flex items-center gap-1">
            Get Unlimited Access <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default PMCoachTeaser;
