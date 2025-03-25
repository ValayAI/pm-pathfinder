
import { useEffect, useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';

interface DashboardProps {
  children: React.ReactNode;
}

const Dashboard = ({ children }: DashboardProps) => {
  const { user } = useAuth();
  const [firstName, setFirstName] = useState('');
  
  useEffect(() => {
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      try {
        const profile = JSON.parse(storedProfile);
        setFirstName(profile.first_name || '');
      } catch (error) {
        console.error('Error parsing user profile from localStorage:', error);
      }
    }
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col bg-background relative">
      <div className="absolute inset-0 -z-10 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background"></div>
      <main className="flex-1 overflow-auto pb-24 md:pb-10 pt-20 md:pt-24 px-4 md:px-6 lg:px-10">
        <div className="pt-4 md:pt-6">
          {children}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
