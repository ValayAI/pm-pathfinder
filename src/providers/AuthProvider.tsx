
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

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
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getInitialSession = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting initial session:', error);
          setError(error);
          throw error;
        }

        if (data.session) {
          setSession(data.session);
          setUser(data.session.user);
        }
      } catch (error) {
        console.error('Error getting initial session:', error);
        // Don't throw here, let the app continue to load
      } finally {
        setIsLoading(false);
      }
    };

    getInitialSession();

    try {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        console.log('Auth state changed:', _event, session);
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
      });

      return () => {
        subscription.unsubscribe();
      };
    } catch (err) {
      console.error('Error setting up auth subscription:', err);
      setIsLoading(false);
    }
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

  if (error && !isLoading) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-xl font-bold text-red-500">Authentication Error</h2>
        <p className="mt-2">There was a problem connecting to the authentication service.</p>
        <p className="mt-2 text-sm text-gray-500">{error.message}</p>
        <button 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
