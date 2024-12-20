import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ForgotPasswordFormProps {
  onBack: () => void;
  email: string;
  setEmail: (email: string) => void;
}

export const ForgotPasswordForm = ({ onBack, email, setEmail }: ForgotPasswordFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      
      toast.success("Password reset email sent! Please check your inbox.");
      onBack();
    } catch (error: any) {
      toast.error(error.message || "Failed to send reset email");
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
      </div>

      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary-hover h-12 transition-all duration-300"
        disabled={isLoading}
      >
        {isLoading ? "Please wait..." : "Reset Password"}
      </Button>

      <div className="text-center mt-4">
        <motion.button
          type="button"
          onClick={onBack}
          className="text-sm text-primary hover:text-primary/80 transition-colors"
          whileHover={{ scale: 1.05 }}
        >
          Back to Login
        </motion.button>
      </div>
    </motion.form>
  );
};