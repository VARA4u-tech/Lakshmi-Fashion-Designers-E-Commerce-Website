import { createClient } from "@supabase/supabase-js";

// Configuration
// In a production app, these should be in a .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL and Anon Key must be provided in the .env file");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
