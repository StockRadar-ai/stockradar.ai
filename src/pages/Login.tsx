import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { loginWithEmailAndPassword, auth } from "@/services/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [authStatus, setAuthStatus] = useState<"idle" | "authenticating" | "success" | "error">("idle");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthStatus("authenticating");

    try {
      const result = await loginWithEmailAndPassword(email, password);
      if (result.success) {
        setAuthStatus("success");
        await new Promise(resolve => setTimeout(resolve, 1500));
        toast.success("Successfully logged in!");
        navigate('/dashboard');
      } else {
        setAuthStatus("error");
        await new Promise(resolve => setTimeout(resolve, 1500));
        toast.error(result.error || "Failed to login");
      }
    } catch (error) {
      setAuthStatus("error");
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.error("An error occurred during login");
    } finally {
      setIsLoading(false);
      setAuthStatus("idle");
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent! Please check your inbox.");
      setShowForgotPassword(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to send reset email");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#141414]">
      <div className="flex items-center p-4 fixed w-full top-0 bg-black/60 backdrop-blur-lg">
        <motion.a 
          href="/" 
          className="flex items-center space-x-2"
          whileHover={{ scale: 1 }}
          whileTap={{ scale: 0.95 }}
        >
          <img src="/lovable-uploads/c22f3ef4-7e97-4460-a322-3b100bcd6d45.png" alt="StockRadar Logo" className="h-8 w-8" />
          <span className="text-xl font-semibold text-white">StockRadar</span>
        </motion.a>
      </div>

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
                <div className="text-2xl text-white">Authenticating...</div>
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

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 flex items-center justify-center p-4 mt-16"
      >
        <div className="w-full max-w-md space-y-8">
          <motion.div 
            className="text-center"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <img src="/lovable-uploads/c22f3ef4-7e97-4460-a322-3b100bcd6d45.png" alt="Logo" className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-gray-400">Sign in to your account</p>
          </motion.div>

          <motion.form 
            onSubmit={showForgotPassword ? handleForgotPassword : handleLogin}
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
              {!showForgotPassword && (
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-black/50 border-gray-800 focus:border-primary h-12"
                  required
                />
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary-hover h-12 transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? "Please wait..." : (showForgotPassword ? "Reset Password" : "Sign in")}
            </Button>

            <div className="text-center mt-4 space-y-2">
              <motion.button
                type="button"
                onClick={() => setShowForgotPassword(!showForgotPassword)}
                className="text-sm text-primary hover:text-primary/80 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                {showForgotPassword ? "Back to Login" : "Forgot Password?"}
              </motion.button>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-sm block"
              >
                <Link to="/signup" className="text-primary hover:text-primary/80 transition-colors">
                  Don't have an account? Sign up
                </Link>
              </motion.div>
            </div>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;