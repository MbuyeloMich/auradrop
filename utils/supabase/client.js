import { createBrowserClient } from "@supabase/ssr";
import { supabaseConfig } from "@/utils/supabase/config";

export const createClient = () => {
	if (!supabaseConfig.isConfigured) {
		throw new Error("Supabase is not configured. Set valid NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
	}

	return createBrowserClient(supabaseConfig.supabaseUrl, supabaseConfig.supabaseAnonKey);
};
