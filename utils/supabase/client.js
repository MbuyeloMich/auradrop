import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function isValidHttpUrl(value) {
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

export const createClient = () => {
	if (!isValidHttpUrl(supabaseUrl) || !supabaseKey) {
		throw new Error("Supabase is not configured. Set valid NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
	}

	return createBrowserClient(supabaseUrl, supabaseKey);
};
