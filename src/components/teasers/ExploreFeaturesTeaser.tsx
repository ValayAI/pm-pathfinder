
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import ContentTeaser from '../ContentTeaser';

const ExploreFeaturesTeaser = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2 mb-2">
          <span className="text-primary">✨</span> 
          Explore PM Tools & Features
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          AI-powered tools and frameworks to enhance your product management skills
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        {/* OKR Generator */}
        <Card className="overflow-hidden hover:shadow-md transition-all hover:scale-[1.01] duration-300 border">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                <div className="h-6 w-6 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <span>🎯</span>
                </div>
              </div>
              <span className="text-xs bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-md text-blue-700 dark:text-blue-300 font-medium">
                Strategic
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2">OKR Generator</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Generate effective OKRs for your product with AI assistance.
            </p>
            <Button variant="outline" className="w-full mt-auto" disabled>
              <Lock className="h-3.5 w-3.5 mr-2" />
              Try Demo
            </Button>
          </CardContent>
        </Card>

        {/* RICE Calculator */}
        <Card className="overflow-hidden hover:shadow-md transition-all hover:scale-[1.01] duration-300 border">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full">
                <div className="h-6 w-6 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <span>🧮</span>
                </div>
              </div>
              <span className="text-xs bg-purple-50 dark:bg-purple-900/20 px-2 py-1 rounded-md text-purple-700 dark:text-purple-300 font-medium">
                Prioritization
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2">RICE Calculator</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Prioritize features based on Reach, Impact, Confidence and Effort.
            </p>
            <Button variant="outline" className="w-full mt-auto" disabled>
              <Lock className="h-3.5 w-3.5 mr-2" />
              Try Demo
            </Button>
          </CardContent>
        </Card>

        {/* Roadmap Builder */}
        <Card className="overflow-hidden hover:shadow-md transition-all hover:scale-[1.01] duration-300 border">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full">
                <div className="h-6 w-6 rounded-full flex items-center justify-center text-amber-600 dark:text-amber-400">
                  <span>🗺️</span>
                </div>
              </div>
              <span className="text-xs bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-md text-amber-700 dark:text-amber-300 font-medium">
                Planning
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2">Roadmap Builder</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Create beautiful roadmaps aligned with your product strategy.
            </p>
            <Button variant="outline" className="w-full mt-auto" disabled>
              <Lock className="h-3.5 w-3.5 mr-2" />
              Try Demo
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Testimonials */}
      <div className="grid gap-4 md:grid-cols-2 mb-8">
        <Card className="bg-muted/30 hover:bg-muted/40 transition-colors">
          <CardContent className="pt-6">
            <p className="italic text-muted-foreground">
              "The RICE calculator transformed how my team prioritizes features. We're now laser-focused on high-impact work."
            </p>
            <p className="mt-4 text-sm font-medium">Sarah J. — Product Manager at Dropbox</p>
          </CardContent>
        </Card>
        <Card className="bg-muted/30 hover:bg-muted/40 transition-colors">
          <CardContent className="pt-6">
            <p className="italic text-muted-foreground">
              "The roadmap builder made it so easy to visualize our strategic plan and get stakeholder buy-in."
            </p>
            <p className="mt-4 text-sm font-medium">Michael T. — Senior PM at Spotify</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center mt-8 border-t pt-6">
        <p className="text-sm text-muted-foreground">Create your free account to unlock all features</p>
        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <Link to="/signin">Sign In</Link>
          </Button>
          <Button asChild>
            <Link to="/signup" className="flex items-center gap-1">
              Try these tools & more <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExploreFeaturesTeaser;
