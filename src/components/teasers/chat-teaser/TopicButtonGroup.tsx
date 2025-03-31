
import React from 'react';
import { Link } from 'react-router-dom';
import TopicButton from './TopicButton';
import SignupPrompt from './SignupPrompt';

interface TopicButtonGroupProps {
  hasInteracted: boolean;
  handleTopicClick: (topic: string) => void;
}

const TopicButtonGroup = React.memo(({ hasInteracted, handleTopicClick }: TopicButtonGroupProps) => {
  // Memoize individual topic click handlers to prevent recreation
  const handleInterviewClick = React.useCallback(() => handleTopicClick("Interview tips"), [handleTopicClick]);
  const handleCareerClick = React.useCallback(() => handleTopicClick("Career growth"), [handleTopicClick]);
  const handleRoadmapClick = React.useCallback(() => handleTopicClick("Roadmap help"), [handleTopicClick]);

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
          onClick={handleInterviewClick}
          disabled={hasInteracted}
          delay={0.1}
        />
        <TopicButton 
          topic="Career growth"
          onClick={handleCareerClick}
          disabled={hasInteracted}
          delay={0.2}
        />
        <TopicButton 
          topic="Roadmap help"
          onClick={handleRoadmapClick}
          disabled={hasInteracted}
          delay={0.3}
        />
      </div>
    </>
  );
});

TopicButtonGroup.displayName = 'TopicButtonGroup';

export default TopicButtonGroup;
