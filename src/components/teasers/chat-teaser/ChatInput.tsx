
import React from 'react';
import { Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  message: string;
  setMessage: (message: string) => void;
  handleSendMessage: () => void;
  disabled: boolean;
}

const ChatInput = ({ message, setMessage, handleSendMessage, disabled }: ChatInputProps) => {
  return (
    <div className="relative">
      <Textarea 
        placeholder="Ask about product management, interviews, or career advice..." 
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="pr-12 resize-none border-primary/20 focus:border-primary/30 shadow-sm"
        rows={2}
        disabled={disabled}
      />
      <Button 
        className="absolute right-2 bottom-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-sm" 
        size="icon" 
        onClick={handleSendMessage}
        disabled={!message.trim() || disabled}
      >
        <Send className="h-4 w-4" />
        <span className="sr-only">Send</span>
      </Button>
    </div>
  );
};

export default ChatInput;
