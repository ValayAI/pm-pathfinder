
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, Sparkles } from "lucide-react";
import { useActivity } from '@/hooks/useActivity';
import { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface UsageStatsProps {
  usedMessages: number;
  messageLimit: number;
  remainingMessages: number;
  planId?: string;
}

const UsageStats = ({ usedMessages, messageLimit, remainingMessages, planId }: UsageStatsProps) => {
  const { trackFeatureUsage } = useActivity();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Track when usage stats are viewed, with the current usage data
    trackFeatureUsage('view_usage_stats', { 
      usedMessages,
      messageLimit,
      remainingMessages,
      planId
    });
    
    // Track if user is running low on messages
    if (remainingMessages <= 2 && remainingMessages > 0 && usedMessages > 0) {
      trackFeatureUsage('low_message_count', {
        remainingMessages,
        planId
      });
    }
  }, [usedMessages, messageLimit, remainingMessages, planId, trackFeatureUsage]);

  const isUnlimited = planId === 'popular' || planId === 'pro';
  
  const getProgressColor = () => {
    if (isUnlimited) return "bg-green-600";
    if (planId === 'starter') return "bg-blue-600";
    if (planId === 'pro') return "bg-amber-600";
    if (planId === 'popular') return "bg-purple-600";
    return "bg-gray-600";
  };
  
  const handleUpgradeClick = () => {
    trackFeatureUsage('clicked_upgrade_from_usage', { currentPlan: planId });
    navigate('/pricing');
  };

  return (
    <div className="mt-4 mb-6">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-muted-foreground">
          {isUnlimited ? 'Unlimited coaching sessions' : 'Coaching sessions used'}
        </span>
        {!isUnlimited && (
          <span className="font-medium">{usedMessages} / {messageLimit}</span>
        )}
        {isUnlimited && (
          <span className="flex items-center font-medium text-green-600 dark:text-green-400">
            <Sparkles className="h-3 w-3 mr-1" />
            Unlimited
          </span>
        )}
      </div>
      
      {!isUnlimited && (
        <Progress
          value={(usedMessages / messageLimit) * 100}
          className="h-1.5"
          indicatorClassName={cn(getProgressColor())}
        />
      )}
      
      {isUnlimited && (
        <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 w-full animate-pulse" />
        </div>
      )}
      
      {/* Only show the "reached limit" message when actually at 0 remaining AND used some messages */}
      {remainingMessages <= 0 && usedMessages > 0 && !isUnlimited && (
        <div className="mt-3 flex flex-col gap-2">
          <div className="flex items-center text-destructive text-xs">
            <AlertCircle className="h-3 w-3 mr-1" />
            <span>You've reached your coaching limit</span>
          </div>
          <Button size="sm" variant="outline" onClick={handleUpgradeClick} className="text-xs">
            Upgrade for more sessions
          </Button>
        </div>
      )}
      
      {/* Don't show this section if the user has never sent a message or if they're on an unlimited plan */}
      {((remainingMessages > 0 && !isUnlimited) || (usedMessages === 0 && !isUnlimited)) && (
        <div className="flex justify-between items-center mt-1">
          <p className="text-xs text-muted-foreground">
            {usedMessages === 0 ? 
              `You have ${messageLimit} coaching ${messageLimit === 1 ? 'session' : 'sessions'} available` : 
              `You have ${remainingMessages} coaching ${remainingMessages === 1 ? 'session' : 'sessions'} remaining`}
          </p>
          {remainingMessages <= 2 && usedMessages > 0 && (
            <Button 
              size="sm" 
              variant="ghost" 
              className="text-xs h-6 px-2 text-muted-foreground hover:text-foreground"
              onClick={handleUpgradeClick}
            >
              Upgrade
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default UsageStats;
