
import { motion } from 'framer-motion';
import NewLandingPage from './NewLandingPage';

interface LandingPageProps {
  loaded: boolean;
}

const LandingPage = ({ loaded }: LandingPageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="overflow-hidden"
    >
      <NewLandingPage loaded={loaded} />
    </motion.div>
  );
};

export default LandingPage;
