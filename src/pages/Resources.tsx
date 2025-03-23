import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EmailSignup from "../components/EmailSignup";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, Video, Download, Eye, Wand2, Calendar } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import ResourcesTeaser from "@/components/teasers/ResourcesTeaser";

const Resources = () => {
  const { user } = useAuth();
  
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 pt-24 md:pt-28 pb-12">
          <ResourcesTeaser />
        </main>
        <Footer />
      </div>
    );
  }
  
  const resources = [
    {
      title: "Product Requirement Document Template",
      type: "Template",
      description: "A comprehensive PRD template to define product features and requirements",
      icon: <FileText className="h-8 w-8 text-primary" />,
      showSampleGenerate: true // Show both Sample and Generate buttons
    },
    {
      title: "User Interview Playbook",
      type: "Guide",
      description: "Learn how to conduct effective user interviews to gather valuable insights",
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      action: "Read Guide",
    },
    {
      title: "Product Strategy Workshop",
      type: "Video",
      description: "A 45-minute workshop on building effective product strategies",
      icon: <Video className="h-8 w-8 text-primary" />,
      action: "Watch Now",
    },
    {
      title: "Competitive Analysis Framework",
      type: "Template",
      description: "Template for analyzing competitors and identifying market opportunities",
      icon: <FileText className="h-8 w-8 text-primary" />,
      action: "Download",
    },
    {
      title: "Product Metrics Guide",
      type: "Guide",
      description: "Key metrics every product manager should track for success",
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      action: "Read Guide",
    },
    {
      title: "A/B Testing Methodology",
      type: "Template",
      description: "Step-by-step process for effective A/B testing of product features",
      icon: <Download className="h-8 w-8 text-primary" />,
      action: "Download",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 pt-24 md:pt-28 pb-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Product Management Resources</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Access our library of templates, guides, and tools to enhance your product management skills.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <Card key={index} className="h-full flex flex-col">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    {resource.icon}
                    <span className="text-sm bg-muted text-muted-foreground px-2 py-1 rounded-md">
                      {resource.type}
                    </span>
                  </div>
                  <CardTitle className="mt-4">{resource.title}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-2 mt-auto">
                  {resource.showSampleGenerate ? (
                    <div className="flex flex-col space-y-2">
                      <Button variant="outline" className="w-full flex items-center justify-center">
                        <Eye className="mr-2 h-4 w-4" />
                        Sample
                      </Button>
                      <Button variant="default" className="w-full flex items-center justify-center">
                        <Wand2 className="mr-2 h-4 w-4" />
                        Generate
                      </Button>
                    </div>
                  ) : (
                    <Button variant="secondary" className="w-full">
                      {resource.action}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-16 mb-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-3">Design Your "30-60-90 Day" Plan</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Create a structured onboarding plan for your new product management role
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="glass-effect hover-lift">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Calendar className="h-8 w-8 text-blue-500" />
                    <span className="text-sm bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-2 py-1 rounded-md">
                      First 30 Days
                    </span>
                  </div>
                  <CardTitle className="mt-4">Learning & Discovery</CardTitle>
                  <CardDescription>Understand the product, team dynamics, and company goals</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mt-2">
                    <li className="flex items-start">
                      <div className="bg-blue-100 dark:bg-blue-900/20 p-1 rounded-full mr-2 mt-1">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      </div>
                      <span className="text-sm">Meet key stakeholders</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-100 dark:bg-blue-900/20 p-1 rounded-full mr-2 mt-1">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      </div>
                      <span className="text-sm">Review product documentation</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-100 dark:bg-blue-900/20 p-1 rounded-full mr-2 mt-1">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      </div>
                      <span className="text-sm">Understand current metrics</span>
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full mt-4">
                    Get 30-Day Template
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="glass-effect hover-lift">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Calendar className="h-8 w-8 text-indigo-500" />
                    <span className="text-sm bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 px-2 py-1 rounded-md">
                      Days 31-60
                    </span>
                  </div>
                  <CardTitle className="mt-4">Strategic Planning</CardTitle>
                  <CardDescription>Develop initial strategies and begin to contribute</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mt-2">
                    <li className="flex items-start">
                      <div className="bg-indigo-100 dark:bg-indigo-900/20 p-1 rounded-full mr-2 mt-1">
                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                      </div>
                      <span className="text-sm">Identify opportunity areas</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-indigo-100 dark:bg-indigo-900/20 p-1 rounded-full mr-2 mt-1">
                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                      </div>
                      <span className="text-sm">Collaborate on roadmap planning</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-indigo-100 dark:bg-indigo-900/20 p-1 rounded-full mr-2 mt-1">
                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                      </div>
                      <span className="text-sm">Propose initial improvements</span>
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full mt-4">
                    Get 60-Day Template
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="glass-effect hover-lift">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Calendar className="h-8 w-8 text-purple-500" />
                    <span className="text-sm bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 px-2 py-1 rounded-md">
                      Days 61-90
                    </span>
                  </div>
                  <CardTitle className="mt-4">Execution & Impact</CardTitle>
                  <CardDescription>Deliver measurable results and lead initiatives</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mt-2">
                    <li className="flex items-start">
                      <div className="bg-purple-100 dark:bg-purple-900/20 p-1 rounded-full mr-2 mt-1">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                      </div>
                      <span className="text-sm">Lead feature development</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-purple-100 dark:bg-purple-900/20 p-1 rounded-full mr-2 mt-1">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                      </div>
                      <span className="text-sm">Analyze & share initial results</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-purple-100 dark:bg-purple-900/20 p-1 rounded-full mr-2 mt-1">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                      </div>
                      <span className="text-sm">Establish long-term vision</span>
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full mt-4">
                    Get 90-Day Template
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center mt-6">
              <Button variant="default" size="lg" className="button-hover">
                <Wand2 className="mr-2 h-4 w-4" />
                Generate Custom 30-60-90 Plan
              </Button>
            </div>
          </div>
          
          <div className="mt-16 bg-muted/50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Need Custom Resources?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our team can create tailored resources for your specific product management challenges.
            </p>
            <Button size="lg">
              Request Custom Resources
            </Button>
          </div>
          
          <div className="max-w-md mx-auto mt-16">
            <EmailSignup />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Resources;
