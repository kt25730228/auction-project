const supabaseUrl = window.env.SUPABASE_URL;
const supabaseAnonKey = window.env.SUPABASE_ANON;

const supabaseClient = supabase.createClient(supabaseUrl, supabaseAnonKey);
