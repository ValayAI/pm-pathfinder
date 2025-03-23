
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Subscription } from "@/providers/SubscriptionProvider";

interface ChatHeaderProps {
  subscription: Subscription | null;
}

const ChatHeader = ({ subscription }: ChatHeaderProps) => {
  return (
    <div className="mb-6 text-center">
      <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-200 mb-3">
        <Sparkles className="mr-1.5 h-3.5 w-3.5" />
        <span>PM Coach</span>
      </div>
      <h1 className="text-2xl font-bold mb-2">Chat with Your PM Coach</h1>
      <p className="text-muted-foreground text-sm max-w-md mx-auto">
        Get expert guidance on product management career growth and strategy
      </p>

      {subscription && (
        <div className="mt-2">
          <span className={cn(
            "inline-block px-3 py-1 rounded-full text-xs font-medium",
            subscription.planId === 'pro' ? "bg-amber-100 text-amber-800" :
            subscription.planId === 'popular' ? "bg-purple-100 text-purple-800" :
            subscription.planId === 'starter' ? "bg-blue-100 text-blue-800" :
            "bg-gray-100 text-gray-800"
          )}>
            {subscription.planId.charAt(0).toUpperCase() + subscription.planId.slice(1)} Plan
          </span>
        </div>
      )}
    </div>
  );
};

export default ChatHeader;
