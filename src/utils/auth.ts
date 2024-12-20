import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export async function signInUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function signUpUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        email: email,
      }
    }
  });

  if (error) throw error;
  return data;
}