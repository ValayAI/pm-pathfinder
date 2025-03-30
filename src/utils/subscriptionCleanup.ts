import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Define interfaces for stricter typing
interface Subscription {
  id: string;
  user_id: string;
  active: boolean;
  created_at: string;
  [key: string]: any;
}

interface UserWithMultipleSubscriptions {
  user_id: string;
  subscription_count: number;
}

/**
 * Ensures a user has only one active subscription by deactivating all but the most recent one
 * @param userId The ID of the user whose subscriptions need to be cleaned up
 * @returns A boolean indicating whether the cleanup was successful
 */
export const cleanupUserSubscriptions = async (userId: string): Promise<boolean> => {
  try {
    // Fetch all active subscriptions for the user, ordered by creation date (newest first)
    const { data: activeSubscriptions, error: fetchError } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('active', true)
      .order('created_at', { ascending: false }) as unknown as { data: Subscription[] | null, error: any };
    
    if (fetchError) {
      console.error('Error fetching active subscriptions:', fetchError);
      return false;
    }
    
    // If there are 0 or 1 active subscriptions, no cleanup needed
    if (!activeSubscriptions || activeSubscriptions.length <= 1) {
      return true;
    }
    
    console.log(`Found ${activeSubscriptions.length} active subscriptions for user ${userId}, keeping only the most recent one`);
    
    // Keep the most recent subscription active (index 0) and deactivate all others
    const subscriptionsToDeactivate = activeSubscriptions.slice(1);
    const idsToDeactivate = subscriptionsToDeactivate.map((sub: { id: string }) => sub.id);
    
    const { error: updateError } = await supabase
      .from('subscriptions')
      .update({ active: false })
      .in('id', idsToDeactivate);
    
    if (updateError) {
      console.error('Error deactivating older subscriptions:', updateError);
      return false;
    }
    
    console.log(`Successfully deactivated ${idsToDeactivate.length} older subscriptions for user ${userId}`);
    return true;
  } catch (error) {
    console.error('Error during subscription cleanup:', error);
    return false;
  }
};

/**
 * Performs a cleanup of all users with multiple active subscriptions
 * @returns A report of the cleanup operation
 */
export const cleanupAllUserSubscriptions = async (): Promise<{
  success: boolean;
  usersProcessed: number;
  usersWithMultipleSubscriptions: number;
  errors: string[];
}> => {
  const result = {
    success: false,
    usersProcessed: 0,
    usersWithMultipleSubscriptions: 0,
    errors: [] as string[]
  };
  
  try {    
    // Call the RPC function with proper type assertions
    const { data, error: queryError } = await supabase
      .rpc('get_users_with_multiple_active_subscriptions') as { 
        data: UserWithMultipleSubscriptions[] | null;
        error: Error | null;
      };
    
    if (queryError) {
      result.errors.push(`Error fetching users with multiple subscriptions: ${queryError.message}`);
      return result;
    }
    
    // Handle the data safely with proper type handling
    const userIds = data || [];
    
    if (userIds.length === 0) {
      result.success = true;
      return result;
    }
    
    result.usersWithMultipleSubscriptions = userIds.length;
    
    // Process each user with explicit typing
    for (const row of userIds) {
      try {
        const success = await cleanupUserSubscriptions(row.user_id);
        if (success) {
          result.usersProcessed++;
        } else {
          result.errors.push(`Failed to clean up subscriptions for user ${row.user_id}`);
        }
      } catch (error) {
        result.errors.push(`Error processing user ${row.user_id}: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
    
    result.success = result.errors.length === 0;
    return result;
  } catch (error) {
    result.errors.push(`Unexpected error: ${error instanceof Error ? error.message : String(error)}`);
    return result;
  }
};
