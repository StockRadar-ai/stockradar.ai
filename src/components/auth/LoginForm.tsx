import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface LoginFormProps {
  onSuccess: () => void;
  onForgotPassword: () => void;
}

export const LoginForm = ({ onSuccess, onForgotPassword }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // First try to sign in
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (signInError && signInError.message.includes("Invalid login credentials")) {
        // If login fails, try to sign up
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) {
          throw signUpError;
        }

        // If sign up succeeds, try logging in again
        const { error: finalLoginError } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (finalLoginError) {
          throw finalLoginError;
        }
      } else if (signInError) {
        throw signInError;
      }

      toast.success("Successfully logged in!");
      onSuccess();
    } catch (error: any) {
      toast.error(error.message || "Failed to login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="mt-8 space-y-6 bg-black/40 backdrop-blur-lg border border-gray-800/50 rounded-lg p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <div className="space-y-4">
        <Input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-black/50 border-gray-800 focus:border-primary h-12"
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-black/50 border-gray-800 focus:border-primary h-12"
          required
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary-hover h-12 transition-all duration-300"
        disabled={isLoading}
      >
        {isLoading ? "Please wait..." : "Sign in"}
      </Button>

      <div className="text-center mt-4">
        <motion.button
          type="button"
          onClick={onForgotPassword}
          className="text-sm text-primary hover:text-primary/80 transition-colors"
          whileHover={{ scale: 1.05 }}
        >
          Forgot Password?
        </motion.button>
      </div>
    </motion.form>
  );
};