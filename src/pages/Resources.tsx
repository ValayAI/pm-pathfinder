
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EmailSignup from "../components/EmailSignup";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, Video, Download, Eye, Wand2 } from "lucide-react";

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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Product Management Resources</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Access our library of templates, guides, and tools to enhance your product management skills.
            </p>
            
            {/* Email signup component */}
            <div className="max-w-md mx-auto mt-6">
              <EmailSignup />
            </div>
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
          
          <div className="mt-16 bg-muted/50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Need Custom Resources?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our team can create tailored resources for your specific product management challenges.
            </p>
            <Button size="lg">
              Request Custom Resources
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Resources;
