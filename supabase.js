const supabaseUrl = window.env.SUPABASE_URL;
const supabaseAnonKey = window.env.SUPABASE_ANON;

// Supabase 전역 객체 사용
const supabaseClient = supabase.createClient(supabaseUrl, supabaseAnonKey);
