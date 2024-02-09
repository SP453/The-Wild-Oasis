import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://assvyzmjqmpplotcuadf.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzc3Z5em1qcW1wcGxvdGN1YWRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcwMzg1MTEsImV4cCI6MjAyMjYxNDUxMX0.0alyNSxRehUnrujLRv46ybQENoP8-Pj1l3mrRqo0Bu8";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
