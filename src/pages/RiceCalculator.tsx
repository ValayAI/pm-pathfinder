
import React from 'react';
import RICECalculator from '../components/RICECalculator';

const RiceCalculatorPage = () => {
  return (
    <div className="px-4 py-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">RICE Prioritization Calculator</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mb-8">
          Calculate RICE scores to prioritize your product features based on Reach, Impact, Confidence, and Effort.
        </p>
        
        <RICECalculator />
      </div>
    </div>
  );
};

export default RiceCalculatorPage;
