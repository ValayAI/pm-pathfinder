
import React, { useState } from 'react';
import { CalendarIcon } from "lucide-react";
import FeatureForm from './roadmap/FeatureForm';
import FeaturesList from './roadmap/FeaturesList';
import RoadmapDisplay from './roadmap/RoadmapDisplay';
import { generateRoadmap } from './roadmap/roadmapService';
import { FeatureInput, RoadmapItem, RoadmapTimeframe } from './roadmap/types';

const RoadmapGenerator = () => {
  const [features, setFeatures] = useState<FeatureInput[]>([]);
  const [roadmap, setRoadmap] = useState<RoadmapItem[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [timeframe, setTimeframe] = useState<RoadmapTimeframe>("6-month");
  const [aiRationale, setAiRationale] = useState<string>("");

  const handleAddFeature = (feature: Omit<FeatureInput, "id">) => {
    // Create new feature with unique ID
    const newFeature: FeatureInput = {
      ...feature,
      id: Math.random().toString(36).substring(2, 9),
    };
    
    setFeatures([...features, newFeature]);
  };

  const handleRemoveFeature = (id: string) => {
    setFeatures(features.filter(f => f.id !== id));
  };

  const handleGenerateRoadmap = async () => {
    if (features.length === 0) return;
    
    setIsGenerating(true);
    
    try {
      const result = await generateRoadmap(features, timeframe);
      setRoadmap(result.roadmap);
      setAiRationale(result.rationale);
    } catch (error) {
      console.error("Error generating roadmap:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
      <div className="flex items-center gap-2 mb-4">
        <CalendarIcon className="h-5 w-5 text-primary" />
        <h2 className="text-2xl font-semibold">Build Your Product Roadmap</h2>
      </div>
      
      <p className="text-muted-foreground mb-6">
        Enter your feature ideas and get an AI-generated roadmap in seconds. Our AI will organize your features into a structured timeline based on impact, effort, and dependencies.
      </p>
      
      {/* Feature Input Form */}
      <FeatureForm 
        features={features}
        onAddFeature={handleAddFeature}
      />
      
      {/* Features List */}
      {features.length > 0 && (
        <FeaturesList
          features={features}
          onRemoveFeature={handleRemoveFeature}
          timeframe={timeframe}
          onTimeframeChange={setTimeframe}
          onGenerateRoadmap={handleGenerateRoadmap}
          isGenerating={isGenerating}
        />
      )}
      
      {/* Generated Roadmap */}
      {roadmap.length > 0 && (
        <RoadmapDisplay
          roadmap={roadmap}
          aiRationale={aiRationale}
          timeframe={timeframe}
        />
      )}
    </div>
  );
};

export default RoadmapGenerator;
