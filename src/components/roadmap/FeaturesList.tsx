
import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { FeatureInput, RoadmapTimeframe } from './types';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FeaturesListProps {
  features: FeatureInput[];
  onRemoveFeature: (id: string) => void;
  timeframe: RoadmapTimeframe;
  onTimeframeChange: (timeframe: RoadmapTimeframe) => void;
  onGenerateRoadmap: () => void;
  isGenerating: boolean;
}

const FeaturesList: React.FC<FeaturesListProps> = ({
  features,
  onRemoveFeature,
  timeframe,
  onTimeframeChange,
  onGenerateRoadmap,
  isGenerating
}) => {
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
                    onClick={() => onRemoveFeature(feature.id)}
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
              onValueChange={(value) => onTimeframeChange(value as RoadmapTimeframe)}
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
            onClick={onGenerateRoadmap}
            disabled={isGenerating || features.length === 0}
          >
            {isGenerating ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Generating Roadmap...
              </>
            ) : (
              <>
                <span className="i-lucide-calendar h-4 w-4" />
                Generate {timeframe} Roadmap
              </>
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default FeaturesList;
