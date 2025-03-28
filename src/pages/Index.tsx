
import { useEffect, useState } from 'react';
import { useAuth } from "@/providers/AuthProvider";
import LandingPage from "@/components/landing/LandingPage";
import DashboardHome from "@/components/dashboard/DashboardHome";

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const { user } = useAuth();
  const [firstName, setFirstName] = useState('');

  // Smooth scroll to top on page load and set loaded state for animations
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setLoaded(true);
  }, []);

  // Get user's first name from localStorage if available
  useEffect(() => {
    if (user) {
      const storedProfile = localStorage.getItem('userProfile');
      if (storedProfile) {
        try {
          const profile = JSON.parse(storedProfile);
          setFirstName(profile.first_name || '');
        } catch (error) {
          console.error('Error parsing user profile from localStorage:', error);
        }
      }
    }
  }, [user]);

  // If user is logged in, show dashboard content without sidebar
  if (user) {
    return <DashboardHome firstName={firstName} />;
  }

  // Non-authenticated view
  return <LandingPage loaded={loaded} />;
};

export default Index;
