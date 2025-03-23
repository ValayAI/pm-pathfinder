
import React from 'react';
import TeaserWrapper from '../components/TeaserWrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Search, Target, MessageSquare, AlertTriangle, CheckCircle } from "lucide-react";

const Explore = () => {
  const fullContent = (
    <div className="px-4 py-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Explore PM Tools</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mb-8">
          Discover our collection of AI-powered tools designed specifically for product managers.
        </p>
        
        {/* Full content for authenticated users */}
        <div className="space-y-8">
          <p>This is the full Explore page content for authenticated users.</p>
          
          {/* Featured AI tools */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <Badge className="w-fit mb-2 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                  Most Popular
                </Badge>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" /> 
                  Interview Answer Generator
                </CardTitle>
                <CardDescription>
                  Get AI-powered suggestions for your PM interview answers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  Simply describe the interview question and get a structured STAR response tailored to your experience.
                </p>
                <Button>
                  <Search className="mr-2 h-4 w-4" />
                  Try Now
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" /> 
                  Prioritization Framework
                </CardTitle>
                <CardDescription>
                  Analyze feature ideas with RICE, Kano, or MoSCoW methods
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  Input your features and criteria, and get instant calculations and visualizations to guide decision-making.
                </p>
                <Button>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Use Tool
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" /> 
                  User Insight Generator
                </CardTitle>
                <CardDescription>
                  Craft effective questions for user research sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  Tell us about your product and target users, and we'll generate tailored questions for meaningful insights.
                </p>
                <Button>
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Access Tool
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
  
  // Preview content for non-authenticated users
  const previewContent = (
    <div className="space-y-8">
      {/* Featured AI tools preview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-2 border-primary/50">
          <CardHeader className="pb-2">
            <Badge className="w-fit mb-2 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
              Most Popular
            </Badge>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" /> 
              Interview Answer Generator
            </CardTitle>
            <CardDescription>
              Get AI-powered suggestions for your PM interview answers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Simply describe the interview question and get a structured STAR response tailored to your experience.
            </p>
            <Button variant="outline" className="w-full" disabled>
              <Search className="mr-2 h-4 w-4" />
              Try Demo
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" /> 
              Prioritization Framework
            </CardTitle>
            <CardDescription>
              Analyze feature ideas with RICE, Kano, or MoSCoW methods
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Input your features and criteria, and get instant calculations and visualizations to guide decision-making.
            </p>
            <Button variant="outline" className="w-full" disabled>
              <CheckCircle className="mr-2 h-4 w-4" />
              See Example
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" /> 
              User Insight Generator
            </CardTitle>
            <CardDescription>
              Craft effective questions for user research sessions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Input your features and criteria, and get instant calculations and visualizations to guide decision-making.
            </p>
            <Button variant="outline" className="w-full" disabled>
              <ArrowRight className="mr-2 h-4 w-4" />
              Preview Tool
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {/* Testimonials */}
      <div className="bg-muted/30 border border-border rounded-lg p-6 mt-8">
        <h3 className="text-xl font-semibold mb-4">What Product Managers Say</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card p-4 rounded-lg border border-border">
            <p className="italic text-muted-foreground mb-3">
              "The PM Coach helped me prepare for my interviews at Google. I went from rejected to hired in just 3 weeks!"
            </p>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">JL</div>
              <div className="ml-2">
                <p className="text-sm font-medium">Jamie L.</p>
                <p className="text-xs text-muted-foreground">Senior PM at Google</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card p-4 rounded-lg border border-border">
            <p className="italic text-muted-foreground mb-3">
              "I use the prioritization tools weekly with my team. They've completely transformed how we make decisions."
            </p>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">MK</div>
              <div className="ml-2">
                <p className="text-sm font-medium">Michael K.</p>
                <p className="text-xs text-muted-foreground">Product Lead at Figma</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  return (
    <TeaserWrapper 
      title="Explore PM Tools" 
      description="Discover our collection of AI-powered tools designed specifically for product managers."
      previewContent={previewContent}
    >
      {fullContent}
    </TeaserWrapper>
  );
};

export default Explore;
