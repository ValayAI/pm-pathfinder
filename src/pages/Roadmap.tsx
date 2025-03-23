
import React from 'react';
import RoadmapGenerator from '../components/RoadmapGenerator';
import Dashboard from '../components/Dashboard';

const Roadmap = () => {
  return (
    <Dashboard>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Product Roadmap Generator</h1>
        <RoadmapGenerator />
      </div>
    </Dashboard>
  );
};

export default Roadmap;
