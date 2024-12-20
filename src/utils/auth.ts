import { supabase } from "@/integrations/supabase/client";
import { AuthError } from "@supabase/supabase-js";

export async function signInUser(email: string, password: string): Promise<{ error: AuthError | null }> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log("Sign in error:", error);
  }

  return { error };
}

export async function signUpUser(email: string, password: string): Promise<{ error: AuthError | null }> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: window.location.origin,
    }
  });

  if (error) {
    console.log("Sign up error:", error);
  }

  return { error };
}