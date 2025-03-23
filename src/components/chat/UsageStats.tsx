
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { AlertCircle } from "lucide-react";

interface UsageStatsProps {
  usedMessages: number;
  messageLimit: number;
  remainingMessages: number;
  planId?: string;
}

const UsageStats = ({ usedMessages, messageLimit, remainingMessages, planId }: UsageStatsProps) => {
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
