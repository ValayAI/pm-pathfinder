
import { useState, useEffect } from 'react';
import NewLandingPage from './NewLandingPage';
import { motion } from 'framer-motion';

interface LandingPageProps {
  loaded: boolean;
}

const LandingPage = ({ loaded }: LandingPageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <NewLandingPage loaded={loaded} />
    </motion.div>
  );
};

export default LandingPage;
