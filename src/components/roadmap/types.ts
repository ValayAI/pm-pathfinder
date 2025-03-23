
export type FeatureInput = {
  name: string;
  description: string;
  effort: "Low" | "Medium" | "High";
  impact: "Low" | "Medium" | "High";
  dependencies: string[];
  id: string;
};

export type RoadmapItem = {
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

export type RoadmapTimeframe = "3-month" | "6-month" | "12-month";
