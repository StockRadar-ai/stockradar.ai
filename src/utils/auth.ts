import { supabase } from "@/integrations/supabase/client";

export async function signInUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log("Sign in error:", error);
    throw error;
  }

  return { session: data.session, user: data.user };
}

export async function signUpUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: window.location.origin,
    }
  });

  if (error) {
    console.log("Sign up error:", error);
    throw error;
  }

  return { session: data.session, user: data.user };
}