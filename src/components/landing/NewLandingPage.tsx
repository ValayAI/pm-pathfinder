import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import EmailSignup from "@/components/EmailSignup";
import Footer from "@/components/Footer";

interface NewLandingPageProps {
  loaded: boolean;
}

const NewLandingPage = ({ loaded }: NewLandingPageProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground font-inter">
      <main>
        {/* Hero Section */}
        <section className="bg-[#f9fafb] py-16 px-5 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-[2.75rem] font-bold mb-5 leading-tight">
              Your AI-Powered Product Management Coach
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Instant answers, frameworks, and career advice — available 24/7 for PMs.
            </p>
            <Link to="/chat">
              <Button 
                size="lg" 
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-6 h-auto rounded-lg font-semibold text-base"
              >
                Start Free – Ask Your First Question
              </Button>
            </Link>
          </div>
        </section>

        {/* Who Is PM-Pathfinder For Section */}
        <section className="py-16 px-5 text-center">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-semibold mb-10">Who Is PM-Pathfinder For?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">
              <div className="max-w-xs mx-auto">
                <h3 className="text-xl font-semibold mb-3">📌 Aspiring PMs</h3>
                <p className="text-gray-700">Break into product management with guidance at every step.</p>
              </div>
              <div className="max-w-xs mx-auto">
                <h3 className="text-xl font-semibold mb-3">🧠 Mid-Level PMs</h3>
                <p className="text-gray-700">Level up your career and handle real-world challenges like a pro.</p>
              </div>
              <div className="max-w-xs mx-auto">
                <h3 className="text-xl font-semibold mb-3">🚀 Career Switchers</h3>
                <p className="text-gray-700">Translate your experience and land PM interviews with confidence.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Top Use Cases Section */}
        <section className="py-16 px-5 bg-gray-50 text-center">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-semibold mb-10">Top Use Cases</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">
              <div className="max-w-xs mx-auto">
                <h3 className="text-xl font-semibold mb-3">📋 Interview Prep</h3>
                <p className="text-gray-700">Practice case questions and get feedback instantly.</p>
              </div>
              <div className="max-w-xs mx-auto">
                <h3 className="text-xl font-semibold mb-3">🧭 Product Strategy</h3>
                <p className="text-gray-700">Ask tough questions about prioritization, roadmaps, or KPIs.</p>
              </div>
              <div className="max-w-xs mx-auto">
                <h3 className="text-xl font-semibold mb-3">💼 Career Coaching</h3>
                <p className="text-gray-700">Get advice on job transitions, resumes, and stakeholder management.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 px-5 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-semibold mb-10">What People Are Saying</h2>
            <div className="space-y-8">
              <p className="text-lg italic text-gray-700">"I used PM-Pathfinder before my big interview — and I nailed it. The AI gave better answers than my real coach!" — Alex R.</p>
              <p className="text-lg italic text-gray-700">"As a solo PM, this tool has saved me hours. It's like having a mentor on call." — Priya M.</p>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="bg-[#f9fafb] py-16 px-5 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-semibold mb-5">Ready to Try It?</h2>
            <p className="text-lg md:text-xl mb-8">Jump in and ask your first question. It's free to start.</p>
            <Link to="/signup">
              <Button 
                size="lg" 
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-6 h-auto rounded-lg font-semibold text-base mb-8"
              >
                Get Started Now
              </Button>
            </Link>
            
            {/* Keep existing sustainability message */}
            <div className={cn(
              "transition-all duration-1000",
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
