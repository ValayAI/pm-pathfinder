
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { AlertCircle } from "lucide-react";
import { useActivity } from '@/hooks/useActivity';
import { useEffect } from 'react';

interface UsageStatsProps {
  usedMessages: number;
  messageLimit: number;
  remainingMessages: number;
  planId?: string;
}

const UsageStats = ({ usedMessages, messageLimit, remainingMessages, planId }: UsageStatsProps) => {
  const { trackFeatureUsage } = useActivity();
  
  useEffect(() => {
    // Track when usage stats are viewed, with the current usage data
    trackFeatureUsage('view_usage_stats', { 
      usedMessages,
      messageLimit,
      remainingMessages,
      planId
    });
    
    // Track if user is running low on messages
    if (remainingMessages <= 3 && remainingMessages > 0) {
      trackFeatureUsage('low_message_count', {
        remainingMessages,
        planId
      });
    }
  }, [usedMessages, messageLimit, remainingMessages, planId, trackFeatureUsage]);

  return (
    <div className="mt-4 mb-6">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-muted-foreground">Coaching sessions used</span>
        <span className="font-medium">{usedMessages} / {messageLimit}</span>
      </div>
      <Progress
        value={(usedMessages / messageLimit) * 100}
        className="h-1.5"
        indicatorClassName={cn(
          planId === 'starter' ? "bg-blue-600" : "bg-purple-600"
        )}
      />
      {remainingMessages <= 0 && (
        <div className="mt-2 flex items-center text-destructive text-xs">
          <AlertCircle className="h-3 w-3 mr-1" />
          <span>You've reached your coaching limit</span>
        </div>
      )}
      {remainingMessages > 0 && (
        <p className="text-xs text-muted-foreground mt-1">
          You have {remainingMessages} coaching {remainingMessages === 1 ? 'session' : 'sessions'} remaining
        </p>
      )}
    </div>
  );
};

export default UsageStats;
