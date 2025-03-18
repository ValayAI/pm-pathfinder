
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
        "flex items-start gap-3 animate-fade-in pb-2",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-600 dark:text-purple-300">
          <Sparkles className="h-4 w-4" />
        </div>
      )}
      
      <div 
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3 shadow-sm transition-colors",
          isUser 
            ? "bg-purple-600 text-white rounded-tr-none" 
            : "bg-secondary dark:bg-secondary/80 text-secondary-foreground rounded-tl-none"
        )}
      >
        <p className="text-sm md:text-base whitespace-pre-wrap leading-relaxed">{message.content}</p>
      </div>
      
      {isUser && (
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <User className="h-4 w-4" />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
