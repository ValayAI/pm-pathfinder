
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Lock, MessageSquare, Calendar, Target, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import ContentTeaser from '../ContentTeaser';
import { Badge } from '@/components/ui/badge';

const ExploreFeaturesTeaser = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <div className="text-center mb-10">
        <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-300 dark:border-blue-700 px-3 py-1">
          <DollarSign className="h-3.5 w-3.5 mr-1" />
          Explore Features
        </Badge>
        <h1 className="text-4xl font-bold mb-4">Explore PM Tools & Features</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          AI-powered tools and frameworks to enhance your product management skills
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-12">
        {/* PM Interview Tool */}
        <Card className="overflow-hidden hover:shadow-md transition-all hover:scale-[1.01] duration-300 border">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                <MessageSquare className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-xs bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-md text-blue-700 dark:text-blue-300 font-medium">
                Interviews
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2">Interview Prep</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get tailored AI prompts for product management interviews.
            </p>
            <Button variant="outline" className="w-full mt-auto flex items-center justify-center gap-1.5" disabled>
              <Lock className="h-3.5 w-3.5" /> Try Demo
            </Button>
          </CardContent>
        </Card>

        {/* OKR Generator */}
        <Card className="overflow-hidden hover:shadow-md transition-all hover:scale-[1.01] duration-300 border">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full">
                <Target className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-xs bg-purple-50 dark:bg-purple-900/20 px-2 py-1 rounded-md text-purple-700 dark:text-purple-300 font-medium">
                Strategic
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2">OKR Builder</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Define objectives with measurable key results for your team.
            </p>
            <Button variant="outline" className="w-full mt-auto flex items-center justify-center gap-1.5" disabled>
              <Lock className="h-3.5 w-3.5" /> Try Demo
            </Button>
          </CardContent>
        </Card>

        {/* Roadmap Builder */}
        <Card className="overflow-hidden hover:shadow-md transition-all hover:scale-[1.01] duration-300 border">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full">
                <Calendar className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <span className="text-xs bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-md text-amber-700 dark:text-amber-300 font-medium">
                Planning
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2">Roadmap Builder</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Create beautiful roadmaps aligned with your product strategy.
            </p>
            <Button variant="outline" className="w-full mt-auto flex items-center justify-center gap-1.5" disabled>
              <Lock className="h-3.5 w-3.5" /> Try Demo
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Feature Preview Banner */}
      <div className="mb-12 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-6 border border-primary/20 text-center">
        <h2 className="text-xl font-bold mb-2">Sign up to unlock 10+ AI tools for PMs 🚀</h2>
        <p className="text-muted-foreground mb-4">Our AI-powered platform helps you build better products and advance your PM career.</p>
      </div>

      {/* Testimonials */}
      <div className="grid gap-4 md:grid-cols-2 mb-8">
        <Card className="bg-muted/30 hover:bg-muted/40 transition-colors">
          <CardContent className="pt-6">
            <p className="italic text-muted-foreground">
              "The RICE calculator transformed how my team prioritizes features. We're now laser-focused on high-impact work."
            </p>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm font-medium">Sarah J. — Product Manager at Dropbox</p>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-muted/30 hover:bg-muted/40 transition-colors">
          <CardContent className="pt-6">
            <p className="italic text-muted-foreground">
              "The roadmap builder made it so easy to visualize our strategic plan and get stakeholder buy-in."
            </p>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm font-medium">Michael T. — Senior PM at Spotify</p>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
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
              Sign Up <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExploreFeaturesTeaser;
