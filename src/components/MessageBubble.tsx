
import { cn } from "@/lib/utils";
import { User, Sparkles } from "lucide-react";

// Define the message type
type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: number;
};

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isUser = message.role === "user";
  
  return (
    <div 
      className={cn(
        "flex items-start space-x-2 animate-fade-in",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <Sparkles className="h-4 w-4" />
        </div>
      )}
      
      <div 
        className={cn(
          "max-w-[80%] rounded-xl px-4 py-2",
          isUser 
            ? "bg-primary text-primary-foreground rounded-tr-none" 
            : "bg-secondary text-secondary-foreground rounded-tl-none"
        )}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
      
      {isUser && (
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-secondary/80 flex items-center justify-center">
          <User className="h-4 w-4" />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
