
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MessageCircle, Target, Calendar, Clock, Share2, ThumbsUp } from 'lucide-react';

interface BlogPostModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  content: string;
  category: string;
  icon: 'interview' | 'strategic' | 'planning';
  publishDate?: string;
  readingTime?: string;
}

const BlogPostModal: React.FC<BlogPostModalProps> = ({
  open,
  onOpenChange,
  title,
  content,
  category,
  icon,
  publishDate,
  readingTime
}) => {
  const getCategoryIcon = () => {
    switch (icon) {
      case 'interview':
        return <MessageCircle className="h-5 w-5 text-blue-500 mr-2" />;
      case 'strategic':
        return <Target className="h-5 w-5 text-purple-500 mr-2" />;
      case 'planning':
        return <Calendar className="h-5 w-5 text-orange-500 mr-2" />;
      default:
        return <MessageCircle className="h-5 w-5 text-blue-500 mr-2" />;
    }
  };

  const paragraphs = content.split('\n\n').filter(p => p.trim());

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <div className="flex items-center mb-2">
            {getCategoryIcon()}
            <span className="text-sm font-medium">{category}</span>
          </div>
          <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
          {(publishDate || readingTime) && (
            <div className="flex items-center text-sm text-muted-foreground mt-2">
              {publishDate && (
                <>
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{publishDate}</span>
                </>
              )}
              {publishDate && readingTime && <span className="mx-2">·</span>}
              {readingTime && (
                <>
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{readingTime} read</span>
                </>
              )}
            </div>
          )}
        </DialogHeader>

        <div className="mt-4 space-y-4">
          {paragraphs.map((paragraph, index) => (
            <div key={index} className="text-base leading-relaxed">
              {paragraph.startsWith('- ') ? (
                <ul className="list-disc list-inside space-y-1">
                  {paragraph.split('\n- ').map((item, i) => (
                    <li key={i} className="ml-2">{item.replace('- ', '')}</li>
                  ))}
                </ul>
              ) : paragraph.startsWith('#') ? (
                <h3 className="text-lg font-bold mt-4 mb-2">{paragraph.replace('# ', '')}</h3>
              ) : (
                <p>{paragraph}</p>
              )}
            </div>
          ))}
        </div>

        <DialogFooter className="flex justify-between items-center mt-6 sm:justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <ThumbsUp className="h-4 w-4 mr-1" /> Helpful
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-1" /> Share
            </Button>
          </div>
          <Button 
            variant="ghost" 
            onClick={() => onOpenChange(false)}
            className="mt-0"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BlogPostModal;
