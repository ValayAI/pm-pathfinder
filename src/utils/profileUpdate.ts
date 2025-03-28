
/**
 * Utilities for updating and creating user profiles
 */

import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { UserProfile, ProfileUpdateData, ProfileCreationData } from './profileTypes';
import { updateProfileCache, getProfileFromCache } from './profileCache';

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
    const cachedProfile = getProfileFromCache(userId);
    if (cachedProfile) {
      updateProfileCache(userId, { ...cachedProfile, ...updatedProfile } as UserProfile);
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
  profileData: ProfileCreationData
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
    updateProfileCache(userId, newProfile as UserProfile);
    
    return true;
  } catch (error) {
    console.error('Error creating user profile:', error);
    return false;
  }
};
