
import React, { useRef, useState } from 'react';
import { toast } from "sonner";
import { isSubscribed, addSubscriber } from '@/utils/subscriberUtils';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Mail, AlertCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const EmailSignup = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const location = useLocation();
  
  // Don't render the component on the sign-up page
  if (location.pathname === '/sign-up' || location.pathname === '/signup') {
    return null;
  }

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
    const loadingToast = toast.loading("Processing your subscription...");
    setIsSubmitting(true);
    
    console.log("Submitting to ConvertKit:", email, firstName);
    
    // Submit the form to ConvertKit
    fetch("https://app.convertkit.com/forms/7822296/subscriptions", {
      method: "POST",
      body: formData,
      headers: {
        accept: "application/json",
      }
    })
    .then(response => {
      console.log("ConvertKit response received:", response.status);
      toast.dismiss(loadingToast);
      
      if (response.ok) {
        // Show success toast
        console.log("Showing success toast");
        toast.success("Thank you for subscribing to our newsletter!");
        
        // Add to local storage
        addSubscriber(email);
        
        // Show confirmation message
        setIsSubmitted(true);
        
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
      toast.dismiss(loadingToast);
      console.log("Showing error toast");
      toast.error("There was an error subscribing to the newsletter. Please try again later.");
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };

  if (isSubmitted) {
    return (
      <div className="bg-muted/30 border border-border rounded-md shadow-sm p-4">
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <div className="rounded-full bg-green-100 p-2">
              <Mail className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <h4 className="font-medium text-lg">Check your inbox!</h4>
          <p className="text-sm text-muted-foreground">
            Please check your email and click the confirmation link to complete your subscription.
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded p-3 mt-3">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
              <p className="text-sm text-amber-800">
                If you don't see the confirmation email, please check your spam folder.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-muted/30 border border-border rounded-md shadow-sm">
      <form 
        ref={formRef}
        action="https://app.convertkit.com/forms/7822296/subscriptions" 
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
