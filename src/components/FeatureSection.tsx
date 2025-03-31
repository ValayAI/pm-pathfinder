
import { cn } from "@/lib/utils";
import { 
  MessageSquareText, Lightbulb, Compass, BarChart3, Target, Award, Sparkles
} from "lucide-react";
import { ContainerScroll } from "./ContainerScroll";

export function FeatureSection() {
  const features = [
    {
      title: "AI PM Assistant",
      description: "Get instant answers to your product management questions from our AI-powered assistant.",
      icon: <MessageSquareText className="h-5 w-5" />,
      color: "blue"
    },
    {
      title: "Framework Library",
      description: "Access proven PM frameworks for prioritization, roadmapping, and decision-making.",
      icon: <Compass className="h-5 w-5" />,
      color: "indigo"
    },
    {
      title: "Career Insights",
      description: "Actionable career advice to help you advance your PM journey from junior to executive roles.",
      icon: <Award className="h-5 w-5" />,
      color: "purple"
    },
    {
      title: "Interview Prep",
      description: "Prepare for PM interviews with guided practice questions and expert feedback.",
      icon: <Lightbulb className="h-5 w-5" />,
      color: "amber"
    },
    {
      title: "Metrics Guide",
      description: "Learn how to define, track, and analyze the right metrics for product success.",
      icon: <BarChart3 className="h-5 w-5" />,
      color: "green"
    },
    {
      title: "Goal Setting",
      description: "Techniques for setting effective product goals that align with business objectives.",
      icon: <Target className="h-5 w-5" />,
      color: "red"
    },
  ];
  
  const getColorClass = (color: string) => {
    const colorMap = {
      blue: "bg-blue-100/70 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
      indigo: "bg-indigo-100/70 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400",
      purple: "bg-purple-100/70 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
      amber: "bg-amber-100/70 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
      green: "bg-green-100/70 text-green-600 dark:bg-green-900/30 dark:text-green-400",
      red: "bg-red-100/70 text-red-600 dark:bg-red-900/30 dark:text-red-400",
    };
    
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };
  
  const getBorderColor = (color: string) => {
    const colorMap = {
      blue: "border-blue-200/50 dark:border-blue-800/30 hover:border-blue-300 dark:hover:border-blue-700",
      indigo: "border-indigo-200/50 dark:border-indigo-800/30 hover:border-indigo-300 dark:hover:border-indigo-700",
      purple: "border-purple-200/50 dark:border-purple-800/30 hover:border-purple-300 dark:hover:border-purple-700",
      amber: "border-amber-200/50 dark:border-amber-800/30 hover:border-amber-300 dark:hover:border-amber-700",
      green: "border-green-200/50 dark:border-green-800/30 hover:border-green-300 dark:hover:border-green-700",
      red: "border-red-200/50 dark:border-red-800/30 hover:border-red-300 dark:hover:border-red-700",
    };
    
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };
  
  const FeatureTitle = (
    <div className="mb-10">
      <div className="flex justify-center mb-4">
        <div className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300 shadow-sm border border-indigo-100/80 dark:border-indigo-800/30">
          <Sparkles className="mr-1.5 h-3.5 w-3.5 text-amber-500" />
          <span>Powerful PM Tools</span>
        </div>
      </div>
      <h2 className="text-2xl sm:text-3xl font-outfit font-bold text-center bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
        Everything You Need to Excel in Product Management
      </h2>
      <p className="mt-3 text-base text-muted-foreground max-w-xl mx-auto text-center">
        Simple, powerful tools and resources to help you become a better product manager
      </p>
    </div>
  );
  
  return (
    <section id="feature-section" className="relative py-16 bg-gradient-to-b from-blue-50/50 to-white dark:from-blue-950/10 dark:to-gray-900">
      <ContainerScroll titleComponent={FeatureTitle}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 h-full overflow-y-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={cn(
                "bg-white/80 dark:bg-gray-800/40 rounded-xl p-6 shadow-sm hover-lift transition-all border",
                getBorderColor(feature.color)
              )}
            >
              <div className={cn(
                "h-10 w-10 rounded-lg flex items-center justify-center mb-4",
                getColorClass(feature.color)
              )}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </ContainerScroll>
    </section>
  );
}

export default FeatureSection;
