import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "SUPABSE_URL";
const supabaseKey = "SUPABASE_KEY";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
