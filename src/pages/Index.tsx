
import { useEffect, useState } from 'react';
import { Navigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureSection from "@/components/FeatureSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import EmailSignup from "@/components/EmailSignup";
import { Leaf, ArrowRight, BarChart3, BookOpen, Compass, MessageSquare, Sparkles, Calendar, CheckCircle2, LightbulbIcon, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/AuthProvider";
import Dashboard from "@/components/Dashboard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/20 p-6 rounded-xl mb-6">
              <h1 className="text-3xl font-bold mb-2 text-gradient-primary bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Welcome to PM Pathfinder</h1>
              <p className="text-lg text-muted-foreground mb-6">
                Your product management journey starts here. Navigate through the dashboard to access all your PM tools and resources.
              </p>
            </div>
          </section>
          
          {/* Quick Actions Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-primary" />
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="hover:shadow-md transition-shadow border-l-4 border-l-prioritization-DEFAULT hover:translate-y-[-4px] duration-300">
                <CardHeader className="pb-2 bg-gradient-to-br from-prioritization-light/50 to-transparent">
                  <CardTitle className="text-lg flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2 text-prioritization-DEFAULT" />
                    Chat with PM Coach
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Get instant answers to your product management questions</p>
                  <Link to="/chat">
                    <Button size="sm" className="bg-prioritization-DEFAULT hover:bg-prioritization-DEFAULT/90 text-white font-medium shadow-md hover:shadow-lg">
                      Start Chat <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow border-l-4 border-l-requirements-DEFAULT hover:translate-y-[-4px] duration-300">
                <CardHeader className="pb-2 bg-gradient-to-br from-requirements-light/50 to-transparent">
                  <CardTitle className="text-lg flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-requirements-DEFAULT" />
                    Browse Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Access templates, guides, and frameworks</p>
                  <Link to="/resources">
                    <Button size="sm" className="bg-requirements-DEFAULT hover:bg-requirements-DEFAULT/90 text-white font-medium shadow-md hover:shadow-lg">
                      View Resources <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow border-l-4 border-l-planning-DEFAULT hover:translate-y-[-4px] duration-300">
                <CardHeader className="pb-2 bg-gradient-to-br from-planning-light/50 to-transparent">
                  <CardTitle className="text-lg flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-planning-DEFAULT" />
                    Plan Your Roadmap
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Create and manage your product roadmap</p>
                  <Link to="/roadmap">
                    <Button size="sm" className="bg-planning-DEFAULT hover:bg-planning-DEFAULT/90 text-white font-medium shadow-md hover:shadow-lg">
                      Open Roadmap <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </section>
          
          {/* Recent Activity Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2 text-strategic-DEFAULT" />
              Recent Activity
            </h2>
            <Card className="border border-strategic-light/50 shadow-sm">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[
                    { icon: <Sparkles className="h-4 w-4 text-strategic-DEFAULT" />, text: "You started a new chat with PM Coach", time: "Today at 10:30 AM", color: "bg-strategic-light" },
                    { icon: <BookOpen className="h-4 w-4 text-requirements-DEFAULT" />, text: "Downloaded Product Requirements Template", time: "Yesterday at 3:45 PM", color: "bg-requirements-light" },
                    { icon: <MessageSquare className="h-4 w-4 text-discovery-DEFAULT" />, text: "Booked coaching session with Sarah", time: "2 days ago", color: "bg-discovery-light" },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start pb-3 border-b last:border-b-0 last:pb-0">
                      <div className={`h-8 w-8 rounded-full ${activity.color} flex items-center justify-center mr-3 flex-shrink-0`}>
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
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <LightbulbIcon className="h-5 w-5 mr-2 text-analytics-DEFAULT" />
              Recommended for You
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="hover:shadow-md transition-shadow border-t-4 border-t-analytics-DEFAULT hover:translate-y-[-4px] duration-300">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">RICE Prioritization Framework</CardTitle>
                    <Badge className="bg-analytics-light text-analytics-DEFAULT">Popular</Badge>
                  </div>
                  <CardDescription>Strategic planning tool</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Learn how to prioritize features using the RICE scoring model</p>
                  <Link to="/resources">
                    <Button variant="outline" size="sm" className="text-analytics-DEFAULT border-analytics-DEFAULT hover:bg-analytics-light/50 font-medium shadow-sm hover:shadow-md">
                      View Resource <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow border-t-4 border-t-discovery-DEFAULT hover:translate-y-[-4px] duration-300">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">Product Strategy Template</CardTitle>
                    <Badge className="bg-discovery-light text-discovery-DEFAULT">Trending</Badge>
                  </div>
                  <CardDescription>Strategic planning</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">A comprehensive template to define your product strategy</p>
                  <Link to="/resources">
                    <Button variant="outline" size="sm" className="text-discovery-DEFAULT border-discovery-DEFAULT hover:bg-discovery-light/50 font-medium shadow-sm hover:shadow-md">
                      View Template <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </section>
          
          {/* Upcoming Events Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-primary" />
              Upcoming Events
            </h2>
            <Card className="bg-gradient-to-br from-white to-blue-50/50 dark:from-gray-900 dark:to-blue-950/20 border border-blue-100 dark:border-blue-900/30">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="mr-4 p-2 bg-primary/10 text-primary rounded-md text-center min-w-16 border border-primary/20">
                      <p className="text-sm font-bold">MAY</p>
                      <p className="text-xl font-bold">15</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Product Metrics Workshop</h3>
                      <p className="text-sm text-muted-foreground">10:00 AM - 11:30 AM</p>
                      <p className="text-sm mt-1">Learn how to define and track the right metrics for your product</p>
                      <Link to="/events" className="inline-block mt-2">
                        <Button size="sm" variant="outline" className="bg-primary/5 hover:bg-primary/10 text-primary border-primary/20 shadow-sm hover:shadow-md">
                          Register Now <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                  
                  <div className="flex items-start pt-4 border-t border-blue-100 dark:border-blue-900/30">
                    <div className="mr-4 p-2 bg-primary/10 text-primary rounded-md text-center min-w-16 border border-primary/20">
                      <p className="text-sm font-bold">MAY</p>
                      <p className="text-xl font-bold">22</p>
                    </div>
                    <div>
                      <h3 className="font-medium">User Research Fundamentals</h3>
                      <p className="text-sm text-muted-foreground">2:00 PM - 3:30 PM</p>
                      <p className="text-sm mt-1">Master the basics of conducting effective user research</p>
                      <Link to="/events" className="inline-block mt-2">
                        <Button size="sm" variant="outline" className="bg-primary/5 hover:bg-primary/10 text-primary border-primary/20 shadow-sm hover:shadow-md">
                          Register Now <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </Link>
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

export default Index;
