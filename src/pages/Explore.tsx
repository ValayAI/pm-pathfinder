
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EmailSignup from "../components/EmailSignup";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TargetIcon, GridIcon, ClipboardListIcon, FileTextIcon, ExternalLinkIcon, DownloadIcon } from "lucide-react";

const Explore = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Explore Product Management Resources</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Discover tools, frameworks, and methodologies to enhance your product management skills.
          </p>
          
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Popular Frameworks for Better Decision-Making</h2>
            <div className="grid gap-6">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-shrink-0 bg-primary/10 rounded-lg p-4 flex items-center justify-center">
                      <TargetIcon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                        <h3 className="text-xl font-medium">OKRs: Set & Achieve Measurable Goals</h3>
                        <span className="text-sm bg-primary/10 px-2 py-1 rounded text-primary font-medium">Strategic Planning</span>
                      </div>
                      <p className="text-muted-foreground mb-4">Define clear objectives with key results to track progress.</p>
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <ExternalLinkIcon className="h-4 w-4" />
                          See Example
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <DownloadIcon className="h-4 w-4" />
                          Download Guide
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-shrink-0 bg-primary/10 rounded-lg p-4 flex items-center justify-center">
                      <GridIcon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                        <h3 className="text-xl font-medium">RICE Scoring: Prioritize What Matters Most</h3>
                        <span className="text-sm bg-primary/10 px-2 py-1 rounded text-primary font-medium">Prioritization</span>
                      </div>
                      <p className="text-muted-foreground mb-4">Evaluate features based on Reach, Impact, Confidence, and Effort.</p>
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <ExternalLinkIcon className="h-4 w-4" />
                          Interactive Calculator
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <DownloadIcon className="h-4 w-4" />
                          Download Template
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-shrink-0 bg-primary/10 rounded-lg p-4 flex items-center justify-center">
                      <ClipboardListIcon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                        <h3 className="text-xl font-medium">MoSCoW Method: Prioritize Requirements Effectively</h3>
                        <span className="text-sm bg-primary/10 px-2 py-1 rounded text-primary font-medium">Requirements</span>
                      </div>
                      <p className="text-muted-foreground mb-4">Categorize tasks into Must, Should, Could, and Won't to streamline execution.</p>
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <ExternalLinkIcon className="h-4 w-4" />
                          See Workshop Guide
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <DownloadIcon className="h-4 w-4" />
                          Download Checklist
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">Learning Paths</h2>
              <ul className="space-y-4">
                <li>
                  <h3 className="font-medium">Customer Research Techniques</h3>
                  <p className="text-sm text-muted-foreground mb-1">Learn effective user research methods</p>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: '70%' }}></div>
                  </div>
                </li>
                <li>
                  <h3 className="font-medium">Data-Driven Decision Making</h3>
                  <p className="text-sm text-muted-foreground mb-1">Understand metrics that matter</p>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: '50%' }}></div>
                  </div>
                </li>
                <li>
                  <h3 className="font-medium">Strategic Roadmapping</h3>
                  <p className="text-sm text-muted-foreground mb-1">Build effective product roadmaps</p>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: '30%' }}></div>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">Recent Resources</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-md mr-3">
                    <FileTextIcon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Product Vision Canvas</h3>
                    <p className="text-sm text-muted-foreground">Create a compelling product vision</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-md mr-3">
                    <FileTextIcon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">User Story Workshop Guide</h3>
                    <p className="text-sm text-muted-foreground">Craft effective user stories</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-md mr-3">
                    <FileTextIcon className="h-4 w-4 text-primary" />
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
          
          {/* Email signup moved to bottom */}
          <div className="max-w-md mx-auto mt-16">
            <EmailSignup />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Explore;
