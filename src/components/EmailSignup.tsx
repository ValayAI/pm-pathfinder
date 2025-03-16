
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { SendIcon } from "lucide-react";

const EmailSignup = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribers, setSubscribers] = useLocalStorage<string[]>('pm-pathfinder-subscribers', []);
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Check if email already exists
      if (subscribers.includes(email)) {
        toast({
          title: "Already subscribed",
          description: "This email is already on our list. Thanks for your enthusiasm!",
        });
      } else {
        // Add email to subscribers list in localStorage
        setSubscribers([...subscribers, email]);
        toast({
          title: "Subscription successful!",
          description: "Thank you for subscribing to our newsletter.",
        });
        console.log("New subscriber:", email);
        console.log("All subscribers:", [...subscribers, email]);
      }
      
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="bg-muted/30 border border-border rounded-md p-4 shadow-sm">
      <h3 className="text-base font-medium mb-2">Stay updated with PM resources</h3>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-grow"
          required
        />
        <Button type="submit" disabled={isSubmitting} size="sm">
          {isSubmitting ? (
            "Subscribing..."
          ) : (
            <>
              Subscribe <SendIcon className="ml-1 h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default EmailSignup;
