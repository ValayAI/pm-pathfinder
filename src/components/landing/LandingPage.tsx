
import { useState, useEffect } from 'react';
import NewLandingPage from './NewLandingPage';

interface LandingPageProps {
  loaded: boolean;
}

const LandingPage = ({ loaded }: LandingPageProps) => {
  return (
    <NewLandingPage loaded={loaded} />
  );
};

export default LandingPage;
