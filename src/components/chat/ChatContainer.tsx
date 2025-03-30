
import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/AuthProvider";
import { useActivity } from "@/hooks/useActivity";
import PMCoachTeaser from "@/components/teasers/PMCoachTeaser";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import UsageStats from "./UsageStats";
import PlanFeatures from "./PlanFeatures";
import UpgradePrompt from "./UpgradePrompt";
import { toast } from "sonner";
import PaywallModal from "@/components/PaywallModal";
import { useChat } from "@/hooks/use-chat";

const ChatContainer = () => {
  const { user } = useAuth();
  const { trackPageView, trackFeatureUsage } = useActivity();
  const {
    messages,
    input,
    setInput,
    isLoading,
    usedMessages,
    messageLimit,
    remainingMessages,
    hasLimitedMessages,
    isVisible,
    setIsVisible,
    showPaywall,
    setShowPaywall,
    subscription,
    handleSelectPrompt,
    handleSubmit,
    handleUpgrade,
    handleLogin
  } = useChat();

  useEffect(() => {
    setIsVisible(true);
    
    // Track page view when component mounts
    if (user) {
      trackPageView('chat');
    }
    
    // Check usage stats
    if (user && hasLimitedMessages) {
      trackFeatureUsage('view_usage_stats', {
        usedMessages,
        messageLimit,
        remainingMessages,
        planId: subscription?.planId
      });
    }
    
    // Check plan features
    if (user && subscription) {
      trackFeatureUsage('view_plan_features', {
        planId: subscription.planId
      });
    }
  }, [setIsVisible, user, trackPageView, hasLimitedMessages, trackFeatureUsage, usedMessages, messageLimit, remainingMessages, subscription]);

  // Only show the paywall modal based on the state in useChat
  // The logic for when to show it is now handled in useChat
  
  useEffect(() => {
    toast.success("Your PM Coach is ready", {
      description: "Ask me anything about product management!",
      duration: 3000,
    });
  }, []);

  if (!user) {
    return <PMCoachTeaser />;
  }

  return (
    <div className={cn(
      "transition-all duration-700",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    )}>
      <ChatHeader subscription={subscription} />
      
      <Card className="bg-card/50 backdrop-blur-sm border rounded-xl shadow-sm mb-4 overflow-hidden flex flex-col">
        <MessageList 
          messages={messages} 
          isLoading={isLoading} 
        />
        
        <ChatInput 
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          remainingMessages={remainingMessages}
          hasLimitedMessages={hasLimitedMessages}
          handleSelectPrompt={handleSelectPrompt}
          showPrompts={messages.length === 0}
        />
      </Card>
      
      {hasLimitedMessages && (
        <UsageStats 
          usedMessages={usedMessages}
          messageLimit={messageLimit}
          remainingMessages={remainingMessages}
          planId={subscription?.planId}
        />
      )}
      
      <PlanFeatures planId={subscription?.planId} />
      
      <UpgradePrompt 
        planId={subscription?.planId}
        setShowPaywall={setShowPaywall}
      />
      
      <PaywallModal 
        open={showPaywall} 
        onOpenChange={setShowPaywall}
        onUpgrade={handleUpgrade}
        onLogin={handleLogin}
        requiredFeature={subscription?.planId === 'free' ? "Unlimited Messages" : undefined}
      />
    </div>
  );
};

export default ChatContainer;
