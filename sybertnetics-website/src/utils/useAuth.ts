import { useSupabaseAuth } from './useSupabaseAuth';

// Re-export the Supabase auth hook as useAuth for backward compatibility
export function useAuth() {
  return useSupabaseAuth();
} 