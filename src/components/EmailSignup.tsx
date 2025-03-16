
import React, { useState, useEffect, useRef } from 'react';
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
  const formRef = useRef<HTMLFormElement>(null);
  const [convertKitInitialized, setConvertKitInitialized] = useState(false);

  // Function to load the ConvertKit script
  useEffect(() => {
    const loadConvertKitScript = () => {
      if (document.querySelector('script[data-uid="6a1eced7a7"]')) {
        return;
      }
      
      const script = document.createElement('script');
      script.src = "https://pm-pathfinder.kit.com/6a1eced7a7/index.js";
      script.async = true;
      script.setAttribute('data-uid', '6a1eced7a7');
      
      script.onload = () => {
        console.log("ConvertKit script loaded successfully");
        setConvertKitInitialized(true);
      };
      
      script.onerror = (error) => {
        console.error("Error loading ConvertKit script:", error);
      };
      
      document.body.appendChild(script);
    };

    loadConvertKitScript();

    return () => {
      // Cleanup function
      const script = document.querySelector('script[data-uid="6a1eced7a7"]');
      if (script) {
        script.remove();
      }
    };
  }, []);

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
    
    // Check if email already exists in local storage
    if (subscribers.includes(email)) {
      toast({
        title: "Already subscribed",
        description: "This email is already on our list. Thanks for your enthusiasm!",
      });
      setIsSubmitting(false);
      return;
    }

    // Add to local storage
    setSubscribers([...subscribers, email]);
    
    // Trigger the ConvertKit form submission
    if (typeof window !== 'undefined' && window.convertkit) {
      try {
        // ConvertKit API
        window.convertkit.createSubscriber({
          email: email,
          form: '6a1eced7a7',
        }).then(() => {
          console.log("Subscriber created successfully via ConvertKit API");
        }).catch((error: any) => {
          console.error("Error creating subscriber via ConvertKit API:", error);
        });
      } catch (error) {
        console.error("Error using ConvertKit API:", error);
      }
    } else {
      console.log("ConvertKit API not available, would have submitted:", email);
    }
    
    toast({
      title: "Subscription successful!",
      description: "Thank you for subscribing to our newsletter.",
    });
    
    console.log("New subscriber:", email);
    console.log("All subscribers:", [...subscribers, email]);
    
    setEmail('');
    setIsSubmitting(false);
  };

  return (
    <div className="bg-muted/30 border border-border rounded-md p-4 shadow-sm">
      <h3 className="text-base font-medium mb-2">Stay updated with PM resources</h3>
      <form ref={formRef} onSubmit={handleSubmit} className="flex gap-2" data-uid="6a1eced7a7">
        <Input
          type="email"
          name="email_address"
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
