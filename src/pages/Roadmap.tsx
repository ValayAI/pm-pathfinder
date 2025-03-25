
import React from 'react';
import RoadmapGenerator from '../components/RoadmapGenerator';
import Dashboard from '../components/Dashboard';
import { Calendar } from 'lucide-react';

const Roadmap = () => {
  return (
    <Dashboard>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center mb-12">
          <div className="title-badge bg-blue-50 dark:bg-blue-950/50">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Strategy Tool</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-primary">Product Roadmap Generator</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Create and visualize your product roadmap with AI assistance
          </p>
        </div>
        
        <div className="bg-card/80 backdrop-blur-sm border border-muted rounded-xl shadow-md overflow-hidden">
          <RoadmapGenerator />
        </div>
      </div>
    </Dashboard>
  );
};

export default Roadmap;
