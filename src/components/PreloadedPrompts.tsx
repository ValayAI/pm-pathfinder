
import React from "react";
import { Button } from "@/components/ui/button";

interface PreloadedPromptsProps {
  onSelectPrompt: (prompt: string) => void;
}

const PRELOADED_PROMPTS = [
  "How do I create a compelling product roadmap that aligns with business objectives?",
  "What's the best way to handle stakeholder disagreements about feature prioritization?",
  "Give me specific techniques for conducting effective user interviews to validate my product ideas",
  "How can I transition from engineering to product management? What skills should I highlight?",
  "What metrics should I focus on to demonstrate the success of my product?",
  "Help me prepare for a senior PM interview at a tech company",
  "How do I create user stories that developers will understand and appreciate?",
  "What's an effective framework for making difficult product trade-off decisions?",
  "How do I manage up effectively as a product manager?",
  "Give me strategies for launching a product with limited marketing resources"
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
            className="h-auto py-2 px-3 justify-start text-left text-sm font-normal text-muted-foreground hover:text-foreground"
            onClick={() => onSelectPrompt(prompt)}
          >
            {prompt}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default PreloadedPrompts;
