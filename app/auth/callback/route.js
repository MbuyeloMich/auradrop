import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { supabaseConfig } from "@/utils/supabase/config";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (!supabaseConfig.isConfigured) {
    return NextResponse.redirect(new URL("/error?reason=supabase_config", request.url));
  }

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(new URL(next, request.url));
    }

    return NextResponse.redirect(new URL("/error?reason=oauth_exchange", request.url));
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(new URL("/error?reason=missing_code", request.url));
}
