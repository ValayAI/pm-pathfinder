
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Leaf, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import EmailSignup from "@/components/EmailSignup";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import FeatureSection from "@/components/FeatureSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";

interface NewLandingPageProps {
  loaded: boolean;
}

const NewLandingPage = ({ loaded }: NewLandingPageProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground font-inter overflow-x-hidden">
      <main>
        {/* Hero Section */}
        <Hero />

        {/* Features Section */}
        <FeatureSection />
        
        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* CTA Section */}
        <CTASection />

        {/* Final Section with Sustainability Message */}
        <section className="py-16 px-5 text-center bg-gradient-to-b from-background to-muted/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold mb-5 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">Your AI-Powered PM Journey Starts Here</h2>
            <p className="text-lg md:text-xl mb-8 text-muted-foreground">
              Join thousands of product managers who are already transforming their careers.
            </p>
            <Link to="/signup">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white px-8 py-6 h-auto rounded-lg font-semibold text-base mb-8 shadow-md hover:shadow-lg transition-all duration-300"
              >
                Get Started Now
              </Button>
            </Link>
            
            {/* Sustainability message */}
            <div className={cn(
              "transition-all duration-1000 mt-12",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}>
              <div className="container mx-auto px-4">
                <div className="flex items-center justify-center">
                  <div className="p-2 rounded-full bg-green-50 dark:bg-green-900/20 mr-3">
                    <Leaf className="h-4 w-4 text-green-500" />
                  </div>
                  <p className="font-eco text-sm text-green-600 dark:text-green-400">
                    1% of your purchase goes to removing CO₂ from the atmosphere
                  </p>
                </div>
                
                {/* Email signup component */}
                <div className="max-w-md mx-auto mt-6">
                  <EmailSignup />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default NewLandingPage;
