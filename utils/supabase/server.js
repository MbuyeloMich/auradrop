import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { supabaseConfig } from "@/utils/supabase/config";

export async function createClient() {
  const cookieStore = await cookies();

  if (!supabaseConfig.isConfigured) {
    throw new Error("Supabase is not configured");
  }

  return createServerClient(
    supabaseConfig.supabaseUrl,
    supabaseConfig.supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}
