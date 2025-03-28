
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Leaf, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Hero from "@/components/Hero";
import FeatureSection from "@/components/FeatureSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import EmailSignup from "@/components/EmailSignup";

interface LandingPageProps {
  loaded: boolean;
}

const LandingPage = ({ loaded }: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
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
                <Button variant="default" size="lg" className="group bg-primary shadow-md hover:shadow-lg">
                  Create an Account
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
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

export default LandingPage;
