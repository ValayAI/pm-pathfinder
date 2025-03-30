
/**
 * Core utilities for fetching and managing user profiles
 */

import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from './profileTypes';
import { getProfileFromCache, updateProfileCache } from './profileCache';

/**
 * Fetches the user's profile from Supabase with caching
 */
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  // Check cache first
  const cachedProfile = getProfileFromCache(userId);
  if (cachedProfile) {
    return cachedProfile;
  }
  
  try {
    console.log('Fetching fresh profile data for user:', userId);
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
    
    if (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
    
    // Update cache
    updateProfileCache(userId, data as UserProfile);
    
    return data as UserProfile;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};
