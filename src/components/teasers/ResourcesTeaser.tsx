
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Lock, Eye, ArrowRight, CheckCircle, BookOpen, Video, Download, Target, Brain, LineChart, MessageSquare, Users, Code } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import ResourcePreviewModal from '../modals/ResourcePreviewModal';

interface ResourceItem {
  title: string;
  type: string;
  description: string;
  icon: JSX.Element;
  previewContent: string;
  fullContent: string;
}

const ResourcesTeaser = () => {
  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  
  const openPreview = (resource: ResourceItem) => {
    setSelectedResource(resource);
    setPreviewOpen(true);
  };

  // Essential resources
  const essentialResources: ResourceItem[] = [
    {
      title: "How to Write a Killer PRD",
      type: "Template",
      description: "A comprehensive template for creating effective product requirement documents",
      icon: <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
      previewContent: "A great PRD clearly defines the problem, success metrics, and required functionality. The key is to be concise yet thorough...",
      fullContent: "A great PRD clearly defines the problem, success metrics, and required functionality. The key is to be concise yet thorough.\n\nStart with a compelling problem statement that explains the customer pain point you're solving. Then define clear success metrics that align with business goals. Your PRD should include:\n\nUser personas and journeys\nFeature requirements (must-haves vs nice-to-haves)\nTechnical considerations\nEdge cases and constraints\n\nKeep your language simple and avoid jargon. Use visuals wherever possible - wireframes, user flows, and diagrams help communicate your vision.\n\nRegularly review and iterate on your PRD as you gather feedback from stakeholders. Remember that the document is a living artifact that should evolve with your understanding of the problem.\n\nEffective PRDs also anticipate questions and objections from engineering, design, and business teams. Address these proactively by including sections on risk assessment and mitigation strategies.\n\nFinally, make sure your PRD is accessible to everyone who needs it. Store it in a central location and send updates when significant changes are made."
    },
    {
      title: "Top PM Interview Questions",
      type: "Guide",
      description: "Prepare for your product management interviews with these common questions",
      icon: <BookOpen className="h-5 w-5 text-purple-600 dark:text-purple-400" />,
      previewContent: "For \"Tell me about a time you failed\" questions, use the STAR method and focus on what you learned...",
      fullContent: "For \"Tell me about a time you failed\" questions, use the STAR method and focus on what you learned.\n\nCommon PM interview questions include:\n\nHow would you improve our product?\nHow do you prioritize features?\nTell me about a product you launched\nHow would you design X for Y?\n\nFor each question, we provide frameworks, examples, and tips from PMs who have successfully interviewed at FAANG companies.\n\nPractice articulating your thoughts clearly and concisely. Interviewers are evaluating not just what you say, but how well you communicate complex ideas.\n\nWhen discussing past projects, focus on your specific contributions and the impact of your work. Use metrics whenever possible to quantify success.\n\nBe prepared to whiteboard solutions during technical interviews. Practice sketching user flows, system architectures, and data models before your interview.\n\nAlways research the company's products thoroughly before your interview. Come prepared with thoughtful questions about their strategy, challenges, and opportunities."
    }
  ];
  
  // Discovery resources
  const discoveryResources: ResourceItem[] = [
    {
      title: "User Interview Playbook",
      type: "Guide",
      description: "Learn how to conduct effective user interviews to gather valuable insights",
      icon: <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
      previewContent: "Effective user interviews start with creating a comfortable environment for honest feedback. Begin with easy, open-ended questions...",
      fullContent: "Effective user interviews start with creating a comfortable environment for honest feedback. Begin with easy, open-ended questions before diving into specific product areas. Remember that your goal is to understand user problems, not validate your solutions.\n\nKey techniques include:\n\nAsk 'why' five times to get to the root cause\nUse silence strategically to encourage elaboration\nAvoid leading questions that suggest answers\n\nPreparing for user interviews is as important as conducting them. Create an interview guide with clear objectives and questions, but be willing to go off-script when interesting insights emerge.\n\nAlways record interviews (with permission) so you can focus on listening rather than note-taking. Review recordings later to identify patterns and insights you might have missed.\n\nAfter each interview, take time to document key findings and share them with your team. Look for recurring themes across multiple interviews before drawing conclusions."
    },
    {
      title: "Jobs-to-be-Done Framework",
      type: "Template",
      description: "Learn how to use JTBD to uncover your customers' true motivations",
      icon: <Target className="h-5 w-5 text-purple-600 dark:text-purple-400" />,
      previewContent: "The Jobs-to-be-Done framework focuses on understanding what 'job' customers are 'hiring' your product to do...",
      fullContent: "The Jobs-to-be-Done framework focuses on understanding what 'job' customers are 'hiring' your product to do. This perspective helps you build features that directly address user needs rather than chasing competitor features.\n\nThis comprehensive guide covers:\n\nCore JTBD theory and principles\nHow to identify functional, emotional and social jobs\nJTBD interview techniques and questions\n\nProduct managers who master JTBD can significantly improve feature prioritization by focusing on the most important jobs users need to accomplish. This leads to higher user satisfaction and retention.\n\nImplementing JTBD in your product development process starts with customer research. Conduct interviews focused on understanding the progress customers are trying to make in their lives.\n\nOnce you've identified key jobs, create job statements that clearly articulate what users are trying to accomplish. These statements should include the context, motivation, and desired outcome."
    }
  ];
  
  // Collaboration resources
  const collaborationResources: ResourceItem[] = [
    {
      title: "Product Metrics Guide",
      type: "Guide",
      description: "Key metrics every product manager should track for success",
      icon: <LineChart className="h-5 w-5 text-green-600 dark:text-green-400" />,
      previewContent: "Choosing the right metrics is critical for product success. This guide explains the difference between vanity metrics and actionable metrics...",
      fullContent: "Choosing the right metrics is critical for product success. This guide explains the difference between vanity metrics and actionable metrics, and walks through the key metrics for different product types - from SaaS platforms to mobile apps to e-commerce products.\n\nFor each product category, we cover:\n\nAcquisition metrics: CAC, conversion rates, channel effectiveness\nEngagement metrics: DAU/MAU, session length, feature adoption\nRetention metrics: churn rate, renewal rate, lifetime value\n\nThe most successful product managers don't just track metrics - they tell compelling stories with data. Learn how to create dashboards and reports that drive action and align teams around common goals.\n\nAvoid the common pitfall of tracking too many metrics. Instead, identify 3-5 key metrics that directly relate to your product strategy and business model.\n\nRegularly review your metrics framework as your product evolves. What worked for your MVP might not be appropriate for a mature product with an established user base."
    },
    {
      title: "Cross-Functional Collaboration Playbook",
      type: "Template",
      description: "Strategies for effective collaboration across product, design, and engineering teams",
      icon: <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
      previewContent: "Strong cross-functional collaboration is essential for product success. This playbook provides frameworks, rituals, and tools...",
      fullContent: "Strong cross-functional collaboration is essential for product success. This playbook provides frameworks, rituals, and tools to improve how product, design, and engineering teams work together.\n\nThe playbook covers:\n\nTeam structure and roles/responsibilities\nDecision frameworks (RACI, RAPID, etc.)\nEffective meeting patterns and rituals\nTools and documentation standards\n\nSuccessful product teams establish clear communication protocols and shared understanding of product goals and constraints. This playbook will help you create alignment across disciplines.\n\nLearn how to run collaborative workshops that leverage the unique perspectives of product, design, and engineering to solve complex problems and generate innovative solutions.\n\nThe most effective product teams have clearly defined ways of working that respect each discipline's process while maintaining overall product momentum. We'll show you how to balance autonomy and collaboration effectively."
    }
  ];

  const renderResourceCard = (resource: ResourceItem) => {
    return (
      <Card className="overflow-hidden hover:shadow-md transition-all hover:scale-[1.01] duration-300 border">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
              {resource.icon}
            </div>
            <Badge variant="outline">{resource.type}</Badge>
          </div>
          <CardTitle className="mt-4">{resource.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-2">
            <Badge variant="secondary" className="text-xs mb-2">Free Preview</Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            {resource.description}
          </p>
          <div className="relative">
            <div className="bg-gradient-to-b from-transparent to-background h-16 absolute bottom-0 left-0 right-0"></div>
            <div className="opacity-20 pointer-events-none blur-[2px] text-sm text-muted-foreground">
              <p>{resource.previewContent}</p>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 flex items-center justify-center gap-1"
              onClick={() => openPreview(resource)}
            >
              <Eye className="h-3.5 w-3.5 mr-1" /> Preview
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 flex items-center justify-center gap-1" 
              disabled
            >
              <Lock className="h-3.5 w-3.5 mr-1" /> Full Guide
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <div className="text-center mb-10 mt-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Product Management Resources
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Access templates, frameworks, guides and more to excel as a Product Manager
        </p>
        <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 mx-auto mt-6 rounded-full"></div>
      </div>

      <Tabs defaultValue="essential" className="w-full mb-8">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-6">
          <TabsTrigger value="essential">Essential</TabsTrigger>
          <TabsTrigger value="discovery">Discovery</TabsTrigger>
          <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
        </TabsList>
        
        <TabsContent value="essential">
          <div className="grid gap-6 md:grid-cols-2 mb-12">
            {essentialResources.map((resource, index) => renderResourceCard(resource))}
          </div>
        </TabsContent>
        
        <TabsContent value="discovery">
          <div className="grid gap-6 md:grid-cols-2 mb-12">
            {discoveryResources.map((resource, index) => renderResourceCard(resource))}
          </div>
        </TabsContent>
        
        <TabsContent value="collaboration">
          <div className="grid gap-6 md:grid-cols-2 mb-12">
            {collaborationResources.map((resource, index) => renderResourceCard(resource))}
          </div>
        </TabsContent>
      </Tabs>
      
      <Card className="mb-8 bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20">
        <CardContent className="p-6">
          <h3 className="text-lg font-bold mb-3">Unlock our complete resource library</h3>
          <ul className="space-y-2 mb-4">
            <li className="flex items-center">
              <CheckCircle className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm">30+ frameworks and templates</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm">Resume templates and examples</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm">Product strategy playbooks</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm">Interview preparation guides</span>
            </li>
          </ul>
        </CardContent>
        <CardFooter className="bg-muted/30 p-4 border-t">
          <p className="text-sm text-muted-foreground">
            Create your free account to unlock all features
          </p>
        </CardFooter>
      </Card>
      
      <div className="flex justify-center mt-8 border-t pt-6">
        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <Link to="/signin">Sign In</Link>
          </Button>
          <Button asChild>
            <Link to="/signup" className="flex items-center gap-1">
              Access All Resources <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>

      {/* ResourcePreviewModal */}
      <ResourcePreviewModal
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        title={selectedResource?.title || ""}
        type={selectedResource?.type || ""}
        previewContent={selectedResource?.previewContent || ""}
        content={selectedResource?.fullContent || ""}
      />
    </div>
  );
};

export default ResourcesTeaser;
