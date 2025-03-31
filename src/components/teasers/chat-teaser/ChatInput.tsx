
import React, { useCallback } from 'react';
import { Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  message: string;
  setMessage: (message: string) => void;
  handleSendMessage: () => void;
  disabled: boolean;
}

const ChatInput = React.memo(({ message, setMessage, handleSendMessage, disabled }: ChatInputProps) => {
  // Use useCallback to prevent recreation of this function on each render
  const onMessageChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  }, [setMessage]);

  // Use useCallback for the click handler
  const onSendClick = useCallback(() => {
    if (message.trim() && !disabled) {
      handleSendMessage();
    }
  }, [message, handleSendMessage, disabled]);

  return (
    <div className="relative">
      <Textarea 
        placeholder="Ask about product management, interviews, or career advice..." 
        value={message}
        onChange={onMessageChange}
        className="pr-12 resize-none border-primary/20 focus:border-primary/30 shadow-sm"
        rows={2}
        disabled={disabled}
      />
      <Button 
        className="absolute right-2 bottom-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-sm" 
        size="icon" 
        onClick={onSendClick}
        disabled={!message.trim() || disabled}
      >
        <Send className="h-4 w-4" />
        <span className="sr-only">Send</span>
      </Button>
    </div>
  );
});

ChatInput.displayName = 'ChatInput';

export default ChatInput;
