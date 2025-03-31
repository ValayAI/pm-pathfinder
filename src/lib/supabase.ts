
import { createClient } from '@supabase/supabase-js';
import { supabase as integrationSupabase } from '@/integrations/supabase/client';

// Cache for database queries to reduce redundant calls
const queryCache = new Map();

// Cache duration in milliseconds (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

// Use the Supabase client from integrations to avoid duplicating clients
// This ensures consistent authentication state across the application
export const supabase = integrationSupabase;

// Create a cached version of common Supabase operations
export const cachedSupabase = {
  // Cached version of select queries
  async cachedSelect(
    table: string, 
    query: any, 
    cacheKey?: string, 
    ttl: number = CACHE_DURATION
  ) {
    const key = cacheKey || `${table}:${JSON.stringify(query)}`;
    const cached = queryCache.get(key);
    
    if (cached && (Date.now() - cached.timestamp < ttl)) {
      console.log(`Using cached data for ${key}`);
      return cached.data;
    }
    
    console.log(`Fetching fresh data for ${key}`);
    const result = await supabase.from(table).select(query);
    
    if (!result.error) {
      queryCache.set(key, {
        data: result,
        timestamp: Date.now()
      });
    }
    
    return result;
  },
  
  // Clear specific cache entries or all cache
  clearCache(key?: string) {
    if (key) {
      queryCache.delete(key);
    } else {
      queryCache.clear();
    }
  }
};

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
