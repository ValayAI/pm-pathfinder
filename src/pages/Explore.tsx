
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TeaserWrapper from '../components/TeaserWrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Search, Target, MessageSquare, AlertTriangle, CheckCircle } from "lucide-react";

const Explore = () => {
  const fullContent = (
    <div>
      {/* Full content that will be shown to logged-in users */}
      <div className="full-content">
        {/* Your existing explore content goes here */}
        <p>This is the full Explore page content for authenticated users.</p>
      </div>
    </div>
  );
  
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
              Tell us about your product and target users, and we'll generate tailored questions for meaningful insights.
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
      
      {/* Premium tools teaser */}
      <div className="relative border-2 border-dashed border-primary/50 rounded-lg p-6">
        <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
          <div className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            PRO
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-2">10+ Premium PM Tools Await</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <Badge variant="secondary">PRD Generator</Badge>
          <Badge variant="secondary">Competitor Analysis</Badge>
          <Badge variant="secondary">User Persona Creator</Badge>
          <Badge variant="secondary">Launch Checklist</Badge>
          <Badge variant="secondary">Roadmap Planner</Badge>
          <Badge variant="secondary">User Story Writer</Badge>
          <Badge variant="secondary">Feature Spec Maker</Badge>
          <Badge variant="secondary">Growth Metrics</Badge>
        </div>
        <div className="flex items-center text-sm text-primary">
          <AlertTriangle className="h-4 w-4 mr-2" />
          Sign up to unlock all premium tools
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <TeaserWrapper 
        title="Explore PM Tools" 
        description="Discover our collection of AI-powered tools designed specifically for product managers."
        previewContent={previewContent}
      >
        {fullContent}
      </TeaserWrapper>
      <Footer />
    </div>
  );
};

export default Explore;
