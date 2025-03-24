
import React from 'react';
import RoadmapGenerator from '../components/RoadmapGenerator';
import Dashboard from '../components/Dashboard';
import { Calendar } from 'lucide-react';

const Roadmap = () => {
  return (
    <Dashboard>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground">
            <Calendar className="h-3.5 w-3.5 mr-2" />
            <span className="text-sm font-medium">Strategy Tool</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Product Roadmap Generator</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
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
