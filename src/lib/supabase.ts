
import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and Anon Key using the latest key from the integrations client
const supabaseUrl = 'https://hqftusejwtxfdbjldlen.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxZnR1c2Vqd3R4ZmRiamxkbGVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyNjI0MTgsImV4cCI6MjA1NzgzODQxOH0.8Zzt350XypmpkzgCzltZczjVN3FkAa8iIWTYUC7Icc0';

// Create a Supabase client with explicit auth configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,  // Persist the session to localStorage
    autoRefreshToken: true, // Auto-refresh expired tokens
    detectSessionInUrl: false, // Don't auto-detect JWT in the URL
    storage: localStorage  // Explicitly use localStorage
  }
});
