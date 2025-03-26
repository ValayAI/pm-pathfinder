import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { getUserProfile, createUserProfile } from '@/utils/profileUtils';

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

  useEffect(() => {
    let mounted = true;
    
    const setupAuth = async () => {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
        if (!mounted) return;
        
        console.log('Auth state changed:', _event, newSession?.user?.email);
        
        if (_event === 'SIGNED_OUT') {
          setSession(null);
          setUser(null);
          localStorage.removeItem('userProfile');
          console.log('Cleared auth state after sign out');
        } else if (newSession) {
          setSession(newSession);
          setUser(newSession.user ?? null);
          
          if (newSession.user) {
            setTimeout(async () => {
              if (mounted) {
                await fetchAndStoreUserProfile(newSession.user.id);
              }
            }, 0);
          }
        }
      });

      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting initial session:', error);
          throw error;
        }

        if (mounted) {
          if (data.session) {
            setSession(data.session);
            setUser(data.session.user);
            await fetchAndStoreUserProfile(data.session.user.id);
          }
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error getting initial session:', error);
        if (mounted) setIsLoading(false);
      }

      return () => {
        subscription.unsubscribe();
      };
    };

    setupAuth();
    
    return () => {
      mounted = false;
    };
  }, []);

  const checkRateLimit = (email: string): boolean => {
    const now = Date.now();
    const userAttempts = failedAttempts.get(email);

    if (!userAttempts) {
      return true;
    }

    if (now - userAttempts.lastAttempt > LOCKOUT_DURATION) {
      failedAttempts.set(email, { count: 0, lastAttempt: now });
      return true;
    }

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

  const contextValue = useMemo(() => ({
    user,
    session,
    isLoading,
    signIn,
    signUp,
    signOut
  }), [user, session, isLoading, location]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
