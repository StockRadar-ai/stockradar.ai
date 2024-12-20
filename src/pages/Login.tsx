import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { LoginForm } from "@/components/auth/LoginForm";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

const Login = () => {
  const [email, setEmail] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/dashboard');
      }
    };
    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        navigate('/dashboard');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLoginSuccess = () => {
    navigate('/dashboard');
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

          {showForgotPassword ? (
            <ForgotPasswordForm
              onBack={() => setShowForgotPassword(false)}
              email={email}
              setEmail={setEmail}
            />
          ) : (
            <LoginForm
              onSuccess={handleLoginSuccess}
              onForgotPassword={() => setShowForgotPassword(true)}
            />
          )}

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-sm text-center"
          >
            <Link to="/signup" className="text-primary hover:text-primary/80 transition-colors">
              Don't have an account? Sign up
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;