import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [key, setKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // KeyAuth integration would go here
      // For now, we'll simulate the login
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Successfully logged in!");
      navigate('/dashboard'); // You'll need to create a dashboard page
    } catch (error) {
      toast.error("Invalid license key");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#151821] via-[#1E2330] to-[#2A2F3C]">
      <div className="flex items-center p-4 fixed w-full top-0 bg-black/60 backdrop-blur-lg">
        <a href="/" className="flex items-center space-x-2">
          <img src="/lovable-uploads/c22f3ef4-7e97-4460-a322-3b100bcd6d45.png" alt="StockRadar Logo" className="h-8 w-8" />
          <span className="text-xl font-semibold">StockRadar</span>
        </a>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 flex items-center justify-center p-4"
      >
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <img src="/lovable-uploads/c22f3ef4-7e97-4460-a322-3b100bcd6d45.png" alt="Logo" className="w-10 h-10" />
              </div>
            </motion.div>
            <h2 className="text-2xl font-bold text-white mb-2">Login to Start</h2>
            <p className="text-gray-400">with your first analysis!</p>
          </div>

          <motion.form 
            onSubmit={handleLogin}
            className="mt-8 space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Please enter your Key"
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
              {isLoading ? "Verifying..." : "Continue"}
            </Button>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;