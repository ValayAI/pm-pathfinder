
/**
 * Type definitions for user profiles
 */

export interface UserProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProfileUpdateData {
  first_name?: string | null;
  last_name?: string | null;
  avatar_url?: string | null;
}

export interface ProfileCreationData {
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
}
