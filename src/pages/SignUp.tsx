
import React from 'react';
import { SignUp as ClerkSignUp } from '@clerk/clerk-react';
import { Card } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const SignUp = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-6 shadow-lg border-2 border-primary/10">
          <div className="mb-4 text-center">
            <h1 className="text-2xl font-bold">Create Your Account</h1>
            <p className="text-muted-foreground">Join PM Pathfinder to unlock all features</p>
          </div>
          <ClerkSignUp 
            appearance={{
              elements: {
                card: "shadow-none",
                formButtonPrimary: 
                  "bg-primary text-primary-foreground hover:bg-primary/90 py-2",
                footerActionLink: "text-primary hover:text-primary/80",
              }
            }}
            redirectUrl="/"
          />
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
