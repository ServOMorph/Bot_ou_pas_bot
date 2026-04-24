import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log("🔗 [DEBUG] URL Supabase chargée :", supabaseUrl);
console.log("🔑 [DEBUG] Début de la clé Anon :", supabaseAnonKey?.substring(0, 20));

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
