
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Download, Lock, Eye, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ContentTeaser from '../ContentTeaser';

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
        {/* Resource 1 */}
        <Card className="overflow-hidden hover:shadow-md transition-all hover:scale-[1.01] duration-300 border">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <Badge variant="outline">Template</Badge>
            </div>
            <CardTitle className="mt-4">PRD Template</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              A comprehensive Product Requirements Document template to define features and requirements.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Eye className="h-3.5 w-3.5 mr-1.5" /> Preview
              </Button>
              <Button variant="outline" size="sm" className="flex-1" disabled>
                <Lock className="h-3.5 w-3.5 mr-1.5" /> Download
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Resource 2 */}
        <Card className="overflow-hidden hover:shadow-md transition-all hover:scale-[1.01] duration-300 border">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full">
                <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <Badge variant="outline">Guide</Badge>
            </div>
            <CardTitle className="mt-4">PM Interview Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Master the most common product management interview questions with expert tips.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Eye className="h-3.5 w-3.5 mr-1.5" /> Preview
              </Button>
              <Button variant="outline" size="sm" className="flex-1" disabled>
                <Lock className="h-3.5 w-3.5 mr-1.5" /> Full Guide
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
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
