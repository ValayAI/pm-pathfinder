
import React, { createContext, useState, useRef, useEffect, useContext } from 'react';

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

type ChatContextType = {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  messages: { role: string; content: string }[];
  hasInteracted: boolean;
  isTyping: boolean;
  chatContainerRef: React.RefObject<HTMLDivElement>;
  handleSendMessage: () => void;
  handleTopicClick: (topic: string) => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }) => {
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
    <ChatContext.Provider
      value={{
        message,
        setMessage,
        messages,
        hasInteracted,
        isTyping,
        chatContainerRef,
        handleSendMessage,
        handleTopicClick,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};
