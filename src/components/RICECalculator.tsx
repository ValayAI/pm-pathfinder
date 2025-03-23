
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CalculatorIcon, PlusCircleIcon, XCircleIcon, ArrowDownIcon, ArrowUpIcon, Lightbulb, GemIcon, ZapIcon, TrendingUpIcon } from "lucide-react";
import { handleChatRequest } from "../api/chat";

// Impact options with predefined values
const impactOptions = [
  { label: "Minimal (0.25)", value: 0.25 },
  { label: "Low (0.5)", value: 0.5 },
  { label: "Medium (1)", value: 1 },
  { label: "High (2)", value: 2 },
  { label: "Massive (3)", value: 3 }
];

// Interface for a feature with RICE parameters
interface Feature {
  id: string;
  name: string;
  reach: number;
  impact: number;
  confidence: number;
  effort: number;
}

// Interface for a feature with calculated RICE score
interface FeatureWithScore extends Feature {
  riceScore: number;
}

const RICECalculator = () => {
  const [features, setFeatures] = useState<Feature[]>([
    {
      id: '1',
      name: '',
      reach: 0,
      impact: 1,
      confidence: 80,
      effort: 1
    }
  ]);
  const [results, setResults] = useState<FeatureWithScore[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState('');

  // Add a new empty feature
  const addFeature = () => {
    setFeatures([
      ...features,
      {
        id: Date.now().toString(),
        name: '',
        reach: 0,
        impact: 1,
        confidence: 80,
        effort: 1
      }
    ]);
  };

  // Remove a feature by its id
  const removeFeature = (id: string) => {
    if (features.length > 1) {
      setFeatures(features.filter(feature => feature.id !== id));
    }
  };

  // Update a feature's property
  const updateFeature = (id: string, field: keyof Feature, value: any) => {
    setFeatures(
      features.map(feature => 
        feature.id === id 
          ? { ...feature, [field]: field === 'impact' ? Number(value) : value } 
          : feature
      )
    );
  };

  // Calculate RICE scores locally
  const calculateRICE = (): FeatureWithScore[] => {
    return features
      .filter(f => f.name.trim() !== '') // Only calculate for features with names
      .map(feature => {
        const riceScore = (feature.reach * feature.impact * (feature.confidence / 100)) / feature.effort;
        return {
          ...feature,
          riceScore: Number(riceScore.toFixed(2))
        };
      })
      .sort((a, b) => b.riceScore - a.riceScore); // Sort by score descending
  };

  // Submit to AI for additional analysis
  const handleSubmit = async () => {
    if (features.filter(f => f.name.trim() !== '').length === 0) return;
    
    setIsLoading(true);
    
    try {
      // Format the feature data for the AI
      const featuresText = features
        .filter(f => f.name.trim() !== '')
        .map((feature, index) => {
          return `Feature ${index + 1}: ${feature.name}
    Reach: ${feature.reach}
    Impact: ${feature.impact}
    Confidence: ${feature.confidence}%
    Effort: ${feature.effort}`;
        })
        .join('\n\n');
      
      const prompt = `Calculate the RICE score for the following features:\n\n${featuresText}\n\nBased on the RICE scores, provide a brief analysis of which features should be prioritized and why. Also include any insights about the data provided.`;
      
      // Calculate scores locally first
      const calculatedResults = calculateRICE();
      setResults(calculatedResults);
      
      // Get AI analysis
      const response = await handleChatRequest({ message: prompt });
      setAiAnalysis(response.message);
    } catch (error) {
      console.error("Error calculating RICE scores:", error);
      setAiAnalysis("Sorry, I encountered an error analyzing the features. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background rounded-lg shadow-sm border border-border">
      <div className="p-6 space-y-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <ZapIcon className="h-5 w-5 text-primary" />
          Prioritize Your Product Features
        </h2>
        
        <p className="text-muted-foreground">
          Enter your feature ideas below and calculate their RICE scores (Reach × Impact × Confidence ÷ Effort).
        </p>
        
        <div className="grid gap-4 mb-2">
          {features.map((feature, index) => (
            <Card key={feature.id} className="shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <GemIcon className="h-4 w-4 text-primary" />
                    Feature {index + 1}
                  </CardTitle>
                  {features.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFeature(feature.id)}
                      aria-label="Remove feature"
                    >
                      <XCircleIcon className="h-5 w-5 text-muted-foreground" />
                    </Button>
                  )}
                </div>
                <Input
                  placeholder="Feature name (e.g., AI Chatbot Enhancement)"
                  value={feature.name}
                  onChange={(e) => updateFeature(feature.id, 'name', e.target.value)}
                  className="mt-2"
                />
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Reach (1-100)
                      <span className="ml-1 text-xs text-muted-foreground">How many users will this affect?</span>
                    </label>
                    <Input
                      type="number"
                      min="1"
                      max="100"
                      value={feature.reach}
                      onChange={(e) => updateFeature(feature.id, 'reach', Number(e.target.value))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Impact
                      <span className="ml-1 text-xs text-muted-foreground">How significant is the impact?</span>
                    </label>
                    <Select
                      value={feature.impact.toString()}
                      onValueChange={(value) => updateFeature(feature.id, 'impact', Number(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select impact level" />
                      </SelectTrigger>
                      <SelectContent>
                        {impactOptions.map(option => (
                          <SelectItem key={option.value} value={option.value.toString()}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Confidence (1-100%)
                      <span className="ml-1 text-xs text-muted-foreground">How confident are you in these estimates?</span>
                    </label>
                    <Input
                      type="number"
                      min="1"
                      max="100"
                      value={feature.confidence}
                      onChange={(e) => updateFeature(feature.id, 'confidence', Number(e.target.value))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Effort (1-100)
                      <span className="ml-1 text-xs text-muted-foreground">Person-weeks required</span>
                    </label>
                    <Input
                      type="number"
                      min="1"
                      max="100"
                      value={feature.effort}
                      onChange={(e) => updateFeature(feature.id, 'effort', Number(e.target.value))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2"
            onClick={addFeature}
          >
            <PlusCircleIcon className="h-4 w-4" />
            Add Another Feature
          </Button>
          
          <Button 
            onClick={handleSubmit}
            disabled={isLoading || features.every(f => f.name.trim() === '')}
            className="w-full"
          >
            {isLoading ? "Calculating..." : "Calculate RICE Scores"}
          </Button>
        </div>
        
        {results.length > 0 && (
          <div className="mt-8 space-y-6">
            <div className="flex items-center gap-2">
              <TrendingUpIcon className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-semibold">Results</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="p-2 text-left">Rank</th>
                    <th className="p-2 text-left">Feature</th>
                    <th className="p-2 text-right">Reach</th>
                    <th className="p-2 text-right">Impact</th>
                    <th className="p-2 text-right">Confidence</th>
                    <th className="p-2 text-right">Effort</th>
                    <th className="p-2 text-right">RICE Score</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, index) => (
                    <tr key={result.id} className="border-b border-border">
                      <td className="p-2">{index + 1}</td>
                      <td className="p-2 font-medium">{result.name}</td>
                      <td className="p-2 text-right">{result.reach}</td>
                      <td className="p-2 text-right">{result.impact}</td>
                      <td className="p-2 text-right">{result.confidence}%</td>
                      <td className="p-2 text-right">{result.effort}</td>
                      <td className="p-2 text-right font-bold">{result.riceScore}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {aiAnalysis && (
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-primary" />
                    AI Analysis
                  </CardTitle>
                  <CardDescription>
                    Insights based on your RICE scores
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-muted-foreground whitespace-pre-line">
                    {aiAnalysis}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RICECalculator;
