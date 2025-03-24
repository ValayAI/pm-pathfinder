import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EmailSignup from "../components/EmailSignup";
import FrameworkChat from "../components/FrameworkChat";
import RoadmapGenerator from "../components/RoadmapGenerator";
import RICECalculator from "../components/RICECalculator";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/providers/AuthProvider";
import ExploreFeaturesTeaser from "@/components/teasers/ExploreFeaturesTeaser";
import { Badge } from "@/components/ui/badge";
import { 
  TargetIcon, 
  GridIcon, 
  ClipboardListIcon, 
  FileTextIcon, 
  ExternalLinkIcon, 
  DownloadIcon,
  ClockIcon,
  BookOpenIcon,
  CalendarIcon,
  Sparkles
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Explore = () => {
  const isMobile = useIsMobile();
  const { user } = useAuth();
  
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 pt-24 md:pt-28 pb-12">
          <ExploreFeaturesTeaser />
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="absolute inset-0 -z-10 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background"></div>
      <main className="flex-grow container mx-auto px-4 pt-24 md:pt-28 pb-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
              <Sparkles className="h-3.5 w-3.5 mr-2" />
              <span className="text-sm font-medium">PM Tools</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">Enhance your PM workflow</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              AI-powered tools and frameworks to advance your product management skills
            </p>
          </div>
          
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <span className="mr-2 text-strategic">✨</span>
            Popular Frameworks
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card className="overflow-hidden transition-all hover:shadow-md duration-300 border border-strategic/20 group">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-5">
                  <div className="flex-shrink-0 bg-strategic-light/20 rounded-xl p-4 flex items-center justify-center group-hover:bg-strategic-light/40 transition-colors">
                    <TargetIcon className="h-7 w-7 text-strategic" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                      <h3 className="text-xl font-semibold">OKRs: Set & Achieve Goals</h3>
                      <span className="text-xs bg-strategic-light/30 px-3 py-1 rounded-full text-strategic font-medium">Strategic</span>
                    </div>
                    <p className="text-muted-foreground mb-5">Define objectives with key results to track progress.</p>
                    <div className="flex flex-wrap gap-3">
                      <Button variant="outline" size="sm" className="flex items-center gap-1.5 border-strategic/30 text-strategic hover:bg-strategic-light/20 hover:text-strategic">
                        <ExternalLinkIcon className="h-3.5 w-3.5" />
                        Example
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-1.5 border-strategic/30 text-strategic hover:bg-strategic-light/20 hover:text-strategic">
                        <DownloadIcon className="h-3.5 w-3.5" />
                        Guide
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden transition-all hover:shadow-md duration-300 border border-prioritization/20 group">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-5">
                  <div className="flex-shrink-0 bg-prioritization-light/20 rounded-xl p-4 flex items-center justify-center group-hover:bg-prioritization-light/40 transition-colors">
                    <GridIcon className="h-7 w-7 text-prioritization" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                      <h3 className="text-xl font-semibold">RICE Scoring</h3>
                      <span className="text-xs bg-prioritization-light/30 px-3 py-1 rounded-full text-prioritization font-medium">Prioritization</span>
                    </div>
                    <p className="text-muted-foreground mb-5">Evaluate based on Reach, Impact, Confidence, and Effort.</p>
                    <div className="flex flex-wrap gap-3">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="flex items-center gap-1.5 border-prioritization/30 text-prioritization hover:bg-prioritization-light/20 hover:text-prioritization">
                            <ExternalLinkIcon className="h-3.5 w-3.5" />
                            Calculator
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-[95vw] md:max-w-5xl h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>RICE Score Calculator</DialogTitle>
                            <DialogDescription>
                              Calculate and prioritize your features based on Reach, Impact, Confidence, and Effort.
                            </DialogDescription>
                          </DialogHeader>
                          <RICECalculator />
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="sm" className="flex items-center gap-1.5 border-prioritization/30 text-prioritization hover:bg-prioritization-light/20 hover:text-prioritization">
                        <DownloadIcon className="h-3.5 w-3.5" />
                        Template
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden transition-all hover:shadow-md duration-300 border border-requirements/20 group">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-5">
                  <div className="flex-shrink-0 bg-requirements-light/20 rounded-xl p-4 flex items-center justify-center group-hover:bg-requirements-light/40 transition-colors">
                    <ClipboardListIcon className="h-7 w-7 text-requirements" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                      <h3 className="text-xl font-semibold">MoSCoW Method</h3>
                      <span className="text-xs bg-requirements-light/30 px-3 py-1 rounded-full text-requirements font-medium">Requirements</span>
                    </div>
                    <p className="text-muted-foreground mb-5">Categorize tasks into Must, Should, Could, and Won't.</p>
                    <div className="flex flex-wrap gap-3">
                      <Button variant="outline" size="sm" className="flex items-center gap-1.5 border-requirements/30 text-requirements hover:bg-requirements-light/20 hover:text-requirements">
                        <ExternalLinkIcon className="h-3.5 w-3.5" />
                        Workshop
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-1.5 border-requirements/30 text-requirements hover:bg-requirements-light/20 hover:text-requirements">
                        <DownloadIcon className="h-3.5 w-3.5" />
                        Checklist
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden transition-all hover:shadow-md duration-300 border border-planning/20 group">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-5">
                  <div className="flex-shrink-0 bg-planning-light/20 rounded-xl p-4 flex items-center justify-center group-hover:bg-planning-light/40 transition-colors">
                    <CalendarIcon className="h-7 w-7 text-planning" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                      <h3 className="text-xl font-semibold">Strategic Roadmapping</h3>
                      <span className="text-xs bg-planning-light/30 px-3 py-1 rounded-full text-planning font-medium">Planning</span>
                    </div>
                    <p className="text-muted-foreground mb-5">Organize features into a structured timeline.</p>
                    <div className="flex flex-wrap gap-3">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="flex items-center gap-1.5 border-planning/30 text-planning hover:bg-planning-light/20 hover:text-planning">
                            <ExternalLinkIcon className="h-3.5 w-3.5" />
                            Generator
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-[95vw] md:max-w-5xl h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Product Roadmap Generator</DialogTitle>
                            <DialogDescription>
                              Enter your feature ideas and get an AI-generated roadmap in seconds.
                            </DialogDescription>
                          </DialogHeader>
                          <RoadmapGenerator />
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="sm" className="flex items-center gap-1.5 border-planning/30 text-planning hover:bg-planning-light/20 hover:text-planning">
                        <DownloadIcon className="h-3.5 w-3.5" />
                        Template
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mb-16 bg-card/80 backdrop-blur-sm p-6 rounded-xl border shadow-sm">
            <FrameworkChat />
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <div className="bg-card rounded-xl p-6 shadow-sm border">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <span className="mr-2 text-discovery">🎯</span>
                Master Product Management
              </h2>
              <div className="space-y-5">
                <div className="border border-border rounded-xl p-5 hover:border-discovery/40 transition-colors hover:shadow-sm">
                  <div className="flex flex-wrap items-start gap-4">
                    <div className="flex-shrink-0 bg-discovery-light/30 p-3 rounded-lg">
                      <BookOpenIcon className="h-5 w-5 text-discovery" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
                        <h3 className="text-lg font-medium">1️⃣ Customer Research & Discovery</h3>
                        <div className="flex items-center text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                          <ClockIcon className="h-3 w-3 mr-1" /> 
                          <span>3 hours</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">Master techniques for user interviews and market research.</p>
                      <div className="mb-4">
                        <div className="flex justify-between text-xs mb-1.5">
                          <span>Progress</span>
                          <span>70%</span>
                        </div>
                        <Progress value={70} className="h-2" indicatorColor="bg-discovery" />
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <Button variant="outline" size="sm" className="flex items-center gap-1.5 border-discovery/30 text-discovery hover:bg-discovery-light/20 hover:text-discovery">
                          <FileTextIcon className="h-3.5 w-3.5" />
                          Case Study
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-1.5 border-discovery/30 text-discovery hover:bg-discovery-light/20 hover:text-discovery">
                          <DownloadIcon className="h-3.5 w-3.5" />
                          Templates
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border border-border rounded-xl p-5 hover:border-analytics/40 transition-colors hover:shadow-sm">
                  <div className="flex flex-wrap items-start gap-4">
                    <div className="flex-shrink-0 bg-analytics-light/30 p-3 rounded-lg">
                      <GridIcon className="h-5 w-5 text-analytics" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
                        <h3 className="text-lg font-medium">2️⃣ Data-Driven Decisions</h3>
                        <div className="flex items-center text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                          <ClockIcon className="h-3 w-3 mr-1" /> 
                          <span>4 hours</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">Identify key metrics (DAU, NPS, Retention).</p>
                      <div className="mb-4">
                        <div className="flex justify-between text-xs mb-1.5">
                          <span>Progress</span>
                          <span>50%</span>
                        </div>
                        <Progress value={50} className="h-2" indicatorColor="bg-analytics" />
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <Button variant="outline" size="sm" className="flex items-center gap-1.5 border-analytics/30 text-analytics hover:bg-analytics-light/20 hover:text-analytics">
                          <FileTextIcon className="h-3.5 w-3.5" />
                          Case Study
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-1.5 border-analytics/30 text-analytics hover:bg-analytics-light/20 hover:text-analytics">
                          <DownloadIcon className="h-3.5 w-3.5" />
                          Templates
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-sm border">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <span className="mr-2 text-prioritization">📚</span>
                Recent Resources
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start p-3 hover:bg-muted/30 rounded-lg transition-colors">
                  <div className="bg-strategic-light/30 p-2.5 rounded-lg mr-3">
                    <FileTextIcon className="h-4 w-4 text-strategic" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium">Product Vision Canvas</h3>
                    <p className="text-sm text-muted-foreground">Create a compelling product vision</p>
                  </div>
                </li>
                <li className="flex items-start p-3 hover:bg-muted/30 rounded-lg transition-colors">
                  <div className="bg-requirements-light/30 p-2.5 rounded-lg mr-3">
                    <FileTextIcon className="h-4 w-4 text-requirements" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium">User Story Workshop Guide</h3>
                    <p className="text-sm text-muted-foreground">Craft effective user stories</p>
                  </div>
                </li>
                <li className="flex items-start p-3 hover:bg-muted/30 rounded-lg transition-colors">
                  <div className="bg-analytics-light/30 p-2.5 rounded-lg mr-3">
                    <FileTextIcon className="h-4 w-4 text-analytics" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium">Product Analytics Playbook</h3>
                    <p className="text-sm text-muted-foreground">Measure what matters for your product</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="max-w-md mx-auto mt-12 bg-card/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border">
            <EmailSignup />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Explore;
