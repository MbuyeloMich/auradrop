const FALLBACK_SUPABASE_URL = "https://ynlqpunifoklokhrtmqp.supabase.co";
const FALLBACK_SUPABASE_ANON_KEY =
  "sb_publishable_mx2KDqtrn1nAmQLWx_LFmQ_IqbV6-I_";

export function isValidHttpUrl(value) {
  if (!value || value === "undefined" || value === "null") {
    return false;
  }

  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export function getSupabaseConfig() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (isValidHttpUrl(supabaseUrl) && supabaseAnonKey) {
    return {
      supabaseUrl,
      supabaseAnonKey,
      isConfigured: true,
      source: "env",
    };
  }

  return {
    supabaseUrl: FALLBACK_SUPABASE_URL,
    supabaseAnonKey: FALLBACK_SUPABASE_ANON_KEY,
    isConfigured:
      isValidHttpUrl(FALLBACK_SUPABASE_URL) && Boolean(FALLBACK_SUPABASE_ANON_KEY),
    source: "fallback",
  };
}

export const supabaseConfig = getSupabaseConfig();