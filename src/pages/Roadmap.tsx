
import React from 'react';
import RoadmapGenerator from '../components/RoadmapGenerator';
import Dashboard from '../components/Dashboard';

const Roadmap = () => {
  return (
    <Dashboard>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-gradient-primary">Product Roadmap Generator</h1>
            <p className="text-muted-foreground">Create and visualize your product roadmap with AI assistance</p>
          </div>
          <div className="hidden md:block w-24 h-24 bg-gradient-to-br from-primary/20 to-purple-400/20 rounded-full blur-2xl opacity-70 -z-10"></div>
        </div>
        
        <div className="bg-card/80 backdrop-blur-sm border border-muted rounded-xl shadow-sm overflow-hidden">
          <RoadmapGenerator />
        </div>
      </div>
    </Dashboard>
  );
};

export default Roadmap;
