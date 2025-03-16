
import React, { useState, useEffect, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { SendIcon } from "lucide-react";

const EmailSignup = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [convertKitInitialized, setConvertKitInitialized] = useState(false);

  // Function to load the ConvertKit script
  useEffect(() => {
    const loadConvertKitScript = () => {
      if (document.querySelector('script[data-uid="51a320fe9d"]')) {
        return;
      }
      
      const script = document.createElement('script');
      script.src = "https://pm-pathfinder.kit.com/51a320fe9d/index.js";
      script.async = true;
      script.setAttribute('data-uid', '51a320fe9d');
      
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
      const script = document.querySelector('script[data-uid="51a320fe9d"]');
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
    
    // Method 1: Use ConvertKit's JavaScript API if available
    if (typeof window !== 'undefined' && window.convertkit) {
      try {
        window.convertkit.createSubscriber({
          email: email,
          form: '51a320fe9d',
        }).then(() => {
          console.log("Subscriber created successfully via ConvertKit API");
          showSuccessToast();
        }).catch((error: any) => {
          console.error("Error creating subscriber via ConvertKit API:", error);
          fallbackSubmission();
        });
      } catch (error) {
        console.error("Error using ConvertKit API:", error);
        fallbackSubmission();
      }
    } else {
      // Method 2: Direct form submission as fallback
      fallbackSubmission();
    }
  };

  const fallbackSubmission = () => {
    // This is a fallback method that uses the native form submission
    // which will POST directly to ConvertKit's servers
    if (formRef.current) {
      console.log("Using fallback direct form submission to ConvertKit");
      
      // Create a hidden form that will submit directly to ConvertKit
      const hiddenForm = document.createElement('form');
      hiddenForm.method = 'POST';
      hiddenForm.action = `https://app.convertkit.com/forms/51a320fe9d/subscriptions`;
      hiddenForm.target = '_blank';
      
      const emailInput = document.createElement('input');
      emailInput.type = 'email';
      emailInput.name = 'email_address';
      emailInput.value = email;
      
      hiddenForm.appendChild(emailInput);
      document.body.appendChild(hiddenForm);
      
      hiddenForm.submit();
      document.body.removeChild(hiddenForm);
      
      showSuccessToast();
    }
  };
  
  const showSuccessToast = () => {
    toast({
      title: "Subscription successful!",
      description: "Thank you for subscribing to our newsletter.",
    });
    
    setEmail('');
    setIsSubmitting(false);
  };

  return (
    <div className="bg-muted/30 border border-border rounded-md p-4 shadow-sm">
      <h3 className="text-base font-medium mb-2">Stay updated with PM resources</h3>
      <form ref={formRef} onSubmit={handleSubmit} className="flex gap-2" data-uid="51a320fe9d">
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
