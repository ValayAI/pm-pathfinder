
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Send, Lock, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardDescription, CardTitle } from "@/components/ui/card";
import ChatBubble from './ChatBubble';
import TopicButton from './TopicButton';
import { Bot } from 'lucide-react';
import { motion } from "framer-motion";

// Preloaded content for topic buttons
const preloadedTopics = {
  "Interview tips": {
    question: "What are some essential interview tips for product management roles?",
    answer: "Here are my top interview tips for product management roles:\n\n1. **Structure your answers**: Use frameworks like STAR (Situation, Task, Action, Result) for behavioral questions.\n\n2. **Prepare your stories**: Have 5-7 strong examples about product launches, working with teams, and overcoming challenges.\n\n3. **Practice product critique**: Be ready to analyze products and suggest improvements.\n\n4. **Know your metrics**: Be clear about how you measure success and impact.\n\n5. **Ask insightful questions**: Show your curiosity and strategic thinking through the questions you ask.\n\nSign up for personalized interview preparation guidance!"
  },
  "Career growth": {
    question: "How can I advance my product management career?",
    answer: "Here's my advice for accelerating your product management career growth:\n\n1. **Master the fundamentals**: Ensure you excel at core PM skills like user research, prioritization, and execution.\n\n2. **Develop a T-shaped skillset**: Go deep in one area (analytics, UX, technical knowledge) while maintaining breadth.\n\n3. **Quantify your impact**: Track and communicate your achievements with metrics and business outcomes.\n\n4. **Build your network**: Connect with other PMs, mentors, and cross-functional partners.\n\n5. **Continuous learning**: Stay updated on industry trends, technologies, and methodologies.\n\nSign up for a customized career development plan!"
  },
  "Roadmap help": {
    question: "What's the best approach to creating an effective product roadmap?",
    answer: "Creating an effective product roadmap requires:\n\n1. **Start with strategy**: Align your roadmap with company objectives and product vision.\n\n2. **Focus on outcomes, not features**: Organize around customer problems and business goals.\n\n3. **Prioritize ruthlessly**: Use frameworks like RICE (Reach, Impact, Confidence, Effort) to make decisions.\n\n4. **Create the right timeframe**: Near-term items should be specific, while longer-term items remain flexible.\n\n5. **Communicate clearly**: Make it accessible to all stakeholders and regularly update it.\n\nSign up to access roadmap templates and prioritization tools!"
  }
};

const ChatSection = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      content: "Hi! I'm your PM Coach. Ask me anything about product management, interviews, or career growth."
    }
  ]);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Scroll to bottom of chat container when messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: message }]);
    
    // Simulate AI response
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: "Great question! Here's a quick answer:\n\nFor product management interviews, I recommend using the STAR framework (Situation, Task, Action, Result) to structure your responses. This helps you deliver concise, impactful answers that highlight your skills.\n\nSign up for free to get more detailed coaching and unlimited responses!" 
      }]);
      setIsTyping(false);
      setHasInteracted(true);
    }, 1500);
    
    setMessage('');
  };

  const handleTopicClick = (topic) => {
    if (hasInteracted) return;
    
    const topicData = preloadedTopics[topic];
    if (!topicData) return;
    
    // Add the preloaded question
    setMessages(prev => [...prev, { role: 'user', content: topicData.question }]);
    
    // Add the preloaded answer after a short delay
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', content: topicData.answer }]);
      setIsTyping(false);
      setHasInteracted(true);
    }, 1500);
  };
  
  return (
    <Card className="mb-12 shadow-md border rounded-xl overflow-hidden hover:shadow-lg transition-all">
      <CardHeader className="pb-3 bg-gradient-to-r from-muted/50 to-transparent">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-3 rounded-lg">
            <Bot className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl">PM Coach</CardTitle>
            <CardDescription>Powered by AI</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-5">
        <div 
          ref={chatContainerRef}
          className="bg-muted/20 backdrop-blur-sm rounded-lg p-4 mb-5 h-[320px] overflow-y-auto shadow-inner border"
        >
          {messages.map((msg, index) => (
            <ChatBubble 
              key={index} 
              message={msg} 
              delay={index * 0.1}
            />
          ))}
          
          {isTyping && (
            <motion.div 
              className="mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="inline-block p-3 rounded-lg max-w-[85%] bg-card border">
                <div className="flex space-x-2">
                  <div className="h-2 w-2 bg-primary/40 rounded-full animate-bounce"></div>
                  <div className="h-2 w-2 bg-primary/60 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="h-2 w-2 bg-primary/80 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
        
        <div className="relative">
          <Textarea 
            placeholder="Ask about product management, interviews, or career advice..." 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="pr-12 resize-none border-primary/20 focus:border-primary/30 shadow-sm"
            rows={2}
            disabled={hasInteracted}
          />
          <Button 
            className="absolute right-2 bottom-2 bg-primary/90 hover:bg-primary shadow-sm" 
            size="icon" 
            onClick={handleSendMessage}
            disabled={!message.trim() || hasInteracted}
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-5 bg-gradient-to-r from-muted/30 to-transparent">
        {hasInteracted ? (
          <motion.div 
            className="w-full p-4 bg-card rounded-lg border border-dashed shadow-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Lock className="h-5 w-5 text-primary" />
              <p className="font-medium">Sign up to continue the conversation</p>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Create a free account to get unlimited coaching and personalized advice for your product management career.
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" asChild size="sm" className="min-w-24">
                <Link to="/signin">Sign In</Link>
              </Button>
              <Button asChild size="sm" className="min-w-24 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <Link to="/signup" className="flex items-center gap-1.5">
                  Sign Up Free <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        ) : (
          <p className="text-xs text-muted-foreground">
            Ask one free question, or <Link to="/signup" className="text-primary hover:underline font-medium">sign up</Link> for unlimited coaching
          </p>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
          <TopicButton 
            topic="Interview tips"
            onClick={() => handleTopicClick("Interview tips")}
            disabled={hasInteracted}
            delay={0.1}
          />
          <TopicButton 
            topic="Career growth"
            onClick={() => handleTopicClick("Career growth")}
            disabled={hasInteracted}
            delay={0.2}
          />
          <TopicButton 
            topic="Roadmap help"
            onClick={() => handleTopicClick("Roadmap help")}
            disabled={hasInteracted}
            delay={0.3}
          />
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChatSection;
