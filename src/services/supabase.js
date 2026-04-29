import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://vncgisqjrtjhcslyctmu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZuY2dpc3FqcnRqaGNzbHljdG11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1NTAzNDksImV4cCI6MjA5MjEyNjM0OX0.LMTO8G8EbGjZUNwNEvTzJ_5QmsEtamp3ZY49XQrVrcE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
