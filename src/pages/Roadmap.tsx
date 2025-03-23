
import React from 'react';
import RoadmapGenerator from '../components/RoadmapGenerator';
import TeaserWrapper from '@/components/TeaserWrapper';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BarChart3, LineChart } from "lucide-react";

const RoadmapPreview = () => (
  <div className="bg-background rounded-lg border border-border p-6 mb-6">
    <div className="flex items-center space-x-4 mb-6">
      <div className="rounded-full bg-primary/10 p-3">
        <BarChart3 className="w-6 h-6 text-primary" />
      </div>
      <div>
        <h3 className="text-xl font-semibold">Product Roadmap Generator</h3>
        <p className="text-muted-foreground">Create and visualize your product roadmap</p>
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {["Feature prioritization", "Timeline visualization", "Dependency management"].map((feature, i) => (
        <div key={i} className="border border-border rounded-md p-4 bg-card/50">
          <LineChart className="w-5 h-5 text-muted-foreground mb-2" />
          <p className="font-medium">{feature}</p>
        </div>
      ))}
    </div>
    
    <Button asChild>
      <Link to="/sign-up">Try Roadmap Generator</Link>
    </Button>
  </div>
);

const Roadmap = () => {
  return (
    <TeaserWrapper
      title="Product Roadmap Generator"
      description="Plan and visualize your product roadmap with our interactive tool"
      previewContent={<RoadmapPreview />}
    >
      <RoadmapGenerator />
    </TeaserWrapper>
  );
};

export default Roadmap;
