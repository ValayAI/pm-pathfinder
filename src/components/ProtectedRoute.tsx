
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';
import { useSubscription } from '@/providers/SubscriptionProvider';

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
  
  // If not authenticated, redirect to signin page
  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }
  
  // If a specific feature is required and the user doesn't have access to it
  if (requireFeature && !isFeatureEnabled(requireFeature)) {
    return <Navigate to="/pricing" state={{ requiredFeature: requireFeature, from: location }} replace />;
  }
  
  // If authenticated and has the required feature access, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
