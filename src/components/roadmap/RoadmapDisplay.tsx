
import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { CheckIcon, CalendarIcon, ZapIcon, TimerIcon } from "lucide-react";
import { RoadmapItem, RoadmapTimeframe } from './types';

interface RoadmapDisplayProps {
  roadmap: RoadmapItem[];
  aiRationale: string;
  timeframe: RoadmapTimeframe;
}

const RoadmapDisplay: React.FC<RoadmapDisplayProps> = ({
  roadmap,
  aiRationale,
  timeframe
}) => {
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
  );
};

export default RoadmapDisplay;
