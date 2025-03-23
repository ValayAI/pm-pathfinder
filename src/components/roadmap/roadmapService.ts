
import { handleChatRequest } from "../../api/chat";
import { FeatureInput, RoadmapTimeframe } from "./types";

export const generateRoadmap = async (features: FeatureInput[], timeframe: RoadmapTimeframe) => {
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
          return {
            roadmap: parsedData.quarters,
            rationale
          };
        }
      }
      throw new Error("Could not find JSON in response");
    } catch (parseError) {
      throw new Error("Error parsing JSON from AI response");
    }
  }
  throw new Error("Invalid response format from AI");
};
