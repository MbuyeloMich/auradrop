import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

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

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (
    !isValidHttpUrl(process.env.NEXT_PUBLIC_SUPABASE_URL) ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
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
