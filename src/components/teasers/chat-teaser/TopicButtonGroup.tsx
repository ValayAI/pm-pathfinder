
import React from 'react';
import { Link } from 'react-router-dom';
import TopicButton from './TopicButton';
import SignupPrompt from './SignupPrompt';

interface TopicButtonGroupProps {
  hasInteracted: boolean;
  handleTopicClick: (topic: string) => void;
}

const TopicButtonGroup = ({ hasInteracted, handleTopicClick }: TopicButtonGroupProps) => {
  return (
    <>
      {hasInteracted ? (
        <SignupPrompt />
      ) : (
        <p className="text-xs text-muted-foreground">
          Ask one free question, or <Link to="/signup" className="text-primary hover:underline font-medium">sign up</Link> for unlimited coaching
        </p>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
        <TopicButton 
          topic="Interview tips"
          onClick={() => handleTopicClick("Interview tips")}
          disabled={hasInteracted}
          delay={0.1}
        />
        <TopicButton 
          topic="Career growth"
          onClick={() => handleTopicClick("Career growth")}
          disabled={hasInteracted}
          delay={0.2}
        />
        <TopicButton 
          topic="Roadmap help"
          onClick={() => handleTopicClick("Roadmap help")}
          disabled={hasInteracted}
          delay={0.3}
        />
      </div>
    </>
  );
};

export default TopicButtonGroup;
