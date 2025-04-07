
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { MessageCircle, Target, Calendar, ArrowRight, Clock } from 'lucide-react';
import BlogPostModal from './modals/BlogPostModal';
import { Link } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';

interface BlogCardProps {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  icon: 'interview' | 'strategic' | 'planning';
  publishDate: string;
  readingTime: string;
  slug: string;
}

const BlogCard = ({ 
  id, 
  title, 
  description, 
  content, 
  category, 
  icon,
  publishDate,
  readingTime,
  slug
}: BlogCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  
  const getIcon = () => {
    switch (icon) {
      case 'interview':
        return (
          <div className="bg-blue-50 p-4 rounded-lg">
            <MessageCircle className="h-8 w-8 text-blue-500" />
          </div>
        );
      case 'strategic':
        return (
          <div className="bg-purple-50 p-4 rounded-lg">
            <Target className="h-8 w-8 text-purple-500" />
          </div>
        );
      case 'planning':
        return (
          <div className="bg-orange-50 p-4 rounded-lg">
            <Calendar className="h-8 w-8 text-orange-500" />
          </div>
        );
      default:
        return (
          <div className="bg-blue-50 p-4 rounded-lg">
            <MessageCircle className="h-8 w-8 text-blue-500" />
          </div>
        );
    }
  };
  
  const getCategoryBadge = () => {
    let bgColor = 'bg-blue-100 text-blue-700';
    
    switch (icon) {
      case 'interview':
        bgColor = 'bg-blue-100 text-blue-700';
        break;
      case 'strategic':
        bgColor = 'bg-purple-100 text-purple-700';
        break;
      case 'planning':
        bgColor = 'bg-orange-100 text-orange-700';
        break;
    }
    
    return (
      <div className={`px-4 py-1 rounded-full text-sm font-medium ${bgColor}`}>
        {category}
      </div>
    );
  };
  
  return (
    <>
      <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
        <CardContent className="pt-6">
          <div className="flex justify-between items-start mb-6">
            {getIcon()}
            {getCategoryBadge()}
          </div>
          
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          
          <div className="flex items-center text-xs text-muted-foreground mb-3">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{publishDate}</span>
            <span className="mx-1.5">·</span>
            <Clock className="h-3 w-3 mr-1" />
            <span>{readingTime} read</span>
          </div>
          
          <p className="text-muted-foreground mb-4">{description}</p>
        </CardContent>
        
        <CardFooter className="mt-auto pt-0">
          <Link to={`/blog/${slug}`} className="w-full">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center"
              onClick={(e) => {
                e.preventDefault();
                setIsModalOpen(true);
              }}
            >
              Read Article <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
      
      <BlogPostModal 
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title={title}
        content={content}
        category={category}
        icon={icon}
        publishDate={publishDate}
        readingTime={readingTime}
      />
    </>
  );
};

export default BlogCard;
