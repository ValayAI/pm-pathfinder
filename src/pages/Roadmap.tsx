
import React from 'react';
import RoadmapGenerator from '../components/RoadmapGenerator';
import Dashboard from '../components/Dashboard';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Map } from 'lucide-react';

const Roadmap = () => {
  return (
    <Dashboard>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground border-primary/20 dark:border-primary/30 px-3 py-1">
            <Map className="h-3.5 w-3.5 mr-1" />
            Strategy Tool
          </Badge>
          <h1 className="text-3xl font-bold mb-4">Product Roadmap Generator</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Create and visualize your product roadmap with AI assistance
          </p>
        </div>
        
        <div className="bg-card/80 backdrop-blur-sm border border-muted rounded-xl shadow-sm overflow-hidden">
          <RoadmapGenerator />
        </div>
      </div>
    </Dashboard>
  );
};

export default Roadmap;
