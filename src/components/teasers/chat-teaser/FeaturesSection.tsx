
import React from 'react';
import { MessageSquare, Rocket, Briefcase, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import FeatureCard from './FeatureCard';
import { motion } from "framer-motion";

const FeaturesSection = () => {
  const features = [
    {
      icon: <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
      title: "Interview Prep",
      description: "Get personalized advice for PM interview questions and feedback on your responses",
      color: "blue"
    },
    {
      icon: <Rocket className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />,
      title: "Career Growth",
      description: "Advice on advancing your PM career, skills development, and navigating challenges",
      color: "indigo"
    },
    {
      icon: <Briefcase className="h-5 w-5 text-purple-600 dark:text-purple-400" />,
      title: "Product Strategy",
      description: "Guidance on frameworks, prioritization, and building successful product strategies",
      color: "purple"
    }
  ];

  return (
    <motion.div 
      className="text-center mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.4 }}
    >
      <h2 className="text-xl font-semibold mb-5">What can the PM Coach help with?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {features.map((feature, index) => (
          <FeatureCard key={index} feature={feature} delay={(index + 1) * 0.1} />
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.7 }}
      >
        <Button asChild size="lg" className="mt-8 px-6 py-6 h-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md">
          <Link to="/signup" className="flex items-center gap-1.5">
            Get Unlimited Access <ArrowRight className="h-5 w-5" />
          </Link>
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default FeaturesSection;
