import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { AuthFormInputs } from "./AuthFormInputs";
import { signInUser, signUpUser } from "@/utils/auth";

interface LoginFormProps {
  onSuccess: () => void;
  onForgotPassword: () => void;
}

export const LoginForm = ({ onSuccess, onForgotPassword }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!isSigningUp) {
        const { user, error } = await signInUser(email, password);
        if (user && !error) {
          toast.success("Successfully logged in!");
          onSuccess();
        } else if (error?.code === "auth/user-not-found") {
          setIsSigningUp(true);
          toast.info("No account found. Would you like to create one?");
        } else {
          toast.error(error?.message || "Failed to sign in");
        }
      } else {
        const { user, error } = await signUpUser(email, password);
        if (user && !error) {
          toast.success("Account created successfully!");
          onSuccess();
        } else {
          toast.error(error?.message || "Failed to create account");
        }
      }
    } catch (error: any) {
      console.error("Authentication error:", error);
      toast.error(error.message || "Failed to authenticate");
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
      <AuthFormInputs
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />

      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary-hover h-12 transition-all duration-300"
        disabled={isLoading}
      >
        {isLoading ? "Please wait..." : (isSigningUp ? "Sign up" : "Sign in")}
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