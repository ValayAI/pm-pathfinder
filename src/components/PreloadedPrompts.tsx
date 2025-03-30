
import React from "react";
import { Button } from "@/components/ui/button";

interface PreloadedPromptsProps {
  onSelectPrompt: (prompt: string) => void;
}

const PRELOADED_PROMPTS = [
  "How do I transition from engineering to product management?",
  "What metrics should I focus on to demonstrate the success of my product?",
  "Help me prepare for a senior PM interview at a tech company",
  "How do I create user stories that developers will understand and appreciate?",
  "What's an effective framework for making difficult product trade-off decisions?"
];

const PreloadedPrompts: React.FC<PreloadedPromptsProps> = ({ onSelectPrompt }) => {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-muted-foreground mb-2">Try asking about:</h3>
      <div className="grid grid-cols-1 gap-2">
        {PRELOADED_PROMPTS.map((prompt, index) => (
          <Button 
            key={index}
            variant="outline" 
            className="h-auto min-h-[48px] py-2.5 px-4 justify-start text-left text-sm font-normal border-gray-200 dark:border-gray-700 text-muted-foreground hover:text-foreground hover:bg-gray-50 dark:hover:bg-gray-800 w-full"
            onClick={() => onSelectPrompt(prompt)}
          >
            <span className="line-clamp-2">{prompt}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default PreloadedPrompts;
