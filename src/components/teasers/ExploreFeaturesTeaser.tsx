
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Compass, Target, Grid, Lock } from 'lucide-react';
import ContentTeaser from '../ContentTeaser';

const ExploreFeaturesTeaser = () => {
  return (
    <ContentTeaser
      title="Explore PM Tools & Features"
      description="AI-powered tools and frameworks to enhance your product management skills"
      cta="Try these tools & more"
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Tool 1 */}
        <Card className="overflow-hidden hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex justify-between">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded">
                <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                Strategic
              </Badge>
            </div>
            <CardTitle className="text-lg mt-3">OKR Generator</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Generate effective OKRs for your product with AI assistance.
            </p>
          </CardContent>
          <CardFooter className="border-t bg-muted/20 pt-2">
            <Button variant="outline" className="w-full" disabled>
              <Lock className="h-3.5 w-3.5 mr-2" />
              Try Demo
            </Button>
          </CardFooter>
        </Card>

        {/* Tool 2 */}
        <Card className="overflow-hidden hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex justify-between">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded">
                <Grid className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <Badge variant="outline" className="bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300">
                Prioritization
              </Badge>
            </div>
            <CardTitle className="text-lg mt-3">RICE Calculator</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Prioritize features based on Reach, Impact, Confidence and Effort.
            </p>
          </CardContent>
          <CardFooter className="border-t bg-muted/20 pt-2">
            <Button variant="outline" className="w-full" disabled>
              <Lock className="h-3.5 w-3.5 mr-2" />
              Try Demo
            </Button>
          </CardFooter>
        </Card>

        {/* Tool 3 */}
        <Card className="overflow-hidden hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex justify-between">
              <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded">
                <Compass className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <Badge variant="outline" className="bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300">
                Planning
              </Badge>
            </div>
            <CardTitle className="text-lg mt-3">Roadmap Builder</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Create beautiful roadmaps aligned with your product strategy.
            </p>
          </CardContent>
          <CardFooter className="border-t bg-muted/20 pt-2">
            <Button variant="outline" className="w-full" disabled>
              <Lock className="h-3.5 w-3.5 mr-2" />
              Try Demo
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Testimonials */}
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Card className="bg-muted/30">
          <CardContent className="pt-6">
            <p className="italic text-muted-foreground">
              "The RICE calculator transformed how my team prioritizes features. We're now laser-focused on high-impact work."
            </p>
            <p className="mt-4 text-sm font-medium">Sarah J. — Product Manager at Dropbox</p>
          </CardContent>
        </Card>
        <Card className="bg-muted/30">
          <CardContent className="pt-6">
            <p className="italic text-muted-foreground">
              "The roadmap builder made it so easy to visualize our strategic plan and get stakeholder buy-in."
            </p>
            <p className="mt-4 text-sm font-medium">Michael T. — Senior PM at Spotify</p>
          </CardContent>
        </Card>
      </div>
    </ContentTeaser>
  );
};

export default ExploreFeaturesTeaser;
