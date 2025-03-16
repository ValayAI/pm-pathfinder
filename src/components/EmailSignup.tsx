
import React, { useEffect, useRef, useState } from 'react';
import { useToast } from "@/hooks/use-toast";

const EmailSignup = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // Load the ConvertKit script - this is already in the HTML, but we'll ensure it's loaded
    const existingScript = document.querySelector('script[src="https://f.convertkit.com/ckjs/ck.5.js"]');
    
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = "https://f.convertkit.com/ckjs/ck.5.js";
      script.async = true;
      
      script.onload = () => {
        console.log("ConvertKit script loaded successfully");
      };
      
      script.onerror = (error) => {
        console.error("Error loading ConvertKit script:", error);
        toast({
          title: "Error",
          description: "Failed to load the newsletter signup form. Please try again later.",
          variant: "destructive",
        });
      };
      
      document.head.appendChild(script);
      
      return () => {
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      };
    }
  }, [toast]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formRef.current) return;
    
    setIsSubmitting(true);
    
    // Get the form data
    const formData = new FormData(formRef.current);
    const email = formData.get('email_address') as string;
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }
    
    // Submit the form through standard form submission to ConvertKit
    fetch("https://app.kit.com/forms/7803602/subscriptions", {
      method: "POST",
      body: formData,
      headers: {
        accept: "application/json",
      }
    })
    .then(response => {
      if (response.ok) {
        // Show success toast
        toast({
          title: "Success!",
          description: "Thank you for subscribing to our newsletter.",
        });
        
        // Reset the form
        if (formRef.current) {
          formRef.current.reset();
        }
        return response.json();
      } else {
        throw new Error("Failed to subscribe");
      }
    })
    .catch(error => {
      console.error("Subscription error:", error);
      toast({
        title: "Subscription failed",
        description: "There was an error subscribing to the newsletter. Please try again later.",
        variant: "destructive",
      });
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };

  return (
    <div className="bg-muted/30 border border-border rounded-md shadow-sm">
      <form 
        ref={formRef}
        action="https://app.kit.com/forms/7803602/subscriptions" 
        className="seva-form formkit-form" 
        method="post" 
        data-sv-form="7803602" 
        data-uid="51a320fe9d" 
        data-format="inline" 
        data-version="5"
        style={{ backgroundColor: 'transparent', borderRadius: '6px', margin: 0, padding: '1rem' }}
        onSubmit={handleSubmit}
      >
        <div data-style="full">
          <div className="formkit-field mb-3">
            <label htmlFor="email-address" className="block text-base font-medium mb-2">Stay updated with PM resources</label>
            <input 
              className="formkit-input w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
              name="email_address" 
              aria-label="Email Address" 
              placeholder="Enter your email" 
              required 
              type="email"
            />
          </div>
          <button 
            data-element="submit" 
            className="formkit-submit formkit-submit w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                <span>Subscribing...</span>
              </div>
            ) : (
              <span>Subscribe</span>
            )}
          </button>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </form>
    </div>
  );
};

export default EmailSignup;
