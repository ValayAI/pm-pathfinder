
import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const SignupPrompt = () => {
  return (
    <motion.div 
      className="w-full p-5 bg-card rounded-lg border border-dashed shadow-sm"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Lock className="h-5 w-5 text-primary" />
        <p className="font-medium">Sign up to continue the conversation</p>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Create a free account to get unlimited coaching and personalized advice for your product management career.
      </p>
      <div className="flex gap-3 justify-center">
        <Button variant="outline" asChild size="sm" className="min-w-24">
          <Link to="/signin">Sign In</Link>
        </Button>
        <Button asChild size="sm" className="min-w-24 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
          <Link to="/signup" className="flex items-center gap-1.5">
            Sign Up Free <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
};

export default SignupPrompt;
