
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EmailSignup from "../components/EmailSignup";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, Video, Download, Eye, Wand2, Calendar, DollarSign, Sparkles, BookMarked, Brain, Code, Target, MessageSquare, LineChart, Users } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import ResourcesTeaser from "@/components/teasers/ResourcesTeaser";
import { Badge } from "@/components/ui/badge";
import ResourcePreviewModal from "@/components/modals/ResourcePreviewModal";
import DayPlanModal from "@/components/modals/DayPlanModal";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ResourceItem {
  title: string;
  type: string;
  description: string;
  icon: JSX.Element;
  showSampleGenerate?: boolean;
  action?: string;
  previewContent: string;
  fullContent: string;
}

const Resources = () => {
  const { user } = useAuth();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null);
  const [dayPlanOpen, setDayPlanOpen] = useState(false);
  const [selectedDayPlan, setSelectedDayPlan] = useState<"30day" | "60day" | "90day">("30day");
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);
  
  const openPreview = (resource: ResourceItem) => {
    setSelectedResource(resource);
    setPreviewOpen(true);
  };

  const openDayPlanModal = (plan: "30day" | "60day" | "90day") => {
    setSelectedDayPlan(plan);
    setDayPlanOpen(true);
  };
  
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 pt-24 md:pt-28 pb-12">
          <ResourcesTeaser />
        </main>
        <Footer />
      </div>
    );
  }

  // Main resources
  const resources: ResourceItem[] = [
    {
      title: "Product Requirement Document Template",
      type: "Template",
      description: "A comprehensive PRD template to define product features and requirements",
      icon: <FileText className="h-8 w-8 text-primary" />,
      showSampleGenerate: true,
      previewContent: "A great PRD clearly defines the problem, success metrics, and required functionality. The key is to be concise yet thorough. Start with a compelling problem statement that explains the customer pain point you're solving. Then define clear success metrics that align with business goals.",
      fullContent: "Start with a compelling problem statement that explains the customer pain point you're solving. Then define clear success metrics that align with business goals. Your PRD should include:\n\nUser personas and journeys\nFeature requirements (must-haves vs nice-to-haves)\nTechnical considerations\nEdge cases and constraints\nDesign guidelines\n\nWhen writing your PRD, focus on the 'what' and 'why', not the 'how'. Engineering will figure out implementation details. Keep your language simple and avoid jargon. Use visuals wherever possible - wireframes, user flows, and diagrams help communicate your vision."
    },
    {
      title: "User Interview Playbook",
      type: "Guide",
      description: "Learn how to conduct effective user interviews to gather valuable insights",
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      action: "Read Guide",
      previewContent: "Effective user interviews start with creating a comfortable environment for honest feedback. Begin with easy, open-ended questions before diving into specific product areas. Remember that your goal is to understand user problems, not validate your solutions.",
      fullContent: "Effective user interviews start with creating a comfortable environment for honest feedback. Begin with easy, open-ended questions before diving into specific product areas. Remember that your goal is to understand user problems, not validate your solutions.\n\nKey techniques include:\n\nAsk 'why' five times to get to the root cause\nUse silence strategically to encourage elaboration\nAvoid leading questions that suggest answers\nListen for emotions and pain points, not feature requests\nLook for behavioral patterns across multiple interviews\n\nAfter each interview, document insights immediately while they're fresh. Look for patterns across interviews rather than acting on feedback from a single user."
    },
    {
      title: "Product Strategy Workshop",
      type: "Video",
      description: "A 45-minute workshop on building effective product strategies",
      icon: <Video className="h-8 w-8 text-primary" />,
      action: "Watch Now",
      previewContent: "This workshop walks through the key components of an effective product strategy. We'll cover how to align your product vision with company goals, identify your unique value proposition, and create a roadmap that balances business needs with user problems.",
      fullContent: "This workshop walks through the key components of an effective product strategy. We'll cover how to align your product vision with company goals, identify your unique value proposition, and create a roadmap that balances business needs with user problems.\n\nThe workshop includes frameworks for:\n\nDefining your product vision and mission\nIdentifying your target users and their jobs-to-be-done\nMapping your competitive landscape\nPrioritizing features using evidence-based methods\nCommunicating your strategy to stakeholders\n\nBy the end of this workshop, you'll have a template for creating compelling product strategies that win executive support and guide your team's execution."
    },
    {
      title: "Competitive Analysis Framework",
      type: "Template",
      description: "Template for analyzing competitors and identifying market opportunities",
      icon: <FileText className="h-8 w-8 text-primary" />,
      action: "Download",
      previewContent: "A thorough competitive analysis helps you understand market dynamics and identify opportunities. This framework provides a structured approach to evaluating direct and indirect competitors across multiple dimensions - from feature sets to pricing models to marketing positioning.",
      fullContent: "A thorough competitive analysis helps you understand market dynamics and identify opportunities. This framework provides a structured approach to evaluating direct and indirect competitors across multiple dimensions - from feature sets to pricing models to marketing positioning.\n\nThe template includes sections for:\n\nCompetitor profiles and company information\nProduct capabilities comparison matrix\nPricing model analysis\nStrengths and weaknesses assessment\nMarket positioning map\nCustomer sentiment analysis\n\nBy regularly updating your competitive analysis, you can identify emerging trends, anticipate competitor moves, and adjust your product strategy accordingly."
    },
    {
      title: "Product Metrics Guide",
      type: "Guide",
      description: "Key metrics every product manager should track for success",
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      action: "Read Guide",
      previewContent: "Choosing the right metrics is critical for product success. This guide explains the difference between vanity metrics and actionable metrics, and walks through the key metrics for different product types - from SaaS platforms to mobile apps to e-commerce products.",
      fullContent: "Choosing the right metrics is critical for product success. This guide explains the difference between vanity metrics and actionable metrics, and walks through the key metrics for different product types - from SaaS platforms to mobile apps to e-commerce products.\n\nFor each product category, we cover:\n\nAcquisition metrics: CAC, conversion rates, channel effectiveness\nEngagement metrics: DAU/MAU, session length, feature adoption\nRetention metrics: churn rate, renewal rate, lifetime value\nRevenue metrics: ARPU, expansion revenue, payment failure rate\n\nWe also provide guidance on setting up your analytics infrastructure, creating dashboards, and fostering a data-informed culture within your organization."
    },
    {
      title: "A/B Testing Methodology",
      type: "Template",
      description: "Step-by-step process for effective A/B testing of product features",
      icon: <Download className="h-8 w-8 text-primary" />,
      action: "Download",
      previewContent: "Successful A/B testing requires a methodical approach. This template guides you through the entire process - from forming hypotheses to analyzing results to implementing winners. It helps you avoid common pitfalls like testing too many variables or stopping tests too early.",
      fullContent: "Successful A/B testing requires a methodical approach. This template guides you through the entire process - from forming hypotheses to analyzing results to implementing winners. It helps you avoid common pitfalls like testing too many variables or stopping tests too early.\n\nThe template includes:\n\nHypothesis formation worksheet\nSample size calculator\nTest duration estimator\nStatistical significance explainer\nCommon A/B testing pitfalls and how to avoid them\nImplementation checklist\n\nBy following this structured approach, you'll ensure your A/B tests provide reliable insights that lead to meaningful product improvements rather than chasing random fluctuations in the data."
    },
  ];
  
  // Product Discovery resources
  const discoveryResources: ResourceItem[] = [
    {
      title: "Customer Journey Mapping",
      type: "Template",
      description: "Create detailed customer journey maps to identify pain points and opportunities",
      icon: <Users className="h-8 w-8 text-primary" />,
      action: "Download",
      previewContent: "Customer journey maps visualize the entire user experience with your product or service. This template helps you document each touchpoint and identify opportunities to improve the customer experience.",
      fullContent: "Customer journey maps visualize the entire user experience with your product or service. This template helps you document each touchpoint and identify opportunities to improve the customer experience.\n\nThe template includes sections for:\n\nUser personas and scenarios\nTouchpoints and channels\nUser actions, thoughts, and emotions\nPain points and friction areas\nOpportunity identification\nPrioritization framework\n\nBy mapping the complete customer journey, you can identify moments that matter most to users and focus your product improvements where they'll have the greatest impact. This exercise is particularly valuable when done collaboratively with cross-functional teams."
    },
    {
      title: "Jobs-to-be-Done Framework",
      type: "Guide",
      description: "Learn how to use JTBD to uncover your customers' true motivations",
      icon: <Target className="h-8 w-8 text-primary" />,
      action: "Read Guide",
      previewContent: "The Jobs-to-be-Done framework focuses on understanding what 'job' customers are 'hiring' your product to do. This perspective helps you build features that directly address user needs rather than chasing competitor features.",
      fullContent: "The Jobs-to-be-Done framework focuses on understanding what 'job' customers are 'hiring' your product to do. This perspective helps you build features that directly address user needs rather than chasing competitor features.\n\nThis comprehensive guide covers:\n\nCore JTBD theory and principles\nHow to identify functional, emotional and social jobs\nJTBD interview techniques and questions\nTranslating jobs into product requirements\nUsing JTBD for marketing and positioning\n\nBy understanding the progress your customers are trying to make in particular circumstances, you can design solutions that meet their needs better than alternatives and command premium pricing."
    },
    {
      title: "User Research Planning Kit",
      type: "Template",
      description: "Templates and checklists for planning effective user research sessions",
      icon: <Brain className="h-8 w-8 text-primary" />,
      showSampleGenerate: true,
      previewContent: "Effective user research starts with proper planning. This kit includes everything you need to plan, execute, and synthesize findings from user research sessions - from screeners to interview guides to analysis templates.",
      fullContent: "Effective user research starts with proper planning. This kit includes everything you need to plan, execute, and synthesize findings from user research sessions.\n\nThe kit includes:\n\nResearch planning worksheet\nParticipant screener templates\nRecruitment email templates\nDiscovery interview script templates\nUsability testing guides\nResearch synthesis frameworks\nStakeholder presentation template\n\nThese resources help ensure your research is focused on answering key questions, participants are properly screened, sessions run smoothly, and insights are effectively communicated to stakeholders and translated into action."
    },
    {
      title: "Opportunity Solution Trees",
      type: "Guide",
      description: "Visual framework for connecting user needs to potential solutions",
      icon: <LineChart className="h-8 w-8 text-primary" />,
      action: "Read Guide",
      previewContent: "Opportunity Solution Trees help you visually connect business objectives to user needs and potential solutions. This framework ensures you're exploring multiple solutions to each opportunity while staying focused on outcomes.",
      fullContent: "Opportunity Solution Trees help you visually connect business objectives to user needs and potential solutions. This framework ensures you're exploring multiple solutions to each opportunity while staying focused on outcomes.\n\nThis guide covers:\n\nHow to structure your tree (desired outcome → opportunities → solutions → experiments)\nFacilitating collaborative OST workshops\nBalancing divergent and convergent thinking\nUsing the framework for continuous discovery\nMaking evidence-based decisions using the OST\n\nBy visualizing your thinking in this way, you can ensure your team explores sufficient solution options for each critical user need while maintaining clear line-of-sight to business objectives."
    }
  ];
  
  // Collaboration & Communication resources
  const communicationResources: ResourceItem[] = [
    {
      title: "Product Presentation Templates",
      type: "Template",
      description: "Professional presentation templates for product reviews and roadmap presentations",
      icon: <FileText className="h-8 w-8 text-primary" />,
      showSampleGenerate: true,
      previewContent: "These professionally designed presentation templates help you effectively communicate product strategy, roadmaps, and feature launches to executives, stakeholders, and team members.",
      fullContent: "These professionally designed presentation templates help you effectively communicate product strategy, roadmaps, and feature launches to executives, stakeholders, and team members.\n\nThe bundle includes templates for:\n\nQuarterly business reviews\nProduct roadmap presentations\nFeature launch decks\nUser research findings\nCompetitive analysis\nMetrics dashboards\n\nEach template includes example slides, suggested talking points, and visualization ideas to help communicate complex product concepts clearly. These templates save time while ensuring you present information in a structured, visually appealing way that drives alignment and decision-making."
    },
    {
      title: "Stakeholder Communication Guide",
      type: "Guide",
      description: "Strategies for effective communication with different stakeholder groups",
      icon: <MessageSquare className="h-8 w-8 text-primary" />,
      action: "Read Guide",
      previewContent: "Different stakeholders need different types of communication. This guide helps you tailor your communication style and content for executives, engineers, designers, sales, and other key stakeholders to build trust and alignment.",
      fullContent: "Different stakeholders need different types of communication. This guide helps you tailor your communication style and content for executives, engineers, designers, sales, and other key stakeholders to build trust and alignment.\n\nFor each stakeholder group, we cover:\n\nKey motivations and concerns\nPreferred communication channels and frequency\nLevel of detail required\nHow to frame discussions and decisions\nCommon pitfalls and how to avoid them\n\nThe guide also includes templates for status updates, decision memos, and meeting agendas customized for different audiences. By adapting your communication to each stakeholder's needs, you'll build stronger relationships and drive better product outcomes."
    },
    {
      title: "Product Requirements API Documentation",
      type: "Template",
      description: "Template for creating clear API documentation for developers",
      icon: <Code className="h-8 w-8 text-primary" />,
      action: "Download",
      previewContent: "Clear API documentation is crucial for developer adoption and efficiency. This template provides a structured format for documenting APIs in a way that's comprehensive yet easy to understand.",
      fullContent: "Clear API documentation is crucial for developer adoption and efficiency. This template provides a structured format for documenting APIs in a way that's comprehensive yet easy to understand.\n\nThe template includes sections for:\n\nAPI overview and architecture\nAuthentication and authorization\nEndpoint documentation with request/response examples\nError codes and handling\nRate limiting and pagination\nImplementation guidelines and best practices\nSDK examples in multiple languages\n\nFollowing this template ensures your API documentation is complete, consistent, and developer-friendly. Good documentation reduces onboarding time, support requests, and implementation errors while improving developer satisfaction."
    },
    {
      title: "Cross-Functional Collaboration Playbook",
      type: "Guide",
      description: "Strategies for effective collaboration across product, design, and engineering teams",
      icon: <Users className="h-8 w-8 text-primary" />,
      action: "Read Guide",
      previewContent: "Strong cross-functional collaboration is essential for product success. This playbook provides frameworks, rituals, and tools to improve how product, design, and engineering teams work together.",
      fullContent: "Strong cross-functional collaboration is essential for product success. This playbook provides frameworks, rituals, and tools to improve how product, design, and engineering teams work together.\n\nThe playbook covers:\n\nTeam structure and roles/responsibilities\nDecision frameworks (RACI, RAPID, etc.)\nEffective meeting patterns and rituals\nTools and documentation standards\nConflict resolution techniques\nRemote/hybrid collaboration best practices\n\nBy establishing clear processes for how cross-functional teams collaborate, you can reduce friction, speed up decision-making, and build better products faster. The playbook includes practical examples from high-performing product teams that you can adapt to your organization."
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar />
      <div className="absolute inset-0 -z-10 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background"></div>
      <main className="flex-grow container mx-auto px-4 pt-24 md:pt-28 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 mt-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600">Product Management Resources</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Access templates, frameworks, guides and more to excel as a Product Manager
            </p>
          </div>
          
          <Tabs defaultValue="essential" className="w-full mb-10">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
              <TabsTrigger value="essential">Essential</TabsTrigger>
              <TabsTrigger value="discovery">Discovery</TabsTrigger>
              <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
            </TabsList>
            
            <TabsContent value="essential" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources.map((resource, index) => (
                  <Card key={index} className="h-full flex flex-col group transition-all hover:shadow-lg duration-300 border border-muted hover:border-indigo-100 dark:hover:border-indigo-900/50">
                    <CardHeader className="pb-3 pt-6 px-6">
                      <div className="flex justify-between items-start mb-2">
                        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-lg group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/30 transition-colors">
                          {resource.icon}
                        </div>
                        <Badge variant="outline" className="bg-indigo-50/50 dark:bg-indigo-900/10 hover:bg-indigo-50 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800">
                          {resource.type}
                        </Badge>
                      </div>
                      <CardTitle className="mt-4 text-xl">{resource.title}</CardTitle>
                      <CardDescription className="text-base">{resource.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-2 mt-auto pb-6 px-6">
                      {resource.showSampleGenerate ? (
                        <div className="flex flex-col space-y-3">
                          <Button 
                            variant="outline" 
                            className="w-full flex items-center justify-center gap-1.5 hover:bg-muted/50"
                            onClick={() => openPreview(resource)}
                          >
                            <Eye className="h-4 w-4" />
                            Preview
                          </Button>
                          <Button variant="default" className="w-full flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700">
                            <Wand2 className="h-4 w-4" />
                            Generate
                          </Button>
                        </div>
                      ) : (
                        <Button 
                          variant="secondary" 
                          className="w-full hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20"
                          onClick={() => openPreview(resource)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          {resource.action}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="discovery" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {discoveryResources.map((resource, index) => (
                  <Card key={index} className="h-full flex flex-col group transition-all hover:shadow-lg duration-300 border border-muted hover:border-purple-100 dark:hover:border-purple-900/50">
                    <CardHeader className="pb-3 pt-6 px-6">
                      <div className="flex justify-between items-start mb-2">
                        <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30 transition-colors">
                          {resource.icon}
                        </div>
                        <Badge variant="outline" className="bg-purple-50/50 dark:bg-purple-900/10 hover:bg-purple-50 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800">
                          {resource.type}
                        </Badge>
                      </div>
                      <CardTitle className="mt-4 text-xl">{resource.title}</CardTitle>
                      <CardDescription className="text-base">{resource.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-2 mt-auto pb-6 px-6">
                      {resource.showSampleGenerate ? (
                        <div className="flex flex-col space-y-3">
                          <Button 
                            variant="outline" 
                            className="w-full flex items-center justify-center gap-1.5 hover:bg-muted/50"
                            onClick={() => openPreview(resource)}
                          >
                            <Eye className="h-4 w-4" />
                            Preview
                          </Button>
                          <Button variant="default" className="w-full flex items-center justify-center gap-1.5 bg-purple-600 hover:bg-purple-700">
                            <Wand2 className="h-4 w-4" />
                            Generate
                          </Button>
                        </div>
                      ) : (
                        <Button 
                          variant="secondary" 
                          className="w-full hover:bg-purple-50/50 dark:hover:bg-purple-900/20"
                          onClick={() => openPreview(resource)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          {resource.action}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="collaboration" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {communicationResources.map((resource, index) => (
                  <Card key={index} className="h-full flex flex-col group transition-all hover:shadow-lg duration-300 border border-muted hover:border-blue-100 dark:hover:border-blue-900/50">
                    <CardHeader className="pb-3 pt-6 px-6">
                      <div className="flex justify-between items-start mb-2">
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
                          {resource.icon}
                        </div>
                        <Badge variant="outline" className="bg-blue-50/50 dark:bg-blue-900/10 hover:bg-blue-50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                          {resource.type}
                        </Badge>
                      </div>
                      <CardTitle className="mt-4 text-xl">{resource.title}</CardTitle>
                      <CardDescription className="text-base">{resource.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-2 mt-auto pb-6 px-6">
                      {resource.showSampleGenerate ? (
                        <div className="flex flex-col space-y-3">
                          <Button 
                            variant="outline" 
                            className="w-full flex items-center justify-center gap-1.5 hover:bg-muted/50"
                            onClick={() => openPreview(resource)}
                          >
                            <Eye className="h-4 w-4" />
                            Preview
                          </Button>
                          <Button variant="default" className="w-full flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700">
                            <Wand2 className="h-4 w-4" />
                            Generate
                          </Button>
                        </div>
                      ) : (
                        <Button 
                          variant="secondary" 
                          className="w-full hover:bg-blue-50/50 dark:hover:bg-blue-900/20"
                          onClick={() => openPreview(resource)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          {resource.action}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-16 mb-10">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-semibold mb-3 text-foreground">Design Your "30-60-90 Day" Plan</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Create a structured onboarding plan for your new product management role
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="backdrop-blur-sm rounded-xl border-t-4 border-t-blue-500 border-blue-100 dark:border-blue-900/20 transition-all hover:shadow-lg hover:-translate-y-1">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg transition-colors">
                      <Calendar className="h-6 w-6 text-blue-500" />
                    </div>
                    <Badge variant="outline" className="bg-blue-50/50 dark:bg-blue-900/10 hover:bg-blue-50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                      First 30 Days
                    </Badge>
                  </div>
                  <CardTitle className="mt-4 text-xl">Learning & Discovery</CardTitle>
                  <CardDescription className="text-base">Understand the product, team dynamics, and company goals</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mt-3 mb-5">
                    <li className="flex items-start">
                      <div className="bg-blue-100 dark:bg-blue-900/20 p-1.5 rounded-full mr-2 mt-0.5">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                      <span className="text-sm">Meet key stakeholders</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-100 dark:bg-blue-900/20 p-1.5 rounded-full mr-2 mt-0.5">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                      <span className="text-sm">Review product documentation</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-100 dark:bg-blue-900/20 p-1.5 rounded-full mr-2 mt-0.5">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                      <span className="text-sm">Understand current metrics</span>
                    </li>
                  </ul>
                  <Button 
                    variant="outline" 
                    className="w-full border-blue-200 hover:border-blue-300 hover:bg-blue-50/50 text-blue-700"
                    onClick={() => openDayPlanModal("30day")}
                  >
                    Get 30-Day Template
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="backdrop-blur-sm rounded-xl border-t-4 border-t-indigo-500 border-indigo-100 dark:border-indigo-900/20 transition-all hover:shadow-lg hover:-translate-y-1">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-lg transition-colors">
                      <Calendar className="h-6 w-6 text-indigo-500" />
                    </div>
                    <Badge variant="outline" className="bg-indigo-50/50 dark:bg-indigo-900/10 hover:bg-indigo-50 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800">
                      Days 31-60
                    </Badge>
                  </div>
                  <CardTitle className="mt-4 text-xl">Strategic Planning</CardTitle>
                  <CardDescription className="text-base">Develop initial strategies and begin to contribute</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mt-3 mb-5">
                    <li className="flex items-start">
                      <div className="bg-indigo-100 dark:bg-indigo-900/20 p-1.5 rounded-full mr-2 mt-0.5">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      </div>
                      <span className="text-sm">Identify opportunity areas</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-indigo-100 dark:bg-indigo-900/20 p-1.5 rounded-full mr-2 mt-0.5">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      </div>
                      <span className="text-sm">Collaborate on roadmap planning</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-indigo-100 dark:bg-indigo-900/20 p-1.5 rounded-full mr-2 mt-0.5">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      </div>
                      <span className="text-sm">Propose initial improvements</span>
                    </li>
                  </ul>
                  <Button 
                    variant="outline" 
                    className="w-full border-indigo-200 hover:border-indigo-300 hover:bg-indigo-50/50 text-indigo-700"
                    onClick={() => openDayPlanModal("60day")}
                  >
                    Get 60-Day Template
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="backdrop-blur-sm rounded-xl border-t-4 border-t-purple-500 border-purple-100 dark:border-purple-900/20 transition-all hover:shadow-lg hover:-translate-y-1">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg transition-colors">
                      <Calendar className="h-6 w-6 text-purple-500" />
                    </div>
                    <Badge variant="outline" className="bg-purple-50/50 dark:bg-purple-900/10 hover:bg-purple-50 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800">
                      Days 61-90
                    </Badge>
                  </div>
                  <CardTitle className="mt-4 text-xl">Execution & Impact</CardTitle>
                  <CardDescription className="text-base">Deliver measurable results and lead initiatives</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mt-3 mb-5">
                    <li className="flex items-start">
                      <div className="bg-purple-100 dark:bg-purple-900/20 p-1.5 rounded-full mr-2 mt-0.5">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      </div>
                      <span className="text-sm">Lead feature development</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-purple-100 dark:bg-purple-900/20 p-1.5 rounded-full mr-2 mt-0.5">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      </div>
                      <span className="text-sm">Analyze & share initial results</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-purple-100 dark:bg-purple-900/20 p-1.5 rounded-full mr-2 mt-0.5">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      </div>
                      <span className="text-sm">Establish long-term vision</span>
                    </li>
                  </ul>
                  <Button 
                    variant="outline" 
                    className="w-full border-purple-200 hover:border-purple-300 hover:bg-purple-50/50 text-purple-700"
                    onClick={() => openDayPlanModal("90day")}
                  >
                    Get 90-Day Template
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center mt-8">
              <Button 
                variant="default" 
                size="lg" 
                className="px-6 py-6 h-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg"
                onClick={() => openDayPlanModal("30day")}
              >
                <Wand2 className="mr-2 h-5 w-5" />
                Generate Custom 30-60-90 Plan
              </Button>
            </div>
          </div>
          
          <div className="mt-16 bg-card/80 backdrop-blur-sm rounded-xl p-8 text-center shadow-md border">
            <h2 className="text-2xl font-semibold mb-4">Need Custom Resources?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our team can create tailored resources for your specific product management challenges.
            </p>
            <Button size="lg" className="px-8 py-6 h-auto bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-md hover:shadow-lg">
              Request Custom Resources
            </Button>
          </div>
          
          <div className="max-w-md mx-auto mt-16 bg-card/80 backdrop-blur-sm rounded-xl p-6 shadow-md border">
            <EmailSignup />
          </div>
        </div>
      </main>
      <Footer />
    
      {/* ResourcePreviewModal is always in the DOM */}
      <ResourcePreviewModal
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        title={selectedResource?.title || ""}
        type={selectedResource?.type || ""}
        previewContent={selectedResource?.previewContent || ""}
        content={selectedResource?.fullContent || ""}
      />
      
      {/* DayPlanModal for 30-60-90 day plan */}
      <DayPlanModal
        open={dayPlanOpen}
        onOpenChange={setDayPlanOpen}
        defaultTab={selectedDayPlan}
      />
    </div>
  );
};

export default Resources;
