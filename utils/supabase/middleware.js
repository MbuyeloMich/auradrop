// https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs?queryGroups=language&language=js#nextjs-middleware

import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { supabaseConfig } from "@/utils/supabase/config";

export async function updateSession(request) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  if (!supabaseConfig.isConfigured) {
    return supabaseResponse;
  }

  const supabase = createServerClient(
    supabaseConfig.supabaseUrl,
    supabaseConfig.supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // refreshing the auth token
  await supabase.auth.getUser();

  return supabaseResponse;
}
