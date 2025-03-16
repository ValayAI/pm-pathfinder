
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EmailSignup from "../components/EmailSignup";

const Explore = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Explore Product Management Resources</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Discover tools, frameworks, and methodologies to enhance your product management skills.
          </p>
          
          {/* Email signup component */}
          <div className="max-w-md mx-auto mb-12">
            <EmailSignup />
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">Popular Frameworks</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-md mr-3">
                    <span className="text-primary">OKRs</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Objectives & Key Results</h3>
                    <p className="text-sm text-muted-foreground">Set ambitious goals with measurable outcomes</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-md mr-3">
                    <span className="text-primary">RICE</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Reach, Impact, Confidence, Effort</h3>
                    <p className="text-sm text-muted-foreground">Prioritize features based on multiple factors</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-md mr-3">
                    <span className="text-primary">MoSCoW</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Must, Should, Could, Won't</h3>
                    <p className="text-sm text-muted-foreground">Classify requirements by priority</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">Learning Paths</h2>
              <ul className="space-y-4">
                <li>
                  <h3 className="font-medium">Customer Research Techniques</h3>
                  <p className="text-sm text-muted-foreground mb-1">Learn effective user research methods</p>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: '70%' }}></div>
                  </div>
                </li>
                <li>
                  <h3 className="font-medium">Data-Driven Decision Making</h3>
                  <p className="text-sm text-muted-foreground mb-1">Understand metrics that matter</p>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: '50%' }}></div>
                  </div>
                </li>
                <li>
                  <h3 className="font-medium">Strategic Roadmapping</h3>
                  <p className="text-sm text-muted-foreground mb-1">Build effective product roadmaps</p>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: '30%' }}></div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">More resources coming soon. Subscribe to our newsletter for updates.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Explore;
