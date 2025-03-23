
import { useAuth } from '@/providers/AuthProvider';
import { useSubscription } from '@/providers/SubscriptionProvider';
import { useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireFeature?: string;
}

const ProtectedRoute = ({ children, requireFeature }: ProtectedRouteProps) => {
  const { user, isLoading: isAuthLoading } = useAuth();
  const { isLoading: isSubscriptionLoading, isFeatureEnabled } = useSubscription();
  const location = useLocation();
  
  // Show loading state while checking auth and subscription
  if (isAuthLoading || isSubscriptionLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  // Show the children - each protected page has its own teaser component
  // for non-authenticated users
  return <>{children}</>;
};

export default ProtectedRoute;
