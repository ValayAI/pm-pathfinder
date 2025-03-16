
import React, { useEffect, useRef } from 'react';
import { useToast } from "@/hooks/use-toast";

const EmailSignup = () => {
  const { toast } = useToast();
  const formContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load the ConvertKit script
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
      // Cleanup function to remove the script when component unmounts
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [toast]);

  return (
    <div className="bg-muted/30 border border-border rounded-md shadow-sm">
      <div ref={formContainerRef} className="convertkit-form-container">
        <form 
          action="https://app.kit.com/forms/7803602/subscriptions" 
          className="seva-form formkit-form" 
          method="post" 
          data-sv-form="7803602" 
          data-uid="51a320fe9d" 
          data-format="inline" 
          data-version="5"
          style={{ backgroundColor: 'transparent', borderRadius: '6px', margin: 0, padding: '1rem' }}
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
            >
              <div className="formkit-spinner">
                <div></div>
                <div></div>
                <div></div>
              </div>
              <span className="">Subscribe</span>
            </button>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailSignup;
