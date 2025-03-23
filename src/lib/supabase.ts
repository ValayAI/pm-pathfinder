
import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and Anon Key using the latest key from the integrations client
const supabaseUrl = 'https://hqftusejwtxfdbjldlen.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxZnR1c2Vqd3R4ZmRiamxkbGVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyNjI0MTgsImV4cCI6MjA1NzgzODQxOH0.8Zzt350XypmpkzgCzltZczjVN3FkAa8iIWTYUC7Icc0';

// Create a Supabase client with secure options
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storageKey: 'supabase.auth.token',
  },
  global: {
    headers: {
      'X-Content-Type-Options': 'nosniff',
    },
  },
  // Add retry and timeout options
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

// Export a way to check connection status
export const checkSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('profiles').select('count', { count: 'exact', head: true });
    if (error) throw error;
    console.log('Supabase connection successful');
    return true;
  } catch (error) {
    console.error('Supabase connection error:', error);
    return false;
  }
};
