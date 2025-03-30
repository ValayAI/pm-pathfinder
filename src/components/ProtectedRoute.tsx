
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';
import { useSubscription } from '@/providers/SubscriptionProvider';
import PMCoachTeaser from '@/components/teasers/PMCoachTeaser';
import ExploreFeaturesTeaser from '@/components/teasers/ExploreFeaturesTeaser';
import ResourcesTeaser from '@/components/teasers/ResourcesTeaser';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireFeature?: string;
}

const ProtectedRoute = ({ children, requireFeature }: ProtectedRouteProps) => {
  // Safely access useAuth, providing fallbacks if it's not available
  let user = null;
  let isAuthLoading = false;
  
  try {
    const auth = useAuth();
    user = auth.user;
    isAuthLoading = auth.isLoading;
  } catch (error) {
    console.warn("Auth context not available in ProtectedRoute");
    isAuthLoading = false;
  }
  
  // Safely access useSubscription
  let isSubscriptionLoading = false;
  let isFeatureEnabled = () => false;
  
  try {
    const subscription = useSubscription();
    isSubscriptionLoading = subscription.isLoading;
    isFeatureEnabled = subscription.isFeatureEnabled;
  } catch (error) {
    console.warn("Subscription context not available in ProtectedRoute");
    isSubscriptionLoading = false;
  }
  
  const location = useLocation();
  
  // If still loading auth or subscription data, show a minimal loading indicator
  if (isAuthLoading || isSubscriptionLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center space-y-2">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Loading your settings...</p>
        </div>
      </div>
    );
  }
  
  // If not authenticated, show the appropriate teaser based on the current path
  if (!user) {
    // Display teasers instead of redirecting to signin
    if (location.pathname === '/chat') {
      return <PMCoachTeaser />;
    }
    
    if (location.pathname === '/explore') {
      return <ExploreFeaturesTeaser />;
    }
    
    if (location.pathname === '/resources') {
      return <ResourcesTeaser />;
    }
    
    // For other protected routes without teasers, redirect to signin
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
