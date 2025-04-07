
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, FileText, CheckCircle, Download, ListChecks, Users, Lightbulb, BarChart, Target } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export interface DayPlanModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: "30day" | "60day" | "90day";
}

interface DeliverableItem {
  title: string;
  icon: React.ReactNode;
  description?: string;
}

const DayPlanModal: React.FC<DayPlanModalProps> = ({
  open,
  onOpenChange,
  defaultTab = "30day"
}) => {
  // 30 Day Plan Deliverables
  const thirtyDayDeliverables: DeliverableItem[] = [
    { 
      title: "Stakeholder Map", 
      icon: <Users className="h-4 w-4 text-blue-500" />,
      description: "Document of key stakeholders with communication cadences and preferred channels"
    },
    { 
      title: "Onboarding Notes Summary", 
      icon: <FileText className="h-4 w-4 text-blue-500" />,
      description: "Organized notes from all onboarding meetings and training sessions"
    },
    { 
      title: "Product/Process/People Documentation", 
      icon: <ListChecks className="h-4 w-4 text-blue-500" />,
      description: "Comprehensive overview of current product state, processes, and team structure"
    },
    { 
      title: "Clarification Questions List", 
      icon: <Lightbulb className="h-4 w-4 text-blue-500" />,
      description: "List of follow-up questions to address knowledge gaps"
    }
  ];

  // 60 Day Plan Deliverables
  const sixtyDayDeliverables: DeliverableItem[] = [
    { 
      title: "Opportunity Backlog", 
      icon: <ListChecks className="h-4 w-4 text-indigo-500" />,
      description: "Prioritized list of opportunities with data-backed justifications"
    },
    { 
      title: "Roadmap Alignment Notes", 
      icon: <FileText className="h-4 w-4 text-indigo-500" />,
      description: "Documentation of roadmap discussions and trade-off decisions"
    },
    { 
      title: "Quick Wins Proposal", 
      icon: <Lightbulb className="h-4 w-4 text-indigo-500" />,
      description: "Proposal document: '3 Quick Wins to Improve Product Experience'"
    }
  ];

  // 90 Day Plan Deliverables
  const ninetyDayDeliverables: DeliverableItem[] = [
    { 
      title: "Feature Specification", 
      icon: <FileText className="h-4 w-4 text-purple-500" />,
      description: "Complete feature spec and release notes for your first shipped feature"
    },
    { 
      title: "Performance Dashboard", 
      icon: <BarChart className="h-4 w-4 text-purple-500" />,
      description: "Metrics dashboard or Miro summary showcasing impact of your initiatives"
    },
    { 
      title: "Vision Document", 
      icon: <Target className="h-4 w-4 text-purple-500" />,
      description: "Long-term product vision document or presentation for roadmap planning"
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md md:max-w-3xl lg:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">30-60-90 Day Plan for Product Managers</DialogTitle>
          <DialogDescription>
            A structured approach to onboarding in your new product management role
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue={defaultTab} className="mt-2">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="30day" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>First 30 Days</span>
            </TabsTrigger>
            <TabsTrigger value="60day" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Days 31-60</span>
            </TabsTrigger>
            <TabsTrigger value="90day" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Days 61-90</span>
            </TabsTrigger>
          </TabsList>
          
          {/* 30 Day Plan Content */}
          <TabsContent value="30day" className="space-y-4 mt-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-800">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                  Phase One
                </Badge>
                <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-300">Learning & Discovery</h3>
              </div>
              <p className="text-muted-foreground mb-2">
                <strong>Goal:</strong> Understand the product, people, and processes.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Focus Areas
              </h4>
              
              <div className="space-y-3 ml-7">
                <div className="border-l-2 border-blue-300 dark:border-blue-700 pl-4 py-1">
                  <h5 className="font-medium">Meet Key Stakeholders</h5>
                  <p className="text-muted-foreground text-sm">
                    Schedule 1:1s with Engineering, Design, Marketing, Sales, Support. Build trust and listen more than you speak.
                  </p>
                </div>
                
                <div className="border-l-2 border-blue-300 dark:border-blue-700 pl-4 py-1">
                  <h5 className="font-medium">Review Product Documentation</h5>
                  <p className="text-muted-foreground text-sm">
                    Study PRDs, product specs, roadmap, backlog, and company vision.
                  </p>
                </div>
                
                <div className="border-l-2 border-blue-300 dark:border-blue-700 pl-4 py-1">
                  <h5 className="font-medium">Understand Current Metrics</h5>
                  <p className="text-muted-foreground text-sm">
                    Review dashboards for activation, retention, NPS, churn. Ask questions about how success is measured.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Deliverables
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {thirtyDayDeliverables.map((item, index) => (
                  <Card key={index} className="border-blue-100 dark:border-blue-900">
                    <CardContent className="p-4 flex items-start gap-3">
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-md mt-0.5">
                        {item.icon}
                      </div>
                      <div>
                        <h5 className="font-medium">{item.title}</h5>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/10 rounded-lg p-4 border border-blue-100 dark:border-blue-800">
              <h4 className="text-md font-medium mb-2">Pro Tips:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>Take more notes than you think you need - they'll be valuable reference points later</li>
                <li>Ask "why" often, but tactfully</li>
                <li>Identify who the product champions and detractors are</li>
                <li>Understand the history of key product decisions</li>
              </ul>
            </div>
          </TabsContent>
          
          {/* 60 Day Plan Content */}
          <TabsContent value="60day" className="space-y-4 mt-4">
            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4 border border-indigo-100 dark:border-indigo-800">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800">
                  Phase Two
                </Badge>
                <h3 className="text-xl font-semibold text-indigo-800 dark:text-indigo-300">Strategic Planning</h3>
              </div>
              <p className="text-muted-foreground mb-2">
                <strong>Goal:</strong> Identify opportunities, form hypotheses, and shape your product point of view.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Focus Areas
              </h4>
              
              <div className="space-y-3 ml-7">
                <div className="border-l-2 border-indigo-300 dark:border-indigo-700 pl-4 py-1">
                  <h5 className="font-medium">Identify Opportunity Areas</h5>
                  <p className="text-muted-foreground text-sm">
                    Analyze user feedback, support tickets, product data, and internal feedback.
                  </p>
                </div>
                
                <div className="border-l-2 border-indigo-300 dark:border-indigo-700 pl-4 py-1">
                  <h5 className="font-medium">Collaborate on Roadmap Planning</h5>
                  <p className="text-muted-foreground text-sm">
                    Join or co-lead roadmap discussions. Learn prioritization mechanics and contribute ideas.
                  </p>
                </div>
                
                <div className="border-l-2 border-indigo-300 dark:border-indigo-700 pl-4 py-1">
                  <h5 className="font-medium">Propose Initial Improvements</h5>
                  <p className="text-muted-foreground text-sm">
                    Suggest 1–2 quick wins or process enhancements to gain momentum.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Deliverables
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sixtyDayDeliverables.map((item, index) => (
                  <Card key={index} className="border-indigo-100 dark:border-indigo-900">
                    <CardContent className="p-4 flex items-start gap-3">
                      <div className="bg-indigo-50 dark:bg-indigo-900/20 p-2 rounded-md mt-0.5">
                        {item.icon}
                      </div>
                      <div>
                        <h5 className="font-medium">{item.title}</h5>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <div className="bg-indigo-50 dark:bg-indigo-900/10 rounded-lg p-4 border border-indigo-100 dark:border-indigo-800">
              <h4 className="text-md font-medium mb-2">Pro Tips:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>Balance quick wins with strategic initiatives</li>
                <li>Start building a data-informed culture if one doesn't exist</li>
                <li>Create opportunity scoring frameworks to justify your recommendations</li>
                <li>Document decisions and the reasoning behind them</li>
              </ul>
            </div>
          </TabsContent>
          
          {/* 90 Day Plan Content */}
          <TabsContent value="90day" className="space-y-4 mt-4">
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-100 dark:border-purple-800">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800">
                  Phase Three
                </Badge>
                <h3 className="text-xl font-semibold text-purple-800 dark:text-purple-300">Execution & Impact</h3>
              </div>
              <p className="text-muted-foreground mb-2">
                <strong>Goal:</strong> Deliver measurable results, lead a product initiative, and set a long-term vision.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Focus Areas
              </h4>
              
              <div className="space-y-3 ml-7">
                <div className="border-l-2 border-purple-300 dark:border-purple-700 pl-4 py-1">
                  <h5 className="font-medium">Lead Feature Development</h5>
                  <p className="text-muted-foreground text-sm">
                    Own a scoped feature through design, dev, and release.
                  </p>
                </div>
                
                <div className="border-l-2 border-purple-300 dark:border-purple-700 pl-4 py-1">
                  <h5 className="font-medium">Analyze & Share Initial Results</h5>
                  <p className="text-muted-foreground text-sm">
                    Track performance, gather early feedback, and share learnings with your team.
                  </p>
                </div>
                
                <div className="border-l-2 border-purple-300 dark:border-purple-700 pl-4 py-1">
                  <h5 className="font-medium">Establish Long-Term Vision</h5>
                  <p className="text-muted-foreground text-sm">
                    Create a high-level product vision and contribution map for your area.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Deliverables
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ninetyDayDeliverables.map((item, index) => (
                  <Card key={index} className="border-purple-100 dark:border-purple-900">
                    <CardContent className="p-4 flex items-start gap-3">
                      <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded-md mt-0.5">
                        {item.icon}
                      </div>
                      <div>
                        <h5 className="font-medium">{item.title}</h5>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/10 rounded-lg p-4 border border-purple-100 dark:border-purple-800">
              <h4 className="text-md font-medium mb-2">Pro Tips:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>Document learnings from your first feature release</li>
                <li>Create a narrative around your vision that ties to company objectives</li>
                <li>Build a feedback loop with key stakeholders</li>
                <li>Identify metrics that will demonstrate your long-term impact</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="flex-col sm:flex-row gap-3 pt-4 border-t mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="sm:w-auto w-full">
            Close
          </Button>
          <Button className="sm:w-auto w-full flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download Complete Plan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DayPlanModal;
