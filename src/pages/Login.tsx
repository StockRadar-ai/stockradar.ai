import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { verifyKey } from "@/services/keyauth";

const Login = () => {
  const [key, setKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await verifyKey(key);
      if (result.success) {
        toast.success(result.message);
        navigate('/dashboard');
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("An error occurred during verification");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-black via-[#0A0C10] to-[#151821]">
      <div className="flex items-center p-4 fixed w-full top-0 bg-black/60 backdrop-blur-lg">
        <motion.a 
          href="/" 
          className="flex items-center space-x-2 hover-lift"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img src="/lovable-uploads/c22f3ef4-7e97-4460-a322-3b100bcd6d45.png" alt="StockRadar Logo" className="h-8 w-8" />
          <span className="text-xl font-semibold">StockRadar</span>
        </motion.a>
      </div>

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
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center hover-glow">
              <img src="/lovable-uploads/c22f3ef4-7e97-4460-a322-3b100bcd6d45.png" alt="Logo" className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Login to Start</h2>
            <p className="text-gray-400">Enter your license key to continue</p>
          </motion.div>

          <motion.form 
            onSubmit={handleLogin}
            className="mt-8 space-y-6 premium-card p-8"
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
              className="w-full bg-primary hover:bg-primary-hover h-12 hover-glow transition-all duration-300"
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