
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Lock, Eye, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ResourcesTeaser = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Product Management Resources</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Access templates, frameworks, guides and more to excel as a Product Manager
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-12">
        {/* PRD Template */}
        <Card className="overflow-hidden hover:shadow-md transition-all hover:scale-[1.01] duration-300 border">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <Badge variant="outline">Template</Badge>
            </div>
            <CardTitle className="mt-4">How to Write a Killer PRD</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-2">
              <Badge variant="secondary" className="text-xs mb-2">Free Preview</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              A great PRD clearly defines the problem, success metrics, and required functionality. The key is to be concise yet thorough...
            </p>
            <div className="relative">
              <div className="bg-gradient-to-b from-transparent to-background h-16 absolute bottom-0 left-0 right-0"></div>
              <div className="opacity-20 pointer-events-none blur-[2px] text-sm text-muted-foreground">
                <p>Start with a compelling problem statement that explains the customer pain point you're solving. Then define clear success metrics that align with business goals. Your PRD should include:</p>
                <ul className="mt-2 space-y-1 pl-6">
                  <li>User personas and journeys</li>
                  <li>Feature requirements (must-haves vs nice-to-haves)</li>
                  <li>Technical considerations</li>
                </ul>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm" className="flex-1 flex items-center justify-center gap-1">
                <Eye className="h-3.5 w-3.5 mr-1" /> Preview
              </Button>
              <Button variant="outline" size="sm" className="flex-1 flex items-center justify-center gap-1" disabled>
                <Lock className="h-3.5 w-3.5 mr-1" /> Full Guide
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* PM Interview Questions */}
        <Card className="overflow-hidden hover:shadow-md transition-all hover:scale-[1.01] duration-300 border">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full">
                <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <Badge variant="outline">Guide</Badge>
            </div>
            <CardTitle className="mt-4">Top PM Interview Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-2">
              <Badge variant="secondary" className="text-xs mb-2">Free Preview</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              For "Tell me about a time you failed" questions, use the STAR method and focus on what you learned...
            </p>
            <div className="relative">
              <div className="bg-gradient-to-b from-transparent to-background h-16 absolute bottom-0 left-0 right-0"></div>
              <div className="opacity-20 pointer-events-none blur-[2px] text-sm text-muted-foreground">
                <p>Common PM interview questions include:</p>
                <ul className="mt-2 space-y-1 pl-6">
                  <li>How would you improve our product?</li>
                  <li>How do you prioritize features?</li>
                  <li>Tell me about a product you launched</li>
                  <li>How would you design X for Y?</li>
                </ul>
                <p className="mt-2">For each question, we provide frameworks, examples, and tips from PMs who have successfully interviewed at FAANG companies.</p>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm" className="flex-1 flex items-center justify-center gap-1">
                <Eye className="h-3.5 w-3.5 mr-1" /> Preview
              </Button>
              <Button variant="outline" size="sm" className="flex-1 flex items-center justify-center gap-1" disabled>
                <Lock className="h-3.5 w-3.5 mr-1" /> Full Guide
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* More resources banner */}
      <Card className="mb-8 bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20">
        <CardContent className="p-6">
          <h3 className="text-lg font-bold mb-3">Unlock our complete resource library</h3>
          <ul className="space-y-2 mb-4">
            <li className="flex items-center">
              <CheckCircle className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm">30+ frameworks and templates</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm">Resume templates and examples</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm">Product strategy playbooks</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm">Interview preparation guides</span>
            </li>
          </ul>
        </CardContent>
        <CardFooter className="bg-muted/30 p-4 border-t">
          <p className="text-sm text-muted-foreground">
            Create your free account to unlock all features
          </p>
        </CardFooter>
      </Card>
      
      <div className="flex justify-center mt-8 border-t pt-6">
        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <Link to="/signin">Sign In</Link>
          </Button>
          <Button asChild>
            <Link to="/signup" className="flex items-center gap-1">
              Access All Resources <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResourcesTeaser;
