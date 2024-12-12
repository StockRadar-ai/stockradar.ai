import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { verifyKey } from "@/services/keyauth";

const Login = () => {
  const [key, setKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<"idle" | "verifying" | "success" | "error">("idle");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setVerificationStatus("verifying");

    try {
      const result = await verifyKey(key);
      if (result.success) {
        setVerificationStatus("success");
        await new Promise(resolve => setTimeout(resolve, 1500));
        toast.success(result.message);
        navigate('/dashboard');
      } else {
        setVerificationStatus("error");
        await new Promise(resolve => setTimeout(resolve, 1500));
        toast.error(result.message);
      }
    } catch (error) {
      setVerificationStatus("error");
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.error("An error occurred during verification");
    } finally {
      setIsLoading(false);
      setVerificationStatus("idle");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-black via-[#0A0C10] to-[#151821]">
      <div className="flex items-center p-4 fixed w-full top-0 bg-black/60 backdrop-blur-lg">
        <motion.a 
          href="/" 
          className="flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img src="/lovable-uploads/c22f3ef4-7e97-4460-a322-3b100bcd6d45.png" alt="StockRadar Logo" className="h-8 w-8" />
          <span className="text-xl font-semibold">StockRadar</span>
        </motion.a>
      </div>

      <AnimatePresence>
        {verificationStatus !== "idle" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="text-center"
            >
              {verificationStatus === "verifying" && (
                <div className="text-2xl text-white">Verifying...</div>
              )}
              {verificationStatus === "success" && (
                <div className="text-2xl text-green-500">Successfully Validated!</div>
              )}
              {verificationStatus === "error" && (
                <div className="text-2xl text-red-500">Key Invalid!</div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 flex items-center justify-center p-4"
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
            <h2 className="text-2xl font-bold text-white mb-2">Login to Start</h2>
            <p className="text-gray-400">Enter your license key to continue</p>
          </motion.div>

          <motion.form 
            onSubmit={handleLogin}
            className="mt-8 space-y-6 bg-black/40 backdrop-blur-lg border border-gray-800/50 rounded-lg p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Enter your license key"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="bg-black/50 border-gray-800 focus:border-primary h-12"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary-hover h-12 transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "Login"}
            </Button>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;