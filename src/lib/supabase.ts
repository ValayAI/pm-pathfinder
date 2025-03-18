
import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and Anon Key from the environment variables or use defaults
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://hqftusejwtxfdbjldlen.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxZnR1c2Vqd3R4ZmRiamxkbGVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA3MjU5OTEsImV4cCI6MjAyNjMwMTk5MX0.ypGxb52_5OQW9FgVsE_2UL3iqC-WZzRQQQ3QLkH8_ss';

// Create a Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
