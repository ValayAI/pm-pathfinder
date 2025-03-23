import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { getUserProfile } from '@/utils/profileUtils';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{
    error: Error | null;
    success: boolean;
  }>;
  signUp: (email: string, password: string, userData?: { firstName?: string; lastName?: string }) => Promise<{
    error: Error | null;
    success: boolean;
  }>;
  signOut: () => Promise<void>;
};

// Track failed login attempts
const failedAttempts = new Map<string, { count: number, lastAttempt: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch user profile and store in localStorage
  const fetchAndStoreUserProfile = async (userId: string) => {
    try {
      const profile = await getUserProfile(userId);
      if (profile) {
        localStorage.setItem('userProfile', JSON.stringify(profile));
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  useEffect(() => {
    const getInitialSession = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting initial session:', error);
          throw error;
        }

        if (data.session) {
          setSession(data.session);
          setUser(data.session.user);
          await fetchAndStoreUserProfile(data.session.user.id);
        }
      } catch (error) {
        console.error('Error getting initial session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      console.log('Auth state changed:', _event, session);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await fetchAndStoreUserProfile(session.user.id);
      }
      
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkRateLimit = (email: string): boolean => {
    const now = Date.now();
    const userAttempts = failedAttempts.get(email);

    if (!userAttempts) {
      return true; // First attempt, no rate limiting
    }

    // Check if the lockout period has passed
    if (now - userAttempts.lastAttempt > LOCKOUT_DURATION) {
      // Reset attempts if lockout period has passed
      failedAttempts.set(email, { count: 0, lastAttempt: now });
      return true;
    }

    // If user is over the attempt limit and still in lockout period
    if (userAttempts.count >= MAX_ATTEMPTS) {
      const remainingLockout = Math.ceil((LOCKOUT_DURATION - (now - userAttempts.lastAttempt)) / 60000);
      toast.error(`Account temporarily locked`, {
        description: `Too many failed attempts. Please try again in ${remainingLockout} minutes.`,
      });
      return false;
    }

    return true;
  };

  const recordFailedAttempt = (email: string) => {
    const now = Date.now();
    const userAttempts = failedAttempts.get(email);
    
    if (!userAttempts) {
      failedAttempts.set(email, { count: 1, lastAttempt: now });
    } else {
      failedAttempts.set(email, { 
        count: userAttempts.count + 1, 
        lastAttempt: now 
      });
      
      // Show warning after multiple failed attempts
      if (userAttempts.count + 1 >= MAX_ATTEMPTS - 1) {
        toast.warning(`Login attempt ${userAttempts.count + 1} of ${MAX_ATTEMPTS}`, {
          description: "Your account will be temporarily locked after too many failed attempts.",
        });
      }
    }
  };

  const resetAttempts = (email: string) => {
    failedAttempts.delete(email);
  };

  const signIn = async (email: string, password: string) => {
    try {
      // Check if user is rate limited
      if (!checkRateLimit(email)) {
        return { error: new Error("Too many login attempts. Please try again later."), success: false };
      }

      console.log('Signing in with:', email);
      
      // Simplified sign in without any CAPTCHA options
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password
      });
      
      if (error) {
        console.error('Error signing in:', error);
        // Record failed attempt
        recordFailedAttempt(email);
        throw error;
      }

      // Reset failed attempts counter on successful login
      resetAttempts(email);

      // Fetch user profile data after successful login
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

  const signUp = async (email: string, password: string, userData?: { firstName?: string; lastName?: string }) => {
    try {
      console.log('Signing up with:', email);
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
      return { error: null, success: true };
    } catch (error) {
      console.error('Error signing up:', error);
      return { error: error as Error, success: false };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem('userProfile');
      navigate('/signin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const value = {
    user,
    session,
    isLoading,
    signIn,
    signUp,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
