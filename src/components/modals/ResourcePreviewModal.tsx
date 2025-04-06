
import React, { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, BookOpen, Video, Download, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from "sonner";
import { useAuth } from "@/providers/AuthProvider";

export interface ResourcePreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  type: string;
  content: string;
  previewContent: string;
}

const ResourcePreviewModal: React.FC<ResourcePreviewProps> = ({
  open,
  onOpenChange,
  title,
  type,
  content,
  previewContent,
}) => {
  const { user } = useAuth();
  
  // Add this useEffect to handle modal opening
  useEffect(() => {
    if (open && !user) {
      console.log("Resource preview opened by non-logged in user");
    }
  }, [open, user]);
  
  const getIcon = () => {
    switch (type) {
      case 'Template':
        return <FileText className="h-5 w-5 text-primary" />;
      case 'Guide':
        return <BookOpen className="h-5 w-5 text-primary" />;
      case 'Video':
        return <Video className="h-5 w-5 text-primary" />;
      case 'Download':
        return <Download className="h-5 w-5 text-primary" />;
      default:
        return <FileText className="h-5 w-5 text-primary" />;
    }
  };

  // Function to split content into paragraphs
  const formatContent = (text: string) => {
    return text.split('\n\n');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md md:max-w-xl">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <div className="bg-primary/10 p-1.5 rounded-full">
              {getIcon()}
            </div>
            <Badge variant="outline" className="ml-1">
              {type}
            </Badge>
          </div>
          <DialogTitle className="text-xl mt-2">{title}</DialogTitle>
          <DialogDescription>
            {user ? "Full resource content" : "Preview of the resource"}
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-2 space-y-4">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            {user ? (
              // Show full content for authenticated users
              <>
                <p className="font-medium text-foreground">{previewContent}</p>
                {formatContent(content).map((paragraph, i) => (
                  <p key={i} className="mb-4">{paragraph}</p>
                ))}
              </>
            ) : (
              // Show extended preview with blurred content for non-authenticated users
              <>
                <p className="mb-6">{previewContent}</p>
                
                <div className="relative mt-4 pt-4 border-t">
                  {/* First paragraph fully visible */}
                  <div className="mb-6">
                    {formatContent(content)[0]}
                  </div>
                  
                  {/* Second paragraph fully visible */}
                  <div className="mb-6">
                    {formatContent(content)[1] || ""}
                  </div>
                  
                  <div className="relative">
                    <div className="bg-gradient-to-b from-transparent to-background/95 h-32 absolute -top-20 left-0 right-0 pointer-events-none"></div>
                    
                    {/* Third paragraph slightly blurred */}
                    <div className="blur-[1px] opacity-80 pointer-events-none mb-4">
                      {formatContent(content)[2] || ""}
                    </div>
                    
                    {/* Fourth paragraph more blurred */}
                    <div className="blur-[3px] opacity-50 pointer-events-none mb-4">
                      {formatContent(content)[3] || "When preparing for product management interviews, it's essential to have a structured approach that showcases both your analytical thinking and your practical experience..."}
                    </div>
                    
                    {/* Fifth paragraph very blurred */}
                    <div className="blur-[5px] opacity-30 pointer-events-none">
                      <p className="mb-2">{formatContent(content)[4] || "The most successful candidates demonstrate a clear understanding of product metrics and can articulate how they've used data to drive decisions in previous roles..."}</p>
                      <p className="mb-2">{"Remember that interviewers are looking for your thought process as much as your final answer. Take your time, think through problems methodically, and don't be afraid to ask clarifying questions..."}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-8 mb-4 bg-muted/30 py-4 px-4 rounded-md border">
                    <Lock className="h-4 w-4" />
                    <span>Sign up to access the full content</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        
        <DialogFooter className="flex sm:justify-between flex-col sm:flex-row gap-3 sm:gap-0 mt-6 pt-4 border-t">
          <Button 
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Close Preview
          </Button>
          
          {!user && (
            <div className="flex gap-3">
              <Button variant="outline" asChild>
                <Link to="/signin">Sign In</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Sign Up for Full Access</Link>
              </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResourcePreviewModal;
