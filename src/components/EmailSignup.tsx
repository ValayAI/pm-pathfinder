
import React, { useRef, useState } from 'react';
import { toast } from "sonner";
import { isSubscribed, addSubscriber } from '@/utils/subscriberUtils';
import { Input } from './ui/input';
import { Label } from './ui/label';

const EmailSignup = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted, handling submission");
    
    if (!formRef.current) return;
    
    // Get the form data
    const formData = new FormData(formRef.current);
    const email = formData.get('email_address') as string;
    const firstName = formData.get('fields[first_name]') as string;
    
    if (!email) {
      console.log("No email provided, showing error toast");
      toast.error("Please enter your email address.");
      return;
    }
    
    if (!firstName) {
      console.log("No first name provided, showing error toast");
      toast.error("Please enter your first name.");
      return;
    }
    
    // Check if already subscribed
    if (isSubscribed(email)) {
      console.log("Email already subscribed:", email);
      toast.info("You're already subscribed to our newsletter!");
      return;
    }
    
    // Show processing toast
    toast.info("Processing your subscription...");
    setIsSubmitting(true);
    
    console.log("Submitting to ConvertKit:", email, firstName);
    
    // Submit the form to ConvertKit
    fetch("https://app.kit.com/forms/7822296/subscriptions", {
      method: "POST",
      body: formData,
      headers: {
        accept: "application/json",
      }
    })
    .then(response => {
      console.log("ConvertKit response received:", response.status);
      if (response.ok) {
        // Show success toast
        console.log("Showing success toast");
        toast.success("Thank you for subscribing to our newsletter!");
        
        // Add to local storage
        addSubscriber(email);
        
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
      console.log("Showing error toast");
      toast.error("There was an error subscribing to the newsletter. Please try again later.");
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };

  return (
    <div className="bg-muted/30 border border-border rounded-md shadow-sm">
      <form 
        ref={formRef}
        action="https://app.kit.com/forms/7822296/subscriptions" 
        className="seva-form formkit-form" 
        method="post" 
        data-sv-form="7822296" 
        data-uid="2090503a89" 
        data-format="inline" 
        data-version="5"
        style={{ backgroundColor: 'transparent', borderRadius: '6px', margin: 0, padding: '1rem' }}
        onSubmit={handleSubmit}
      >
        <div data-style="full">
          <div className="formkit-field mb-3">
            <Label htmlFor="email_address" className="block text-base font-medium mb-2">Subscribe to our newsletter</Label>
            <p className="text-sm text-muted-foreground mb-3">Get exclusive PM insights, frameworks, and AI tips directly in your inbox!</p>
            <Input 
              className="formkit-input w-full mb-3" 
              name="email_address" 
              id="email_address"
              aria-label="Email Address" 
              placeholder="Enter your email" 
              required 
              type="email"
            />
            <Input 
              className="formkit-input w-full" 
              name="fields[first_name]" 
              id="first_name"
              aria-label="First Name" 
              placeholder="Hi, what's your first name?" 
              required 
              type="text"
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
