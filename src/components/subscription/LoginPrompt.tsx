
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { LockOpen, CreditCard } from "lucide-react";

interface LoginPromptProps {
  onLogin: () => void;
}

const LoginPrompt: React.FC<LoginPromptProps> = ({ onLogin }) => {
  return (
    <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800">
      <LockOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
      <AlertTitle>Already purchased?</AlertTitle>
      <AlertDescription className="flex justify-between items-center">
        <span>Log in to access your unlimited coaching</span>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onLogin}
          className="mt-2 sm:mt-0"
        >
          <CreditCard className="h-4 w-4 mr-2" />
          Log in
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default LoginPrompt;
