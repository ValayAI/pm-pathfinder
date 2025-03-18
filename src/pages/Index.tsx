
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureSection from "@/components/FeatureSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import EmailSignup from "@/components/EmailSignup";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquareText, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

const Index = () => {
  const [loaded, setLoaded] = useState(false);

  // Smooth scroll to top on page load and set loaded state for animations
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <div className={cn(
          "py-12 text-center transition-all duration-1000",
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="container mx-auto px-4">
            <Link to="/chat">
              <Button size="lg" className="group mb-4 bg-gradient-to-r from-primary to-primary/80">
                <MessageSquareText className="mr-2 h-5 w-5" />
                Try AI PM Coach
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <p className="text-muted-foreground">Get instant answers to your product management questions</p>
            
            {/* Sustainability message */}
            <div className="mt-4 mb-6 flex items-center justify-center">
              <Leaf className="h-4 w-4 text-green-500 mr-2" />
              <p className="font-eco text-sm text-green-600 dark:text-green-400">
                1% of your purchase goes to removing CO₂ from the atmosphere
              </p>
            </div>
            
            {/* Email signup component */}
            <div className="max-w-md mx-auto mt-8">
              <EmailSignup />
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
