
import { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import PreloadedPrompts from "@/components/PreloadedPrompts";

interface ChatInputProps {
  input: string;
  setInput: (input: string) => void;
  handleSubmit: (e: FormEvent) => void;
  isLoading: boolean;
  remainingMessages: number;
  hasLimitedMessages: boolean;
  handleSelectPrompt: (prompt: string) => void;
  showPrompts: boolean;
}

const ChatInput = ({
  input,
  setInput,
  handleSubmit,
  isLoading,
  remainingMessages,
  hasLimitedMessages,
  handleSelectPrompt,
  showPrompts,
}: ChatInputProps) => {
  return (
    <>
      {showPrompts && (
        <div className="max-w-md w-full mx-auto">
          <PreloadedPrompts onSelectPrompt={handleSelectPrompt} />
        </div>
      )}
      <div className="p-3 border-t bg-background/80 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your PM coach anything..."
            disabled={isLoading || (hasLimitedMessages && remainingMessages <= 0)}
            className="flex-grow bg-background/50"
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim() || (hasLimitedMessages && remainingMessages <= 0)}
            className="bg-purple-600 hover:bg-purple-700 h-10 w-10 rounded-full flex-shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </>
  );
};

export default ChatInput;
