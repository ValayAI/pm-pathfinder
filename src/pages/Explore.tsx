import React, { useState } from 'react';
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
import { 
  TargetIcon, 
  GridIcon, 
  ClipboardListIcon, 
  FileTextIcon, 
  ExternalLinkIcon, 
  DownloadIcon,
  ClockIcon,
  BookOpenIcon,
  CalendarIcon
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
      <main className="flex-grow container mx-auto px-4 pt-24 md:pt-28 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-3 mb-12 text-center">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-strategic bg-clip-text text-transparent">
              {isMobile ? "PM Resources" : "Product Management Resources"}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover tools, frameworks, and methodologies to enhance your product management skills.
            </p>
          </div>
          
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <span className="mr-2 text-strategic">✨</span>
              Popular Frameworks
            </h2>
            <div className="grid gap-4">
              {/* OKRs Card */}
              <Card className="hover:shadow-md transition-shadow hover:scale-[1.01] duration-300 border-l-4 border-l-strategic">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-shrink-0 bg-strategic-light rounded-lg p-3 flex items-center justify-center">
                      <TargetIcon className="h-6 w-6 text-strategic" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                        <h3 className="text-lg font-medium">OKRs: Set & Achieve Goals</h3>
                        <span className="text-xs bg-strategic-light px-2 py-1 rounded text-strategic font-medium">Strategic</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">Define objectives with key results to track progress.</p>
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" className="flex items-center gap-1 border-strategic/30 text-strategic hover:bg-strategic-light hover:text-strategic text-xs">
                          <ExternalLinkIcon className="h-3 w-3" />
                          Example
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-1 border-strategic/30 text-strategic hover:bg-strategic-light hover:text-strategic text-xs">
                          <DownloadIcon className="h-3 w-3" />
                          Guide
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* RICE Scoring Card */}
              <Card className="hover:shadow-md transition-shadow hover:scale-[1.01] duration-300 border-l-4 border-l-prioritization">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-shrink-0 bg-prioritization-light rounded-lg p-3 flex items-center justify-center">
                      <GridIcon className="h-6 w-6 text-prioritization" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                        <h3 className="text-lg font-medium">RICE Scoring</h3>
                        <span className="text-xs bg-prioritization-light px-2 py-1 rounded text-prioritization font-medium">Prioritization</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">Evaluate based on Reach, Impact, Confidence, and Effort.</p>
                      <div className="flex flex-wrap gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="flex items-center gap-1 border-prioritization/30 text-prioritization hover:bg-prioritization-light hover:text-prioritization text-xs">
                              <ExternalLinkIcon className="h-3 w-3" />
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
                        <Button variant="outline" size="sm" className="flex items-center gap-1 border-prioritization/30 text-prioritization hover:bg-prioritization-light hover:text-prioritization text-xs">
                          <DownloadIcon className="h-3 w-3" />
                          Template
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* MoSCoW Method Card */}
              <Card className="hover:shadow-md transition-shadow hover:scale-[1.01] duration-300 border-l-4 border-l-requirements">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-shrink-0 bg-requirements-light rounded-lg p-3 flex items-center justify-center">
                      <ClipboardListIcon className="h-6 w-6 text-requirements" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                        <h3 className="text-lg font-medium">MoSCoW Method</h3>
                        <span className="text-xs bg-requirements-light px-2 py-1 rounded text-requirements font-medium">Requirements</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">Categorize tasks into Must, Should, Could, and Won't.</p>
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" className="flex items-center gap-1 border-requirements/30 text-requirements hover:bg-requirements-light hover:text-requirements text-xs">
                          <ExternalLinkIcon className="h-3 w-3" />
                          Workshop
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-1 border-requirements/30 text-requirements hover:bg-requirements-light hover:text-requirements text-xs">
                          <DownloadIcon className="h-3 w-3" />
                          Checklist
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Strategic Roadmapping Card */}
              <Card className="hover:shadow-md transition-shadow hover:scale-[1.01] duration-300 border-l-4 border-l-planning">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-shrink-0 bg-planning-light rounded-lg p-3 flex items-center justify-center">
                      <CalendarIcon className="h-6 w-6 text-planning" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                        <h3 className="text-lg font-medium">Strategic Roadmapping</h3>
                        <span className="text-xs bg-planning-light px-2 py-1 rounded text-planning font-medium">Planning</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">Organize features into a structured timeline.</p>
                      <div className="flex flex-wrap gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="flex items-center gap-1 border-planning/30 text-planning hover:bg-planning-light hover:text-planning text-xs">
                              <ExternalLinkIcon className="h-3 w-3" />
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
                        <Button variant="outline" size="sm" className="flex items-center gap-1 border-planning/30 text-planning hover:bg-planning-light hover:text-planning text-xs">
                          <DownloadIcon className="h-3 w-3" />
                          Template
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="mb-12 bg-gradient-to-r from-background to-muted p-4 sm:p-6 rounded-lg border">
            <FrameworkChat />
          </div>
          
          <div className="grid md:grid-cols-1 gap-4 mb-12">
            <div className="bg-card rounded-lg p-4 sm:p-6 shadow-sm border">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <span className="mr-2 text-discovery">🎯</span>
                Master Product Management
              </h2>
              <div className="space-y-4">
                <div className="border border-border rounded-lg p-3 sm:p-4 hover:border-discovery/40 transition-colors hover:shadow-sm">
                  <div className="flex flex-wrap items-start gap-3">
                    <div className="flex-shrink-0 bg-discovery-light p-2 rounded-full">
                      <BookOpenIcon className="h-4 w-4 text-discovery" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex flex-wrap justify-between items-center gap-2 mb-1">
                        <h3 className="text-base font-medium">1️⃣ Customer Research & Discovery</h3>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <ClockIcon className="h-3 w-3 mr-1" /> 
                          <span>3 hours</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">Master techniques for user interviews and market research.</p>
                      <div className="mb-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progress</span>
                          <span>70%</span>
                        </div>
                        <Progress value={70} className="h-2" indicatorColor="bg-discovery" />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" className="flex items-center gap-1 border-discovery/30 text-discovery hover:bg-discovery-light hover:text-discovery text-xs">
                          <FileTextIcon className="h-3 w-3" />
                          Case Study
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-1 border-discovery/30 text-discovery hover:bg-discovery-light hover:text-discovery text-xs">
                          <DownloadIcon className="h-3 w-3" />
                          Templates
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border border-border rounded-lg p-3 sm:p-4 hover:border-analytics/40 transition-colors hover:shadow-sm">
                  <div className="flex flex-wrap items-start gap-3">
                    <div className="flex-shrink-0 bg-analytics-light p-2 rounded-full">
                      <GridIcon className="h-4 w-4 text-analytics" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex flex-wrap justify-between items-center gap-2 mb-1">
                        <h3 className="text-base font-medium">2️⃣ Data-Driven Decisions</h3>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <ClockIcon className="h-3 w-3 mr-1" /> 
                          <span>4 hours</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">Identify key metrics (DAU, NPS, Retention).</p>
                      <div className="mb-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progress</span>
                          <span>50%</span>
                        </div>
                        <Progress value={50} className="h-2" indicatorColor="bg-analytics" />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" className="flex items-center gap-1 border-analytics/30 text-analytics hover:bg-analytics-light hover:text-analytics text-xs">
                          <FileTextIcon className="h-3 w-3" />
                          Case Study
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-1 border-analytics/30 text-analytics hover:bg-analytics-light hover:text-analytics text-xs">
                          <DownloadIcon className="h-3 w-3" />
                          Templates
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border border-border rounded-lg p-3 sm:p-4 hover:border-planning/40 transition-colors hover:shadow-sm">
                  <div className="flex flex-wrap items-start gap-3">
                    <div className="flex-shrink-0 bg-planning-light p-2 rounded-full">
                      <TargetIcon className="h-4 w-4 text-planning" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex flex-wrap justify-between items-center gap-2 mb-1">
                        <h3 className="text-base font-medium">3️⃣ Strategic Roadmapping</h3>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <ClockIcon className="h-3 w-3 mr-1" /> 
                          <span>5 hours</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">Build flexible roadmaps that align with business goals.</p>
                      <div className="mb-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progress</span>
                          <span>30%</span>
                        </div>
                        <Progress value={30} className="h-2" indicatorColor="bg-planning" />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" className="flex items-center gap-1 border-planning/30 text-planning hover:bg-planning-light hover:text-planning text-xs">
                          <FileTextIcon className="h-3 w-3" />
                          Case Study
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-1 border-planning/30 text-planning hover:bg-planning-light hover:text-planning text-xs">
                          <DownloadIcon className="h-3 w-3" />
                          Templates
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-lg p-4 sm:p-6 shadow-sm border">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <span className="mr-2 text-prioritization">📚</span>
                Recent Resources
              </h2>
              <ul className="space-y-2">
                <li className="flex items-start p-2 hover:bg-muted/30 rounded-md transition-colors">
                  <div className="bg-strategic-light p-2 rounded-md mr-2">
                    <FileTextIcon className="h-3 w-3 text-strategic" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Product Vision Canvas</h3>
                    <p className="text-xs text-muted-foreground">Create a compelling product vision</p>
                  </div>
                </li>
                <li className="flex items-start p-2 hover:bg-muted/30 rounded-md transition-colors">
                  <div className="bg-requirements-light p-2 rounded-md mr-2">
                    <FileTextIcon className="h-3 w-3 text-requirements" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">User Story Workshop Guide</h3>
                    <p className="text-xs text-muted-foreground">Craft effective user stories</p>
                  </div>
                </li>
                <li className="flex items-start p-2 hover:bg-muted/30 rounded-md transition-colors">
                  <div className="bg-analytics-light p-2 rounded-md mr-2">
                    <FileTextIcon className="h-3 w-3 text-analytics" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Product Analytics Playbook</h3>
                    <p className="text-xs text-muted-foreground">Measure what matters for your product</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground mb-4">More resources coming soon. Subscribe to our newsletter for updates.</p>
          </div>
          
          <div className="max-w-md mx-auto mt-12 bg-card rounded-lg p-4 sm:p-6 shadow-sm border">
            <EmailSignup />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Explore;
