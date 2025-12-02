import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = window.env.SUPABASE_URL;
const supabaseAnonKey = window.env.SUPABASE_ANON;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
