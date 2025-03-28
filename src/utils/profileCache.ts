
/**
 * Utilities for caching user profile data
 */

import { UserProfile } from './profileTypes';

// Cache profiles for better performance
const profileCache = new Map<string, { data: UserProfile | null, timestamp: number }>();
const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes in milliseconds

/**
 * Checks if a profile exists in the cache and is not expired
 */
export const isProfileCached = (userId: string): boolean => {
  const cachedProfile = profileCache.get(userId);
  const now = Date.now();
  
  return !!cachedProfile && (now - cachedProfile.timestamp < CACHE_EXPIRY);
};

/**
 * Gets a profile from the cache if it exists and is not expired
 */
export const getProfileFromCache = (userId: string): UserProfile | null => {
  const cachedProfile = profileCache.get(userId);
  const now = Date.now();
  
  if (cachedProfile && (now - cachedProfile.timestamp < CACHE_EXPIRY)) {
    console.log('Using cached profile data');
    return cachedProfile.data;
  }
  
  return null;
};

/**
 * Updates the profile cache with new data
 */
export const updateProfileCache = (userId: string, profileData: UserProfile | null): void => {
  profileCache.set(userId, { 
    data: profileData, 
    timestamp: Date.now() 
  });
};

/**
 * Clears the profile cache for a specific user or all users
 */
export const clearProfileCache = (userId?: string): void => {
  if (userId) {
    profileCache.delete(userId);
  } else {
    profileCache.clear();
  }
};
