import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Hero from "@/components/Hero";
import FeatureSection from "@/components/FeatureSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import EmailSignup from "@/components/EmailSignup";
import { Leaf, ArrowRight, BarChart3, BookOpen, Compass, MessageSquare, Sparkles, Calendar, CheckCircle2, LightbulbIcon, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/AuthProvider";
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

  // If user is logged in, show dashboard content without sidebar
  if (user) {
    return (
      <div className="min-h-screen flex flex-col bg-background relative">
        <div className="absolute inset-0 -z-10 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background"></div>
        <main className="flex-1 overflow-auto pb-24 md:pb-10 pt-20 md:pt-24 px-4 md:px-6 lg:px-10">
          <div className="pt-4 md:pt-6">
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
                  {/* Chat with PM Coach Card */}
                  <Card className="border-none shadow-sm hover:shadow-md transition-shadow hover:translate-y-[-4px] duration-300 overflow-hidden">
                    <div className="bg-[#F1F0FB] dark:bg-blue-950/20 p-8">
                      <div className="mb-4">
                        <MessageSquare className="h-6 w-6 text-[#8B5CF6]" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Chat with PM Coach</h3>
                      <p className="text-muted-foreground mb-6">
                        Get instant answers to your product management questions
                      </p>
                      <Link to="/chat">
                        <Button variant="outline" size="sm" className="text-[#8B5CF6] border-[#8B5CF6] hover:bg-[#E5DEFF]/50">
                          Start Chat
                        </Button>
                      </Link>
                    </div>
                  </Card>
                  
                  {/* Browse Resources Card */}
                  <Card className="border-none shadow-sm hover:shadow-md transition-shadow hover:translate-y-[-4px] duration-300 overflow-hidden">
                    <div className="bg-[#FEF7CD] dark:bg-amber-950/20 p-8">
                      <div className="mb-4">
                        <BookOpen className="h-6 w-6 text-[#F97316]" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Browse Resources</h3>
                      <p className="text-muted-foreground mb-6">
                        Access templates, guides, and frameworks
                      </p>
                      <Link to="/resources">
                        <Button variant="outline" size="sm" className="text-[#F97316] border-[#F97316] hover:bg-[#FFEDD5]/50">
                          View Resources
                        </Button>
                      </Link>
                    </div>
                  </Card>
                  
                  {/* Plan Your Roadmap Card */}
                  <Card className="border-none shadow-sm hover:shadow-md transition-shadow hover:translate-y-[-4px] duration-300 overflow-hidden">
                    <div className="bg-[#F2FCE2] dark:bg-green-950/20 p-8">
                      <div className="mb-4">
                        <BarChart3 className="h-6 w-6 text-[#10B981]" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Plan Your Roadmap</h3>
                      <p className="text-muted-foreground mb-6">
                        Create and manage your product roadmap
                      </p>
                      <Link to="/roadmap">
                        <Button variant="outline" size="sm" className="text-[#10B981] border-[#10B981] hover:bg-[#D1FAE5]/50">
                          Open Roadmap
                        </Button>
                      </Link>
                    </div>
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
          </div>
        </main>
      </div>
    );
  }

  // Non-authenticated view
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

export default Index;
