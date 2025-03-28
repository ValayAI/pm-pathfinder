
import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import TeaserHeader from './chat-teaser/TeaserHeader';
import ChatSection from './chat-teaser/ChatSection';
import FeaturesSection from './chat-teaser/FeaturesSection';

const PMCoachTeaser = () => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <TeaserHeader loaded={loaded} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <ChatSection />
      </motion.div>
      
      <FeaturesSection />
    </div>
  );
};

export default PMCoachTeaser;
