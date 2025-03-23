import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EmailSignup from "../components/EmailSignup";
import TeaserWrapper from '../components/TeaserWrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, FileText, Video, Download, Eye, Wand2, Calendar, Lock, LockOpen } from "lucide-react";

const Resources = () => {
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

  const fullContent = (
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
      
      {/* New 30-60-90 Day Plan Section */}
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
      
      {/* Email signup moved to bottom */}
      <div className="max-w-md mx-auto mt-16">
        <EmailSignup />
      </div>
    </div>
  );

  const previewContent = (
    <div className="space-y-8">
      {/* Featured resources preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="h-full">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <FileText className="h-8 w-8 text-primary" />
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                Free Preview
              </Badge>
            </div>
            <CardTitle className="mt-4">How to Write a Killer PRD</CardTitle>
            <CardDescription>Essential tips for creating effective product requirement documents</CardDescription>
          </CardHeader>
          <CardContent className="pt-2 space-y-4">
            <div>
              <h4 className="font-medium text-sm mb-2">Preview:</h4>
              <p className="text-sm text-muted-foreground">
                A great PRD starts with a clear problem statement and success metrics. Begin by answering: What problem 
                are we solving? How will we know we've succeeded? Who is this for?
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background flex items-end justify-center pb-4">
                <div className="flex items-center text-primary text-sm font-medium">
                  <Lock className="h-3.5 w-3.5 mr-1.5" />
                  Sign up to read full guide
                </div>
              </div>
              <div className="text-sm text-muted-foreground opacity-25 p-4 overflow-hidden max-h-20">
                When structuring your PRD, follow these key sections:
                1. Background & Strategic Fit
                2. Success Metrics & KPIs
                3. User Personas & Journey Maps
                4. Functional Requirements
                5. Non-functional Requirements
                6. Design Specifications
                7. Technical Considerations
                8. Go-to-market Strategy
                9. Timeline & Milestones
              </div>
            </div>
            <Button variant="outline" className="w-full">
              <Eye className="mr-2 h-4 w-4" />
              Preview Full Template
            </Button>
          </CardContent>
        </Card>
        
        <Card className="h-full">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <BookOpen className="h-8 w-8 text-primary" />
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                Free Preview
              </Badge>
            </div>
            <CardTitle className="mt-4">Top PM Interview Questions</CardTitle>
            <CardDescription>Prepare for your next product management interview</CardDescription>
          </CardHeader>
          <CardContent className="pt-2 space-y-4">
            <div>
              <h4 className="font-medium text-sm mb-2">Preview:</h4>
              <p className="text-sm text-muted-foreground">
                <strong>Question 1:</strong> "Tell me about a product you admire and why."
                <br />
                <strong>Tip:</strong> Focus on the problem it solves, not just features. Discuss the target audience and how the product creates value.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background flex items-end justify-center pb-4">
                <div className="flex items-center text-primary text-sm font-medium">
                  <Lock className="h-3.5 w-3.5 mr-1.5" />
                  Sign up to see all 30+ questions
                </div>
              </div>
              <div className="text-sm text-muted-foreground opacity-25 p-4 overflow-hidden max-h-20">
                <strong>Question 2:</strong> "How would you improve our product?"
                <br />
                <strong>Question 3:</strong> "Tell me about a time you had to make a difficult product decision."
                <br />
                <strong>Question 4:</strong> "How do you prioritize features?"
              </div>
            </div>
            <Button variant="outline" className="w-full">
              <Eye className="mr-2 h-4 w-4" />
              See Sample Answers
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {/* Resource categories */}
      <div className="bg-muted/30 border border-border rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Full Resource Library</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          <div className="bg-card border border-border rounded-md p-3 flex flex-col items-center text-center">
            <FileText className="h-8 w-8 text-primary mb-2" />
            <span className="text-sm font-medium">Templates</span>
            <span className="text-xs text-muted-foreground">12 items</span>
          </div>
          <div className="bg-card border border-border rounded-md p-3 flex flex-col items-center text-center">
            <BookOpen className="h-8 w-8 text-primary mb-2" />
            <span className="text-sm font-medium">Guides</span>
            <span className="text-xs text-muted-foreground">8 items</span>
          </div>
          <div className="bg-card border border-border rounded-md p-3 flex flex-col items-center text-center">
            <Video className="h-8 w-8 text-primary mb-2" />
            <span className="text-sm font-medium">Videos</span>
            <span className="text-xs text-muted-foreground">6 items</span>
          </div>
          <div className="bg-card border border-border rounded-md p-3 flex flex-col items-center text-center">
            <Calendar className="h-8 w-8 text-primary mb-2" />
            <span className="text-sm font-medium">Planners</span>
            <span className="text-xs text-muted-foreground">4 items</span>
          </div>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground mb-1">
            <LockOpen className="inline h-3.5 w-3.5 mr-1" />
            Unlock full access to 30+ PM resources
          </p>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-24">
        <TeaserWrapper
          title="Product Management Resources"
          description="Access our library of templates, guides, and tools to enhance your product management skills."
          previewContent={previewContent}
        >
          {fullContent}
        </TeaserWrapper>
      </main>
      <Footer />
    </div>
  );
};

export default Resources;
