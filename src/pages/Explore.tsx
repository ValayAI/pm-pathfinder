
import React from 'react';
import TeaserWrapper from '../components/TeaserWrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Sparkles, 
  Search, 
  Target, 
  MessageSquare, 
  CheckCircle,
  BookOpen,
  List,
  FileText,
  Calculator,
  BarChart
} from "lucide-react";

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

          {/* Product Management Resources Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center text-primary mb-2">Product Management Resources</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Discover tools, frameworks, and methodologies to enhance your product management skills.
            </p>

            {/* Popular Frameworks Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-amber-500" />
                <h3 className="text-xl font-bold">Popular Frameworks</h3>
              </div>

              {/* Framework Cards */}
              <div className="space-y-4">
                {/* OKRs Framework */}
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="flex">
                    <div className="bg-purple-50 dark:bg-purple-950/20 p-6 flex items-center justify-center min-w-[100px]">
                      <div className="text-purple-600 dark:text-purple-400">
                        <Target className="h-8 w-8" />
                      </div>
                    </div>
                    <div className="p-4 flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-lg font-semibold">OKRs: Set & Achieve Goals</h4>
                          <p className="text-muted-foreground">Define objectives with key results to track progress.</p>
                        </div>
                        <Badge className="bg-strategic-light text-strategic border-0">Strategic</Badge>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button size="sm" variant="outline" className="gap-1">
                          <FileText className="h-4 w-4" />
                          Example
                        </Button>
                        <Button size="sm" variant="outline" className="gap-1">
                          <BookOpen className="h-4 w-4" />
                          Guide
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RICE Scoring */}
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="flex">
                    <div className="bg-blue-50 dark:bg-blue-950/20 p-6 flex items-center justify-center min-w-[100px]">
                      <div className="text-blue-600 dark:text-blue-400">
                        <Calculator className="h-8 w-8" />
                      </div>
                    </div>
                    <div className="p-4 flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-lg font-semibold">RICE Scoring</h4>
                          <p className="text-muted-foreground">Evaluate based on Reach, Impact, Confidence, and Effort.</p>
                        </div>
                        <Badge className="bg-prioritization-light text-prioritization border-0">Prioritization</Badge>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button size="sm" variant="outline" className="gap-1">
                          <Calculator className="h-4 w-4" />
                          Calculator
                        </Button>
                        <Button size="sm" variant="outline" className="gap-1">
                          <FileText className="h-4 w-4" />
                          Template
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* MoSCoW Method */}
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="flex">
                    <div className="bg-orange-50 dark:bg-orange-950/20 p-6 flex items-center justify-center min-w-[100px]">
                      <div className="text-orange-600 dark:text-orange-400">
                        <List className="h-8 w-8" />
                      </div>
                    </div>
                    <div className="p-4 flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-lg font-semibold">MoSCoW Method</h4>
                          <p className="text-muted-foreground">Categorize tasks into Must, Should, Could, and Won't.</p>
                        </div>
                        <Badge className="bg-requirements-light text-requirements border-0">Requirements</Badge>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button size="sm" variant="outline" className="gap-1">
                          <FileText className="h-4 w-4" />
                          Workshop
                        </Button>
                        <Button size="sm" variant="outline" className="gap-1">
                          <CheckCircle className="h-4 w-4" />
                          Checklist
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Strategic Roadmapping */}
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="flex">
                    <div className="bg-green-50 dark:bg-green-950/20 p-6 flex items-center justify-center min-w-[100px]">
                      <div className="text-green-600 dark:text-green-400">
                        <BarChart className="h-8 w-8" />
                      </div>
                    </div>
                    <div className="p-4 flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-lg font-semibold">Strategic Roadmapping</h4>
                          <p className="text-muted-foreground">Organize features into a structured timeline.</p>
                        </div>
                        <Badge className="bg-planning-light text-planning border-0">Planning</Badge>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button size="sm" variant="outline" className="gap-1">
                          <Target className="h-4 w-4" />
                          Generator
                        </Button>
                        <Button size="sm" variant="outline" className="gap-1">
                          <FileText className="h-4 w-4" />
                          Template
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Documentation Templates Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-blue-500" />
                <h3 className="text-xl font-bold">Documentation Templates</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      PRD Template
                    </CardTitle>
                    <CardDescription>
                      Comprehensive product requirements document
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-sm text-muted-foreground">
                      A structured template for defining product requirements, user stories, and technical specifications.
                    </p>
                    <Button variant="outline" className="w-full">
                      Download Template
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-primary" />
                      User Persona Canvas
                    </CardTitle>
                    <CardDescription>
                      Create detailed user personas for your product
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-sm text-muted-foreground">
                      A template to help you define user demographics, goals, pain points, and motivations.
                    </p>
                    <Button variant="outline" className="w-full">
                      Access Template
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      Go-to-Market Strategy
                    </CardTitle>
                    <CardDescription>
                      Plan your product launch effectively
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-sm text-muted-foreground">
                      A comprehensive template for planning marketing, sales, and customer support for your product launch.
                    </p>
                    <Button variant="outline" className="w-full">
                      Get Template
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      Feature Specification
                    </CardTitle>
                    <CardDescription>
                      Detailed feature documentation
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-sm text-muted-foreground">
                      A template for documenting feature requirements, user flows, edge cases, and acceptance criteria.
                    </p>
                    <Button variant="outline" className="w-full">
                      Download Template
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* PM Books Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="h-5 w-5 text-green-500" />
                <h3 className="text-xl font-bold">Essential PM Books</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="flex flex-col">
                  <div className="h-48 bg-slate-100 dark:bg-slate-800 rounded-t-lg flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-slate-400" />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Inspired</CardTitle>
                    <CardDescription>By Marty Cagan</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground">
                      How to create tech products customers love.
                    </p>
                  </CardContent>
                  <div className="p-4 pt-0 mt-auto">
                    <Badge variant="outline" className="mb-2">Recommended</Badge>
                    <Button variant="outline" size="sm" className="w-full">Learn More</Button>
                  </div>
                </Card>

                <Card className="flex flex-col">
                  <div className="h-48 bg-slate-100 dark:bg-slate-800 rounded-t-lg flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-slate-400" />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Hooked</CardTitle>
                    <CardDescription>By Nir Eyal</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground">
                      Building habit-forming products.
                    </p>
                  </CardContent>
                  <div className="p-4 pt-0 mt-auto">
                    <Badge variant="outline" className="mb-2">Psychology</Badge>
                    <Button variant="outline" size="sm" className="w-full">Learn More</Button>
                  </div>
                </Card>

                <Card className="flex flex-col">
                  <div className="h-48 bg-slate-100 dark:bg-slate-800 rounded-t-lg flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-slate-400" />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Lean Product Playbook</CardTitle>
                    <CardDescription>By Dan Olsen</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground">
                      Creating products people want.
                    </p>
                  </CardContent>
                  <div className="p-4 pt-0 mt-auto">
                    <Badge variant="outline" className="mb-2">Strategy</Badge>
                    <Button variant="outline" size="sm" className="w-full">Learn More</Button>
                  </div>
                </Card>

                <Card className="flex flex-col">
                  <div className="h-48 bg-slate-100 dark:bg-slate-800 rounded-t-lg flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-slate-400" />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Escaping the Build Trap</CardTitle>
                    <CardDescription>By Melissa Perri</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground">
                      Creating value through product management.
                    </p>
                  </CardContent>
                  <div className="p-4 pt-0 mt-auto">
                    <Badge variant="outline" className="mb-2">Value-Based</Badge>
                    <Button variant="outline" size="sm" className="w-full">Learn More</Button>
                  </div>
                </Card>
              </div>
            </div>
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
