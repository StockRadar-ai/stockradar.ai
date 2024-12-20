import { supabase } from "@/integrations/supabase/client";

export async function signInUser(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log("Sign in error:", error);
      throw error;
    }

    return { session: data.session, user: data.user };
  } catch (error) {
    console.error("Sign in error details:", error);
    throw error;
  }
}

export async function signUpUser(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.log("Sign up error:", error);
      throw error;
    }

    return { session: data.session, user: data.user };
  } catch (error) {
    console.error("Sign up error details:", error);
    throw error;
  }
}