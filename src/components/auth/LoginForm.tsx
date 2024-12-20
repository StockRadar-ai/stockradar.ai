import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { AuthFormInputs } from "./AuthFormInputs";
import { signInUser } from "@/utils/auth";

interface LoginFormProps {
  onSuccess: () => void;
  onForgotPassword: () => void;
}

export const LoginForm = ({ onSuccess, onForgotPassword }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [authStatus, setAuthStatus] = useState<"idle" | "authenticating" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthStatus("authenticating");

    try {
      const { user, error } = await signInUser(email, password);
      if (user && !error) {
        setAuthStatus("success");
        await new Promise(resolve => setTimeout(resolve, 1500)); // Wait for animation
        toast.success("Successfully logged in!");
        onSuccess();
      } else {
        setAuthStatus("error");
        await new Promise(resolve => setTimeout(resolve, 1500));
        toast.error(error?.message || "Failed to sign in");
      }
    } catch (error: any) {
      setAuthStatus("error");
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.error("Authentication error:", error);
      toast.error(error.message || "Failed to authenticate");
    } finally {
      setIsLoading(false);
      setAuthStatus("idle");
    }
  };

  return (
    <>
      <AnimatePresence>
        {authStatus !== "idle" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              {authStatus === "authenticating" && (
                <div className="text-2xl text-white">Logging in...</div>
              )}
              {authStatus === "success" && (
                <div className="text-2xl text-green-500">Login Successful!</div>
              )}
              {authStatus === "error" && (
                <div className="text-2xl text-red-500">Login Failed!</div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
    </>
  );
};