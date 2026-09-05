import { createBrowserClient } from "@supabase/ssr";

export function supabase() {
  // Publishable Supabase values are safe in browser code.
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://lgndaryenplvfmkzlmgh.supabase.co";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_gLOmdVnSXiy9_vUWZWYDZw_Xc5nX6oy";
  return createBrowserClient(url, key);
}
