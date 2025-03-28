
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
  console.log("ResourcePreviewModal rendering with open:", open);
  const { user } = useAuth();
  
  useEffect(() => {
    console.log("ResourcePreviewModal props changed - open state:", open);
    if (open) {
      toast.info("Modal should be visible now");
    }
  }, [open, title]);
  
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
            {user ? "Full resource content" : "Preview of the first few paragraphs"}
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-2 space-y-4">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            {user ? (
              // Show full content for authenticated users
              <>
                <p className="font-medium text-foreground">{previewContent}</p>
                {content.split('\n').map((paragraph, i) => (
                  <p key={i} className="mb-4">{paragraph}</p>
                ))}
              </>
            ) : (
              // Show preview with blurred content for non-authenticated users
              <>
                <p>{previewContent}</p>
                
                <div className="relative mt-6 pt-4 border-t">
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-2">
                    <Lock className="h-3 w-3" />
                    <span>Sign up for full access</span>
                  </div>
                  <div className="bg-gradient-to-b from-transparent to-background/95 h-20 absolute -top-20 left-0 right-0 pointer-events-none"></div>
                  <div className="blur-[2px] opacity-30 pointer-events-none">
                    {content.split('\n').map((paragraph, i) => (
                      <p key={i} className="mb-4">{paragraph}</p>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        
        <DialogFooter className="flex sm:justify-between flex-col sm:flex-row gap-3 sm:gap-0 mt-4 pt-4 border-t">
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
