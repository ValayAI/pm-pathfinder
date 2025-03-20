
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
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-3 mb-12 text-center">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-strategic bg-clip-text text-transparent">Product Management Resources</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover tools, frameworks, and methodologies to enhance your product management skills.
            </p>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <span className="mr-2 text-strategic">✨</span>
              Popular Frameworks for Better Decision-Making
            </h2>
            <div className="grid gap-6">
              {/* OKRs Card */}
              <Card className="hover:shadow-md transition-shadow hover:scale-[1.01] duration-300 border-l-4 border-l-strategic">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-shrink-0 bg-strategic-light rounded-lg p-4 flex items-center justify-center">
                      <TargetIcon className="h-8 w-8 text-strategic" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                        <h3 className="text-xl font-medium">OKRs: Set & Achieve Measurable Goals</h3>
                        <span className="text-sm bg-strategic-light px-2 py-1 rounded text-strategic font-medium">Strategic Planning</span>
                      </div>
                      <p className="text-muted-foreground mb-4">Define clear objectives with key results to track progress.</p>
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" className="flex items-center gap-1 border-strategic/30 text-strategic hover:bg-strategic-light hover:text-strategic">
                          <ExternalLinkIcon className="h-4 w-4" />
                          See Example
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-1 border-strategic/30 text-strategic hover:bg-strategic-light hover:text-strategic">
                          <DownloadIcon className="h-4 w-4" />
                          Download Guide
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* RICE Scoring Card */}
              <Card className="hover:shadow-md transition-shadow hover:scale-[1.01] duration-300 border-l-4 border-l-prioritization">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-shrink-0 bg-prioritization-light rounded-lg p-4 flex items-center justify-center">
                      <GridIcon className="h-8 w-8 text-prioritization" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                        <h3 className="text-xl font-medium">RICE Scoring: Prioritize What Matters Most</h3>
                        <span className="text-sm bg-prioritization-light px-2 py-1 rounded text-prioritization font-medium">Prioritization</span>
                      </div>
                      <p className="text-muted-foreground mb-4">Evaluate features based on Reach, Impact, Confidence, and Effort.</p>
                      <div className="flex flex-wrap gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="flex items-center gap-1 border-prioritization/30 text-prioritization hover:bg-prioritization-light hover:text-prioritization">
                              <ExternalLinkIcon className="h-4 w-4" />
                              Interactive Calculator
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-5xl h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>RICE Score Calculator</DialogTitle>
                              <DialogDescription>
                                Calculate and prioritize your features based on Reach, Impact, Confidence, and Effort.
                              </DialogDescription>
                            </DialogHeader>
                            <RICECalculator />
                          </DialogContent>
                        </Dialog>
                        <Button variant="outline" size="sm" className="flex items-center gap-1 border-prioritization/30 text-prioritization hover:bg-prioritization-light hover:text-prioritization">
                          <DownloadIcon className="h-4 w-4" />
                          Download Template
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* MoSCoW Method Card */}
              <Card className="hover:shadow-md transition-shadow hover:scale-[1.01] duration-300 border-l-4 border-l-requirements">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-shrink-0 bg-requirements-light rounded-lg p-4 flex items-center justify-center">
                      <ClipboardListIcon className="h-8 w-8 text-requirements" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                        <h3 className="text-xl font-medium">MoSCoW Method: Prioritize Requirements Effectively</h3>
                        <span className="text-sm bg-requirements-light px-2 py-1 rounded text-requirements font-medium">Requirements</span>
                      </div>
                      <p className="text-muted-foreground mb-4">Categorize tasks into Must, Should, Could, and Won't to streamline execution.</p>
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" className="flex items-center gap-1 border-requirements/30 text-requirements hover:bg-requirements-light hover:text-requirements">
                          <ExternalLinkIcon className="h-4 w-4" />
                          See Workshop Guide
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-1 border-requirements/30 text-requirements hover:bg-requirements-light hover:text-requirements">
                          <DownloadIcon className="h-4 w-4" />
                          Download Checklist
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Strategic Roadmapping Card */}
              <Card className="hover:shadow-md transition-shadow hover:scale-[1.01] duration-300 border-l-4 border-l-planning">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-shrink-0 bg-planning-light rounded-lg p-4 flex items-center justify-center">
                      <CalendarIcon className="h-8 w-8 text-planning" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                        <h3 className="text-xl font-medium">Strategic Roadmapping: Plan Feature Releases</h3>
                        <span className="text-sm bg-planning-light px-2 py-1 rounded text-planning font-medium">Release Planning</span>
                      </div>
                      <p className="text-muted-foreground mb-4">Organize features into a structured timeline based on impact, effort, and dependencies.</p>
                      <div className="flex flex-wrap gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="flex items-center gap-1 border-planning/30 text-planning hover:bg-planning-light hover:text-planning">
                              <ExternalLinkIcon className="h-4 w-4" />
                              Interactive Roadmap Generator
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-5xl h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Product Roadmap Generator</DialogTitle>
                              <DialogDescription>
                                Enter your feature ideas and get an AI-generated roadmap in seconds.
                              </DialogDescription>
                            </DialogHeader>
                            <RoadmapGenerator />
                          </DialogContent>
                        </Dialog>
                        <Button variant="outline" size="sm" className="flex items-center gap-1 border-planning/30 text-planning hover:bg-planning-light hover:text-planning">
                          <DownloadIcon className="h-4 w-4" />
                          Download Template
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="mb-12 bg-gradient-to-r from-background to-muted p-6 rounded-lg border">
            <FrameworkChat />
          </div>
          
          <div className="grid md:grid-cols-1 gap-6 mb-12">
            <div className="bg-card rounded-lg p-6 shadow-sm border">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <span className="mr-2 text-discovery">🎯</span>
                Master Product Management Step-by-Step
              </h2>
              <div className="space-y-6">
                <div className="border border-border rounded-lg p-4 hover:border-discovery/40 transition-colors hover:shadow-sm">
                  <div className="flex flex-wrap items-start gap-4 mb-3">
                    <div className="flex-shrink-0 bg-discovery-light p-3 rounded-full">
                      <BookOpenIcon className="h-5 w-5 text-discovery" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex flex-wrap justify-between items-center gap-2 mb-1">
                        <h3 className="text-lg font-medium">1️⃣ Customer Research & Discovery 🕵️‍♂️</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <ClockIcon className="h-4 w-4 mr-1" /> 
                          <span>Learn in 3 hours</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-3">Master techniques for user interviews, surveys, and market research.</p>
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>70%</span>
                        </div>
                        <Progress value={70} className="h-2" indicatorColor="bg-discovery" />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" className="flex items-center gap-1 border-discovery/30 text-discovery hover:bg-discovery-light hover:text-discovery">
                          <FileTextIcon className="h-4 w-4" />
                          Case Study: How Airbnb Conducts User Research
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-1 border-discovery/30 text-discovery hover:bg-discovery-light hover:text-discovery">
                          <DownloadIcon className="h-4 w-4" />
                          Download Interview Templates
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border border-border rounded-lg p-4 hover:border-analytics/40 transition-colors hover:shadow-sm">
                  <div className="flex flex-wrap items-start gap-4 mb-3">
                    <div className="flex-shrink-0 bg-analytics-light p-3 rounded-full">
                      <GridIcon className="h-5 w-5 text-analytics" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex flex-wrap justify-between items-center gap-2 mb-1">
                        <h3 className="text-lg font-medium">2️⃣ Data-Driven Decision Making 📊</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <ClockIcon className="h-4 w-4 mr-1" /> 
                          <span>Learn in 4 hours</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-3">Identify key metrics (DAU, NPS, Retention) & leverage analytics.</p>
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>50%</span>
                        </div>
                        <Progress value={50} className="h-2" indicatorColor="bg-analytics" />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" className="flex items-center gap-1 border-analytics/30 text-analytics hover:bg-analytics-light hover:text-analytics">
                          <FileTextIcon className="h-4 w-4" />
                          Case Study: Spotify's Approach to Analytics
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-1 border-analytics/30 text-analytics hover:bg-analytics-light hover:text-analytics">
                          <DownloadIcon className="h-4 w-4" />
                          Download Metrics Dashboard Template
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border border-border rounded-lg p-4 hover:border-planning/40 transition-colors hover:shadow-sm">
                  <div className="flex flex-wrap items-start gap-4 mb-3">
                    <div className="flex-shrink-0 bg-planning-light p-3 rounded-full">
                      <TargetIcon className="h-5 w-5 text-planning" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex flex-wrap justify-between items-center gap-2 mb-1">
                        <h3 className="text-lg font-medium">3️⃣ Strategic Roadmapping & Prioritization 📅</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <ClockIcon className="h-4 w-4 mr-1" /> 
                          <span>Learn in 5 hours</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-3">Build flexible roadmaps that align with business goals.</p>
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>30%</span>
                        </div>
                        <Progress value={30} className="h-2" indicatorColor="bg-planning" />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" className="flex items-center gap-1 border-planning/30 text-planning hover:bg-planning-light hover:text-planning">
                          <FileTextIcon className="h-4 w-4" />
                          Case Study: How Linear Plans Product Roadmaps
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-1 border-planning/30 text-planning hover:bg-planning-light hover:text-planning">
                          <DownloadIcon className="h-4 w-4" />
                          Download Roadmap Templates
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm border">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <span className="mr-2 text-prioritization">📚</span>
                Recent Resources
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start p-3 hover:bg-muted/30 rounded-md transition-colors">
                  <div className="bg-strategic-light p-2 rounded-md mr-3">
                    <FileTextIcon className="h-4 w-4 text-strategic" />
                  </div>
                  <div>
                    <h3 className="font-medium">Product Vision Canvas</h3>
                    <p className="text-sm text-muted-foreground">Create a compelling product vision</p>
                  </div>
                </li>
                <li className="flex items-start p-3 hover:bg-muted/30 rounded-md transition-colors">
                  <div className="bg-requirements-light p-2 rounded-md mr-3">
                    <FileTextIcon className="h-4 w-4 text-requirements" />
                  </div>
                  <div>
                    <h3 className="font-medium">User Story Workshop Guide</h3>
                    <p className="text-sm text-muted-foreground">Craft effective user stories</p>
                  </div>
                </li>
                <li className="flex items-start p-3 hover:bg-muted/30 rounded-md transition-colors">
                  <div className="bg-analytics-light p-2 rounded-md mr-3">
                    <FileTextIcon className="h-4 w-4 text-analytics" />
                  </div>
                  <div>
                    <h3 className="font-medium">Product Analytics Playbook</h3>
                    <p className="text-sm text-muted-foreground">Measure what matters for your product</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">More resources coming soon. Subscribe to our newsletter for updates.</p>
          </div>
          
          <div className="max-w-md mx-auto mt-16 bg-card rounded-lg p-6 shadow-sm border">
            <EmailSignup />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Explore;
