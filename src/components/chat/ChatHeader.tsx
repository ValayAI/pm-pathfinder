
import React from 'react';
import { Card, CardHeader } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';
import { SubscriptionData } from '@/providers/SubscriptionProvider';

interface ChatHeaderProps {
  subscription?: SubscriptionData | null;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ subscription }) => {
  const isPremium = subscription?.planId === 'popular' || subscription?.planId === 'pro';
  
  return (
    <Card className="mb-4 border-none bg-transparent shadow-none">
      <CardHeader className="flex flex-row items-center justify-between p-0">
        <div>
          <h2 className="text-2xl font-bold mb-1">PM Coach</h2>
          <p className="text-muted-foreground">
            Ask me anything about product management, interviews, or career advice
          </p>
        </div>
        {isPremium && (
          <div className="flex items-center bg-gradient-to-r from-amber-200 to-yellow-400 text-amber-900 px-3 py-1 rounded-full text-xs font-medium">
            <Sparkles className="h-3.5 w-3.5 mr-1" />
            Premium
          </div>
        )}
      </CardHeader>
    </Card>
  );
};

export default ChatHeader;
