
import React from 'react';
import { Button } from "@/components/ui/button";

interface TopicButtonProps {
  topic: string;
  onClick: () => void;
  disabled: boolean;
}

const TopicButton = ({ topic, onClick, disabled }: TopicButtonProps) => {
  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="text-sm bg-muted/30 border-primary/10 hover:bg-muted/50 hover:border-primary/20 transition-all"
      onClick={onClick}
      disabled={disabled}
    >
      {topic}
    </Button>
  );
};

export default TopicButton;
