
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
import { XIcon, PlusCircleIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { FeatureInput } from './types';

interface FeatureFormProps {
  features: FeatureInput[];
  onAddFeature: (feature: Omit<FeatureInput, "id">) => void;
}

const FeatureForm: React.FC<FeatureFormProps> = ({ 
  features,
  onAddFeature
}) => {
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
    
    onAddFeature(currentFeature);
    
    // Reset current feature form
    setCurrentFeature({
      name: "",
      description: "",
      effort: "Medium",
      impact: "Medium",
      dependencies: [],
    });
  };

  return (
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
  );
};

export default FeatureForm;
