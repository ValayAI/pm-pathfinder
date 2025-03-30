
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';

type AuthSetupProps = {
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setIsLoading: (loading: boolean) => void;
  fetchAndStoreUserProfile: (userId: string) => Promise<void>;
};

/**
 * Hook to set up authentication listeners and initial state
 */
export const useAuthSetup = ({
  setUser,
  setSession,
  setIsLoading,
  fetchAndStoreUserProfile
}: AuthSetupProps) => {
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
  }, [setUser, setSession, setIsLoading, fetchAndStoreUserProfile]);
};
