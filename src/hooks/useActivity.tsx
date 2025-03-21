
import { useAuth } from '@/providers/AuthProvider';
import { logUserActivity, incrementMessageUsage } from '@/utils/subscriptionUtils';

export const useActivity = () => {
  const { user } = useAuth();

  const trackActivity = async (activityType: string, details: Record<string, any> = {}) => {
    if (!user) return false;
    
    return await logUserActivity(user.id, activityType, details);
  };
  
  const trackMessage = async () => {
    if (!user) return false;
    
    return await incrementMessageUsage(user.id);
  };

  return {
    trackActivity,
    trackMessage
  };
};

export default useActivity;
