
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircleQuestion, Bot, SendIcon } from "lucide-react";
import { handleChatRequest } from "../api/chat";

const FrameworkChat = () => {
  const [userMessage, setUserMessage] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userMessage.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await handleChatRequest({ message: userMessage });
      setAiResponse(response.message);
    } catch (error) {
      console.error("Error getting AI response:", error);
      setAiResponse("Sorry, I encountered an error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
      <div className="flex items-center gap-2 mb-4">
        <Bot className="h-5 w-5 text-primary" />
        <h2 className="text-2xl font-semibold">PM Framework Advisor</h2>
      </div>
      
      <p className="text-muted-foreground mb-6">
        Not sure which framework to use? Describe your challenge, and our AI coach will recommend the best approach.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          placeholder="E.g., 'I need to prioritize 20+ feature requests with limited resources' or 'Which framework should I use for setting quarterly goals?'"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          className="min-h-[100px]"
        />
        
        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={isLoading || !userMessage.trim()}
            className="flex items-center gap-2"
          >
            {isLoading ? "Thinking..." : "Get Recommendation"}
            {!isLoading && <SendIcon className="h-4 w-4" />}
          </Button>
        </div>
      </form>
      
      {aiResponse && (
        <Card className="mt-6">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-full mt-1">
                <MessageCircleQuestion className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium mb-2">AI Coach Recommendation:</h3>
                <div className="text-muted-foreground whitespace-pre-line">
                  {aiResponse}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FrameworkChat;
