
import { cn } from "@/lib/utils";
import { 
  MessageSquareText, Lightbulb, Compass, BarChart3, Target, Award
} from "lucide-react";
import { ContainerScroll } from "./ContainerScroll";

export function FeatureSection() {
  const features = [
    {
      title: "AI PM Assistant",
      description: "Get instant answers to your product management questions from our AI-powered assistant.",
      icon: <MessageSquareText className="h-4 w-4" />
    },
    {
      title: "Framework Library",
      description: "Access proven PM frameworks for prioritization, roadmapping, and decision-making.",
      icon: <Compass className="h-4 w-4" />
    },
    {
      title: "Career Insights",
      description: "Actionable career advice to help you advance your PM journey from junior to executive roles.",
      icon: <Award className="h-4 w-4" />
    },
    {
      title: "Interview Prep",
      description: "Prepare for PM interviews with guided practice questions and expert feedback.",
      icon: <Lightbulb className="h-4 w-4" />
    },
    {
      title: "Metrics Guide",
      description: "Learn how to define, track, and analyze the right metrics for product success.",
      icon: <BarChart3 className="h-4 w-4" />
    },
    {
      title: "Goal Setting",
      description: "Techniques for setting effective product goals that align with business objectives.",
      icon: <Target className="h-4 w-4" />
    },
  ];
  
  const FeatureTitle = (
    <div className="mb-10">
      <h2 className="text-xl sm:text-2xl font-outfit font-semibold text-center">
        Everything You Need to Excel in Product Management
      </h2>
      <p className="mt-2 text-sm text-muted-foreground max-w-xl mx-auto text-center">
        Simple, powerful tools and resources to help you become a better product manager
      </p>
    </div>
  );
  
  return (
    <section id="feature-section" className="relative bg-muted/30">
      <ContainerScroll titleComponent={FeatureTitle}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 h-full overflow-y-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-card rounded-lg p-5 shadow-soft hover-lift border border-border/40 transition-all"
            >
              <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center text-primary mb-3">
                {feature.icon}
              </div>
              <h3 className="text-base font-medium mb-1">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </ContainerScroll>
    </section>
  );
}

export default FeatureSection;
