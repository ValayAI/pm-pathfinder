
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export interface UserProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

// Cache profiles for better performance
const profileCache = new Map<string, { data: UserProfile | null, timestamp: number }>();
const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes in milliseconds

/**
 * Fetches the user's profile from Supabase with caching
 */
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  // Check cache first
  const cachedProfile = profileCache.get(userId);
  const now = Date.now();
  
  if (cachedProfile && (now - cachedProfile.timestamp < CACHE_EXPIRY)) {
    console.log('Using cached profile data');
    return cachedProfile.data;
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
    profileCache.set(userId, { 
      data: data as UserProfile, 
      timestamp: now 
    });
    
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
    
    console.log('Updating profile with:', updatedProfile);
    
    const { error } = await supabase
      .from('profiles')
      .update(updatedProfile)
      .eq('id', userId);
    
    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }
    
    // Update cache if it exists
    const cachedProfile = profileCache.get(userId);
    if (cachedProfile) {
      profileCache.set(userId, {
        data: { ...cachedProfile.data, ...updatedProfile } as UserProfile,
        timestamp: Date.now()
      });
    }
    
    return true;
  } catch (error) {
    console.error('Error updating user profile:', error);
    toast.error('Failed to update profile');
    return false;
  }
};

/**
 * Creates a new user profile in Supabase
 * This should be called when a new user signs up if the profile doesn't exist
 */
export const createUserProfile = async (
  userId: string,
  profileData: { firstName?: string; lastName?: string; avatarUrl?: string }
): Promise<boolean> => {
  try {
    const newProfile = {
      id: userId,
      first_name: profileData.firstName || null,
      last_name: profileData.lastName || null,
      avatar_url: profileData.avatarUrl || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    console.log('Creating new profile:', newProfile);
    
    const { error } = await supabase
      .from('profiles')
      .upsert(newProfile, { onConflict: 'id' });
    
    if (error) {
      console.error('Error creating user profile:', error);
      throw error;
    }
    
    // Update cache
    profileCache.set(userId, {
      data: newProfile as UserProfile,
      timestamp: Date.now()
    });
    
    return true;
  } catch (error) {
    console.error('Error creating user profile:', error);
    return false;
  }
};

/**
 * Clears the profile cache for a specific user or all users
 */
export const clearProfileCache = (userId?: string) => {
  if (userId) {
    profileCache.delete(userId);
  } else {
    profileCache.clear();
  }
};
