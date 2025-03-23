
import { useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageBubble from "@/components/MessageBubble";
import { Sparkles } from "lucide-react";
import { Message } from "@/types/chat";

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

const MessageList = ({ messages, isLoading }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <ScrollArea className="h-[450px] px-4 py-4 overflow-y-auto" ref={scrollAreaRef}>
      <div className="space-y-3 pb-2">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-8 min-h-[350px]">
            <EmptyState />
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
  );
};

const EmptyState = () => (
  <>
    <Sparkles className="h-10 w-10 mb-4 text-purple-500/50" />
    <p className="text-lg font-medium mb-1">Your PM Coach is ready</p>
    <p className="text-sm text-muted-foreground mb-6 max-w-xs">
      Ask about career paths, interview prep, or product strategy
    </p>
  </>
);

export default MessageList;
