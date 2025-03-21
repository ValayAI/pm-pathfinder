
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface UserProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Fetches the user's profile from Supabase
 */
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
    
    if (error) {
      throw error;
    }
    
    return data as UserProfile;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

/**
 * Updates the user's profile in Supabase
 */
export const updateUserProfile = async (
  userId: string,
  updates: Partial<UserProfile>
): Promise<boolean> => {
  try {
    // Remove id from updates if present
    const { id, ...profileUpdates } = updates;
    
    // Add updated_at timestamp
    const updatedProfile = {
      ...profileUpdates,
      updated_at: new Date().toISOString()
    };
    
    const { error } = await supabase
      .from('profiles')
      .update(updatedProfile)
      .eq('id', userId);
    
    if (error) {
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error('Error updating user profile:', error);
    toast.error('Failed to update profile');
    return false;
  }
};
