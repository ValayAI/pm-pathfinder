
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Lock, MessageSquare, Calendar, Target, DollarSign, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

const ExploreFeaturesTeaser = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <div className="relative mb-16">
        <div className="absolute -left-4 top-1/2 -translate-y-1/2 hidden md:block">
          <div className="w-1.5 h-20 bg-gradient-to-b from-blue-500 to-primary rounded-full"></div>
        </div>
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 hidden md:block">
          <Sparkles className="text-primary/60 h-12 w-12 animate-pulse" />
        </div>
        <div className="text-center">
          <span className="inline-block px-4 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4">Product Management Suite</span>
          <h2 className="text-3xl md:text-4xl font-semibold leading-tight md:leading-snug tracking-tight mb-4">
            <span className="bg-gradient-to-br from-blue-600 to-primary bg-clip-text text-transparent">
              Enhance your PM workflow
            </span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            AI-powered tools and frameworks to advance your product management skills
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-12">
        {/* PM Interview Tool */}
        <Card className="overflow-hidden transition-all hover:shadow-md hover:scale-[1.01] duration-300 border border-blue-100 dark:border-blue-900/20 group">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-5">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
                <MessageSquare className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <Badge variant="outline" className="bg-blue-50/50 dark:bg-blue-900/10 hover:bg-blue-50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                Interviews
              </Badge>
            </div>
            <h3 className="text-xl font-semibold mb-3">Interview Prep</h3>
            <p className="text-muted-foreground mb-5">
              Get tailored AI prompts for product management interviews.
            </p>
            <Button variant="outline" className="w-full flex items-center justify-center gap-1.5 group-hover:border-blue-300 transition-colors" disabled>
              <Lock className="h-3.5 w-3.5" /> Try Demo
            </Button>
          </CardContent>
        </Card>

        {/* OKR Generator */}
        <Card className="overflow-hidden transition-all hover:shadow-md hover:scale-[1.01] duration-300 border border-purple-100 dark:border-purple-900/20 group">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-5">
              <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30 transition-colors">
                <Target className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <Badge variant="outline" className="bg-purple-50/50 dark:bg-purple-900/10 hover:bg-purple-50 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800">
                Strategic
              </Badge>
            </div>
            <h3 className="text-xl font-semibold mb-3">OKR Builder</h3>
            <p className="text-muted-foreground mb-5">
              Define objectives with measurable key results for your team.
            </p>
            <Button variant="outline" className="w-full flex items-center justify-center gap-1.5 group-hover:border-purple-300 transition-colors" disabled>
              <Lock className="h-3.5 w-3.5" /> Try Demo
            </Button>
          </CardContent>
        </Card>

        {/* Roadmap Builder */}
        <Card className="overflow-hidden transition-all hover:shadow-md hover:scale-[1.01] duration-300 border border-amber-100 dark:border-amber-900/20 group">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-5">
              <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg group-hover:bg-amber-100 dark:group-hover:bg-amber-900/30 transition-colors">
                <Calendar className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <Badge variant="outline" className="bg-amber-50/50 dark:bg-amber-900/10 hover:bg-amber-50 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800">
                Planning
              </Badge>
            </div>
            <h3 className="text-xl font-semibold mb-3">Roadmap Builder</h3>
            <p className="text-muted-foreground mb-5">
              Create beautiful roadmaps aligned with your product strategy.
            </p>
            <Button variant="outline" className="w-full flex items-center justify-center gap-1.5 group-hover:border-amber-300 transition-colors" disabled>
              <Lock className="h-3.5 w-3.5" /> Try Demo
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Feature Preview Banner */}
      <div className="mb-12 bg-gradient-to-r from-primary/5 to-primary/10 backdrop-blur-sm rounded-xl p-8 border border-primary/20 text-center shadow-sm">
        <h2 className="text-2xl font-semibold mb-3">Sign up to unlock 10+ AI tools for PMs 🚀</h2>
        <p className="text-muted-foreground mb-5 max-w-xl mx-auto">Our AI-powered platform helps you build better products and advance your PM career.</p>
        <Button asChild size="lg" className="bg-primary/90 hover:bg-primary">
          <Link to="/signup">Get Started Free</Link>
        </Button>
      </div>

      {/* Testimonials */}
      <div className="grid gap-5 md:grid-cols-2 mb-12">
        <Card className="bg-muted/20 hover:bg-muted/30 transition-colors rounded-xl shadow-sm border border-muted">
          <CardContent className="pt-6 p-6">
            <p className="italic text-muted-foreground mb-4">
              "The RICE calculator transformed how my team prioritizes features. We're now laser-focused on high-impact work."
            </p>
            <div className="flex items-center justify-between">
              <p className="font-medium">Sarah J. — Product Manager at Dropbox</p>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-muted/20 hover:bg-muted/30 transition-colors rounded-xl shadow-sm border border-muted">
          <CardContent className="pt-6 p-6">
            <p className="italic text-muted-foreground mb-4">
              "The roadmap builder made it so easy to visualize our strategic plan and get stakeholder buy-in."
            </p>
            <div className="flex items-center justify-between">
              <p className="font-medium">Michael T. — Senior PM at Spotify</p>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center mt-10 pt-6 border-t">
        <div className="flex gap-4">
          <Button variant="outline" asChild className="min-w-32">
            <Link to="/signin">Sign In</Link>
          </Button>
          <Button asChild className="min-w-32">
            <Link to="/signup" className="flex items-center gap-1.5">
              Sign Up <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExploreFeaturesTeaser;
