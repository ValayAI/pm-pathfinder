
import { useEffect, useState } from 'react';
import { Navigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureSection from "@/components/FeatureSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import EmailSignup from "@/components/EmailSignup";
import { Leaf, ArrowRight, BarChart3, BookOpen, Compass, MessageSquare, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/AuthProvider";
import Dashboard from "@/components/Dashboard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
    return (
      <Dashboard>
        <div className="max-w-6xl mx-auto space-y-8">
          <section>
            <h1 className="text-3xl font-bold mb-2">Welcome to PM Pathfinder</h1>
            <p className="text-lg text-muted-foreground mb-6">
              Your product management journey starts here. Navigate through the dashboard to access all your PM tools and resources.
            </p>
          </section>
          
          {/* Quick Actions Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Sparkles className="h-5 w-5 mr-2 text-primary" />
                    Chat with PM Coach
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Get instant answers to your product management questions</p>
                  <Link to="/chat">
                    <Button size="sm">Start Chat</Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-primary" />
                    Browse Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Access templates, guides, and frameworks</p>
                  <Link to="/resources">
                    <Button size="sm">View Resources</Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                    Plan Your Roadmap
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Create and manage your product roadmap</p>
                  <Link to="/roadmap">
                    <Button size="sm">Open Roadmap</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </section>
          
          {/* Recent Activity Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[
                    { icon: <Sparkles className="h-4 w-4" />, text: "You started a new chat with PM Coach", time: "Today at 10:30 AM" },
                    { icon: <BookOpen className="h-4 w-4" />, text: "Downloaded Product Requirements Template", time: "Yesterday at 3:45 PM" },
                    { icon: <MessageSquare className="h-4 w-4" />, text: "Booked coaching session with Sarah", time: "2 days ago" },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start pb-3 border-b last:border-b-0 last:pb-0">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                        {activity.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{activity.text}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
          
          {/* Recommended Resources Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Recommended for You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">RICE Prioritization Framework</CardTitle>
                  <CardDescription>Popular resource</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Learn how to prioritize features using the RICE scoring model</p>
                  <Link to="/resources">
                    <Button variant="outline" size="sm">View Resource</Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Product Strategy Template</CardTitle>
                  <CardDescription>Trending this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">A comprehensive template to define your product strategy</p>
                  <Link to="/resources">
                    <Button variant="outline" size="sm">View Template</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </section>
          
          {/* Upcoming Events Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="mr-4 p-2 bg-primary/10 rounded-md text-center min-w-16">
                      <p className="text-sm font-bold">MAY</p>
                      <p className="text-xl font-bold">15</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Product Metrics Workshop</h3>
                      <p className="text-sm text-muted-foreground">10:00 AM - 11:30 AM</p>
                      <p className="text-sm mt-1">Learn how to define and track the right metrics for your product</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start pt-4 border-t">
                    <div className="mr-4 p-2 bg-primary/10 rounded-md text-center min-w-16">
                      <p className="text-sm font-bold">MAY</p>
                      <p className="text-xl font-bold">22</p>
                    </div>
                    <div>
                      <h3 className="font-medium">User Research Fundamentals</h3>
                      <p className="text-sm text-muted-foreground">2:00 PM - 3:30 PM</p>
                      <p className="text-sm mt-1">Master the basics of conducting effective user research</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </Dashboard>
    );
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
