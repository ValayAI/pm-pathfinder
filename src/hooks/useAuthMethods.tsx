
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { getUserProfile, createUserProfile } from '@/utils/profileUtils';
import { checkRateLimit, recordFailedAttempt, resetAttempts } from '@/utils/authUtils';

/**
 * Hook to provide authentication methods
 */
export const useAuthMethods = (
  setUser: (user: any) => void,
  setSession: (session: any) => void
) => {
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * Fetch and store user profile in localStorage
   */
  const fetchAndStoreUserProfile = async (userId: string) => {
    try {
      const profile = await getUserProfile(userId);
      if (profile) {
        localStorage.setItem('userProfile', JSON.stringify(profile));
      } else {
        console.log('No profile found, creating a new one for user:', userId);
        await createUserProfile(userId, {});
        const newProfile = await getUserProfile(userId);
        if (newProfile) {
          localStorage.setItem('userProfile', JSON.stringify(newProfile));
        }
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  /**
   * Sign in with email and password
   */
  const signIn = async (email: string, password: string) => {
    try {
      if (!checkRateLimit(email)) {
        return { error: new Error("Too many login attempts. Please try again later."), success: false };
      }

      console.log('Signing in with:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password
      });
      
      if (error) {
        console.error('Error signing in:', error);
        recordFailedAttempt(email);
        throw error;
      }

      resetAttempts(email);

      if (data.user) {
        await fetchAndStoreUserProfile(data.user.id);
      }

      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
      
      return { error: null, success: true };
    } catch (error) {
      console.error('Error signing in:', error);
      return { error: error as Error, success: false };
    }
  };

  /**
   * Sign up with email and password
   */
  const signUp = async (email: string, password: string, userData?: { firstName?: string; lastName?: string }) => {
    try {
      console.log('Signing up with:', email, 'and user data:', userData);
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            first_name: userData?.firstName || '',
            last_name: userData?.lastName || '',
          }
        }
      });
      
      if (error) {
        console.error('Error signing up:', error);
        throw error;
      }
      
      console.log('Sign up successful:', data);
      
      if (data.user) {
        const profileCreated = await createUserProfile(data.user.id, {
          firstName: userData?.firstName || '',
          lastName: userData?.lastName || ''
        });
        
        console.log('Profile creation result:', profileCreated);
      }
      
      return { error: null, success: true };
    } catch (error) {
      console.error('Error signing up:', error);
      return { error: error as Error, success: false };
    }
  };

  /**
   * Sign out the current user
   */
  const signOut = async () => {
    try {
      console.log('Signing out: starting process');
      
      setUser(null);
      setSession(null);
      
      localStorage.removeItem('userProfile');
      
      const { error } = await supabase.auth.signOut({ scope: 'global' });
      if (error) {
        console.error('Error signing out from Supabase:', error);
        throw error;
      }
      
      console.log('Sign out successful, redirecting to home');
      
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Error signing out:', error);
      
      localStorage.removeItem('userProfile');
      navigate('/', { replace: true });
    }
  };

  return {
    fetchAndStoreUserProfile,
    signIn,
    signUp,
    signOut
  };
};
