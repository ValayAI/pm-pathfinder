
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageCircle, Target, Calendar, ArrowRight } from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';

interface BlogPostModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  content: string;
  category: string;
  icon: 'interview' | 'strategic' | 'planning';
}

const BlogPostModal: React.FC<BlogPostModalProps> = ({
  open,
  onOpenChange,
  title,
  content,
  category,
  icon,
}) => {
  const { user } = useAuth();
  
  const getIcon = () => {
    switch (icon) {
      case 'interview':
        return <MessageCircle className="h-5 w-5 text-blue-500" />;
      case 'strategic':
        return <Target className="h-5 w-5 text-purple-500" />;
      case 'planning':
        return <Calendar className="h-5 w-5 text-orange-500" />;
      default:
        return <MessageCircle className="h-5 w-5 text-blue-500" />;
    }
  };
  
  const getCategoryStyle = () => {
    switch (icon) {
      case 'interview':
        return 'bg-blue-100 text-blue-700';
      case 'strategic':
        return 'bg-purple-100 text-purple-700';
      case 'planning':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-blue-100 text-blue-700';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md md:max-w-2xl lg:max-w-3xl">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <div className={`p-2 rounded-full ${icon === 'interview' ? 'bg-blue-50' : icon === 'strategic' ? 'bg-purple-50' : 'bg-orange-50'}`}>
              {getIcon()}
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryStyle()}`}>
              {category}
            </span>
          </div>
          <DialogTitle className="text-xl mt-2">{title}</DialogTitle>
        </DialogHeader>
        
        <div className="mt-4 max-h-[60vh] overflow-y-auto pr-2">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            {content.split('\n').map((paragraph, i) => (
              <p key={i} className="mb-4">{paragraph}</p>
            ))}
          </div>
          
          {/* CTA section */}
          <div className="mt-8 mb-4 bg-primary/5 border border-primary/10 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Ready to level up your PM skills?</h3>
            <p className="mb-4">Get personalized coaching, access to frameworks, and practice interviews with our AI assistant.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              {!user ? (
                <>
                  <Button asChild>
                    <Link to="/sign-up" className="flex items-center justify-center">
                      Sign up free <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/signin">Already have an account? Sign in</Link>
                  </Button>
                </>
              ) : (
                <Button asChild>
                  <Link to="/chat" className="flex items-center justify-center">
                    Try PM-Pathfinder <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
        
        <DialogFooter className="flex justify-end mt-4 pt-4 border-t">
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BlogPostModal;
