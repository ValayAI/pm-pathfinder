
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckIcon, XIcon, Loader2, CalendarIcon, ZapIcon, ArrowRightIcon, PlusCircleIcon, TimerIcon } from "lucide-react";
import { handleChatRequest } from "../api/chat.tsx";
import { Label } from "./ui/label";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useForm } from "react-hook-form";

type FeatureInput = {
  name: string;
  description: string;
  effort: "Low" | "Medium" | "High";
  impact: "Low" | "Medium" | "High";
  dependencies: string[];
  id: string;
};

type RoadmapItem = {
  quarter: string;
  features: {
    name: string;
    description: string;
    effort: string;
    impact: string;
    id: string;
  }[];
  theme: string;
};

type RoadmapTimeframe = "3-month" | "6-month" | "12-month";

const RoadmapGenerator = () => {
  const [features, setFeatures] = useState<FeatureInput[]>([]);
  const [roadmap, setRoadmap] = useState<RoadmapItem[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [timeframe, setTimeframe] = useState<RoadmapTimeframe>("6-month");
  const [aiRationale, setAiRationale] = useState<string>("");
  
  // Form state for current feature being added
  const [currentFeature, setCurrentFeature] = useState<Omit<FeatureInput, "id">>({
    name: "",
    description: "",
    effort: "Medium",
    impact: "Medium",
    dependencies: [],
  });
  
  // Available features for dependencies
  const availableFeatures = features.map(f => f.name);

  const handleAddFeature = () => {
    if (currentFeature.name.trim() === "") return;
    
    // Create new feature with unique ID
    const newFeature: FeatureInput = {
      ...currentFeature,
      id: Math.random().toString(36).substring(2, 9),
    };
    
    setFeatures([...features, newFeature]);
    
    // Reset current feature form
    setCurrentFeature({
      name: "",
      description: "",
      effort: "Medium",
      impact: "Medium",
      dependencies: [],
    });
  };

  const handleRemoveFeature = (id: string) => {
    setFeatures(features.filter(f => f.id !== id));
  };

  const handleGenerateRoadmap = async () => {
    if (features.length === 0) return;
    
    setIsGenerating(true);
    
    try {
      // Format features for the prompt
      const featuresText = features.map(f => {
        const dependencies = f.dependencies.length > 0 
          ? `Dependencies: ${f.dependencies.join(", ")}`
          : "No dependencies";
          
        return `Feature: ${f.name}\nDescription: ${f.description}\nEffort: ${f.effort}\nImpact: ${f.impact}\n${dependencies}`;
      }).join("\n\n");
      
      // Create the prompt for the AI
      const prompt = `Generate a product roadmap for a ${timeframe} timeframe based on the following features:\n\n${featuresText}\n\n
      Organize these features into a roadmap with quarters (or appropriate time periods for the ${timeframe} timeframe). 
      For each time period, provide a theme or focus, and list the features that should be implemented in that period.
      Consider dependencies, effort, and impact when sequencing.
      
      Return your response in this exact format:
      
      RATIONALE:
      (Explain your rationale for how you organized the roadmap)
      
      ROADMAP:
      {
        "quarters": [
          {
            "quarter": "Quarter 1",
            "theme": "Quick Wins",
            "features": [
              {"name": "Feature Name", "description": "Feature Description", "effort": "Low", "impact": "High"}
            ]
          },
          {
            "quarter": "Quarter 2",
            "theme": "Strategic Improvements",
            "features": [
              {"name": "Feature Name", "description": "Feature Description", "effort": "Medium", "impact": "High"}
            ]
          }
        ]
      }`;
      
      // Call the AI service
      const response = await handleChatRequest({ message: prompt });
      
      // Extract the roadmap data from the response
      const rationale = response.message.split("ROADMAP:")[0].replace("RATIONALE:", "").trim();
      const jsonString = response.message.split("ROADMAP:")[1]?.trim();
      
      if (jsonString) {
        try {
          // Try to find valid JSON in the response
          const jsonMatch = jsonString.match(/{[\s\S]*}/);
          if (jsonMatch) {
            const parsedData = JSON.parse(jsonMatch[0]);
            
            if (parsedData && parsedData.quarters) {
              setRoadmap(parsedData.quarters);
              setAiRationale(rationale);
            }
          } else {
            console.error("Could not find JSON in response");
          }
        } catch (parseError) {
          console.error("Error parsing JSON:", parseError);
        }
      }
    } catch (error) {
      console.error("Error generating roadmap:", error);
    } finally {
      setIsGenerating(false);
    }
  };
  
  const getQuarterIcon = (index: number) => {
    switch (index) {
      case 0: return <ZapIcon className="h-5 w-5 text-yellow-500" />;
      case 1: return <TimerIcon className="h-5 w-5 text-blue-500" />;
      default: return <CalendarIcon className="h-5 w-5 text-purple-500" />;
    }
  };
  
  const getEffortBadge = (effort: string) => {
    const colors = {
      Low: "bg-green-100 text-green-800",
      Medium: "bg-yellow-100 text-yellow-800",
      High: "bg-red-100 text-red-800"
    };
    
    return (
      <span className={`text-xs px-2 py-1 rounded-full ${colors[effort as keyof typeof colors]}`}>
        {effort}
      </span>
    );
  };
  
  const getImpactBadge = (impact: string) => {
    const colors = {
      Low: "bg-gray-100 text-gray-800",
      Medium: "bg-blue-100 text-blue-800",
      High: "bg-purple-100 text-purple-800"
    };
    
    return (
      <span className={`text-xs px-2 py-1 rounded-full ${colors[impact as keyof typeof colors]}`}>
        {impact}
      </span>
    );
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
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add Features</CardTitle>
          <CardDescription>
            Enter the details of each feature you want to include in your roadmap
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div>
              <Label htmlFor="feature-name">Feature Name</Label>
              <Input
                id="feature-name"
                placeholder="e.g., User Authentication"
                value={currentFeature.name}
                onChange={(e) => setCurrentFeature({...currentFeature, name: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="feature-description">Description</Label>
              <Textarea
                id="feature-description"
                placeholder="What does this feature do?"
                value={currentFeature.description}
                onChange={(e) => setCurrentFeature({...currentFeature, description: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="feature-effort">Effort Level</Label>
                <Select
                  value={currentFeature.effort}
                  onValueChange={(value) => setCurrentFeature({
                    ...currentFeature, 
                    effort: value as "Low" | "Medium" | "High"
                  })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select effort level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="feature-impact">Impact Level</Label>
                <Select
                  value={currentFeature.impact}
                  onValueChange={(value) => setCurrentFeature({
                    ...currentFeature, 
                    impact: value as "Low" | "Medium" | "High"
                  })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select impact level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {features.length > 0 && (
              <div>
                <Label htmlFor="feature-dependencies">Dependencies (Optional)</Label>
                <Select
                  value=""
                  onValueChange={(value) => {
                    if (!currentFeature.dependencies.includes(value)) {
                      setCurrentFeature({
                        ...currentFeature,
                        dependencies: [...currentFeature.dependencies, value]
                      });
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select dependencies" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableFeatures.map((feature, index) => (
                      <SelectItem key={index} value={feature}>
                        {feature}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {currentFeature.dependencies.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {currentFeature.dependencies.map((dep, index) => (
                      <div key={index} className="bg-gray-100 px-2 py-1 rounded-md flex items-center text-sm">
                        {dep}
                        <button
                          type="button"
                          className="ml-1 text-gray-500 hover:text-gray-700"
                          onClick={() => {
                            setCurrentFeature({
                              ...currentFeature,
                              dependencies: currentFeature.dependencies.filter(d => d !== dep)
                            });
                          }}
                        >
                          <XIcon className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="button"
            onClick={handleAddFeature}
            disabled={!currentFeature.name.trim()}
            className="w-full flex items-center gap-2"
          >
            <PlusCircleIcon className="h-4 w-4" />
            Add Feature to Roadmap
          </Button>
        </CardFooter>
      </Card>
      
      {/* Features List */}
      {features.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Features ({features.length})</CardTitle>
            <CardDescription>Features to include in your roadmap</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Feature</TableHead>
                  <TableHead>Effort</TableHead>
                  <TableHead>Impact</TableHead>
                  <TableHead>Dependencies</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {features.map((feature) => (
                  <TableRow key={feature.id}>
                    <TableCell className="font-medium">
                      <div>
                        {feature.name}
                        {feature.description && (
                          <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                            {feature.description}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{getEffortBadge(feature.effort)}</TableCell>
                    <TableCell>{getImpactBadge(feature.impact)}</TableCell>
                    <TableCell>
                      {feature.dependencies.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {feature.dependencies.map((dep, idx) => (
                            <span key={idx} className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">
                              {dep}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">None</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveFeature(feature.id)}
                      >
                        <XIcon className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <div className="w-full flex flex-col md:flex-row md:items-center gap-4">
              <div className="w-full md:w-1/3">
                <Label htmlFor="roadmap-timeframe">Roadmap Timeframe</Label>
                <Select
                  value={timeframe}
                  onValueChange={(value) => setTimeframe(value as RoadmapTimeframe)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3-month">3-month Roadmap</SelectItem>
                    <SelectItem value="6-month">6-month Roadmap</SelectItem>
                    <SelectItem value="12-month">12-month Roadmap</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                className="w-full md:w-2/3 flex items-center gap-2"
                onClick={handleGenerateRoadmap}
                disabled={isGenerating || features.length === 0}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating Roadmap...
                  </>
                ) : (
                  <>
                    <CalendarIcon className="h-4 w-4" />
                    Generate {timeframe} Roadmap
                  </>
                )}
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
      
      {/* Generated Roadmap */}
      {roadmap.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Your {timeframe} Product Roadmap</CardTitle>
            <CardDescription>
              AI-generated roadmap based on feature impact, effort, and dependencies
            </CardDescription>
          </CardHeader>
          <CardContent>
            {aiRationale && (
              <div className="mb-6 p-4 bg-muted rounded-md">
                <h3 className="font-medium mb-2">AI Rationale:</h3>
                <p className="text-sm text-muted-foreground whitespace-pre-line">{aiRationale}</p>
              </div>
            )}
            
            <div className="space-y-6">
              {roadmap.map((quarter, quarterIndex) => (
                <div key={quarterIndex} className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-4">
                    {getQuarterIcon(quarterIndex)}
                    <div>
                      <h3 className="font-medium">{quarter.quarter}</h3>
                      <p className="text-sm text-primary">{quarter.theme}</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-3">
                    {quarter.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <div className="flex-shrink-0 bg-primary/10 p-1 rounded-full mt-0.5">
                          <CheckIcon className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="font-medium">{feature.name}</span>
                            <div className="flex gap-1">
                              {getEffortBadge(feature.effort)}
                              {getImpactBadge(feature.impact)}
                            </div>
                          </div>
                          {feature.description && (
                            <p className="text-sm text-muted-foreground">{feature.description}</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              This roadmap is a suggestion based on your inputs. Adapt it to your team's context and business needs.
            </p>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default RoadmapGenerator;
