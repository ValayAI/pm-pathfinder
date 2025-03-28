
import { createContext, useContext, useMemo } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { toast } from 'sonner';
import { useAuthState } from '@/hooks/useAuthState';
import { useAuthMethods } from '@/hooks/useAuthMethods';
import { useAuthSetup } from '@/hooks/useAuthSetup';

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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Use custom hooks to manage state and auth methods
  const { user, setUser, session, setSession, isLoading, setIsLoading } = useAuthState();
  
  const { fetchAndStoreUserProfile, signIn, signUp, signOut } = useAuthMethods(setUser, setSession);
  
  // Set up auth listeners and initial state
  useAuthSetup({
    setUser,
    setSession,
    setIsLoading,
    fetchAndStoreUserProfile
  });

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    user,
    session,
    isLoading,
    signIn,
    signUp,
    signOut
  }), [user, session, isLoading, signIn, signUp, signOut]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
