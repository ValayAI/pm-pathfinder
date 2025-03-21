
import { useEffect, useState } from 'react';
import { Navigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureSection from "@/components/FeatureSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import EmailSignup from "@/components/EmailSignup";
import { Leaf, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/AuthProvider";
import Dashboard from "@/components/Dashboard";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const { user } = useAuth();

  // Smooth scroll to top on page load and set loaded state for animations
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setLoaded(true);
  }, []);

  // If user is logged in, redirect to dashboard
  if (user) {
    return <Dashboard />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="space-y-8">
        <Hero />
        <div className={cn(
          "py-4 text-center transition-all duration-1000",
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="container mx-auto px-4">
            {/* Sustainability message */}
            <div className="flex items-center justify-center">
              <Leaf className="h-4 w-4 text-green-500 mr-2" />
              <p className="font-eco text-sm text-green-600 dark:text-green-400">
                1% of your purchase goes to removing CO₂ from the atmosphere
              </p>
            </div>
            
            {/* Email signup component */}
            <div className="max-w-md mx-auto mt-4">
              <EmailSignup />
            </div>
            
            {/* Sign up button */}
            <div className="mt-4">
              <Link to="/signup">
                <Button variant="outline" className="group">
                  Create an Account
                  <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <FeatureSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
