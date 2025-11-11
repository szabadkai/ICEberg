import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseEnabled = import.meta.env.VITE_ENABLE_SUPABASE === 'true';

// Check if Supabase is configured and enabled
export const isSupabaseConfigured = supabaseEnabled && !!(supabaseUrl && supabaseAnonKey);

// Create Supabase client (will be null if not configured or disabled)
export const supabase = isSupabaseConfigured && supabaseUrl && supabaseAnonKey
  ? createClient<Database>(supabaseUrl, supabaseAnonKey)
  : null;
