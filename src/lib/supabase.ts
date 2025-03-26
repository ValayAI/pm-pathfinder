
import { createClient } from '@supabase/supabase-js';
import { supabase as integrationSupabase } from '@/integrations/supabase/client';

// Use the Supabase client from integrations to avoid duplicating clients
// This ensures consistent authentication state across the application
export const supabase = integrationSupabase;

// Export the original client creation for reference, but don't use it
export const createSupabaseClient = (url: string, key: string) => {
  return createClient(url, key, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false,
      storage: localStorage
    }
  });
};
