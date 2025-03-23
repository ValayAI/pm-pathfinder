
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Download, Lock, Eye } from 'lucide-react';
import ContentTeaser from '../ContentTeaser';

const ResourcesTeaser = () => {
  return (
    <ContentTeaser
      title="PM Resources Library"
      description="Access templates, frameworks, guides and more to excel as a Product Manager"
      cta="Unlock full library"
    >
      <div className="space-y-6">
        {/* Resource 1 */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-3">
                <div className="bg-purple-50 dark:bg-purple-900/30 p-2 rounded-md">
                  <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <Badge className="mb-2 bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-300">
                    Free Preview
                  </Badge>
                  <CardTitle className="text-lg">How to Write a Killer PRD</CardTitle>
                </div>
              </div>
              <Badge variant="outline">Template</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                A Product Requirements Document (PRD) is crucial for aligning your team on what to build. 
                Start with a clear problem statement that explains why this feature matters to users.
              </p>
              
              <div className="relative">
                <p className="text-sm text-muted-foreground blur-[3px]">
                  Then, outline specific requirements with acceptance criteria. Include mockups or wireframes to visualize the solution.
                  Remember to address edge cases and potential technical challenges...
                </p>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Sign up to view full content</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="text-xs">
                  <Eye className="h-3.5 w-3.5 mr-1.5" /> Sample
                </Button>
                <Button variant="outline" size="sm" className="text-xs" disabled>
                  <Download className="h-3.5 w-3.5 mr-1.5" /> Download Template
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Resource 2 */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-3">
                <div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-md">
                  <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <Badge className="mb-2 bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-300">
                    Free Preview
                  </Badge>
                  <CardTitle className="text-lg">Top PM Interview Questions</CardTitle>
                </div>
              </div>
              <Badge variant="outline">Guide</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                The most common PM interview question is "Tell me about a product you admire." Focus on a product you genuinely like
                and structure your answer with: 1) What the product is, 2) Why you admire it, and 3) How you'd improve it.
              </p>
              
              <div className="relative">
                <p className="text-sm text-muted-foreground blur-[3px]">
                  For behavioral questions like "Tell me about a time you faced a challenge," use the STAR framework: Situation, Task, Action, Result.
                  When given product case studies, remember to always start with understanding the user...
                </p>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Sign up to view full content</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="text-xs" disabled>
                  <Download className="h-3.5 w-3.5 mr-1.5" /> Full Guide
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ContentTeaser>
  );
};

export default ResourcesTeaser;
