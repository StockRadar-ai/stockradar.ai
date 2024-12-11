import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

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
        className="flex-1 flex items-center justify-center p-4 text-center"
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-primary text-xl font-semibold">Oops! 404</h1>
            <h2 className="text-4xl font-bold text-white">Page Not Found</h2>
            <p className="text-gray-400 max-w-md mx-auto mt-4">
              It seems you've wandered off the beaten path. But don't worry, we've got your back! Let's get you back on track.
            </p>
          </div>
          
          <Button
            onClick={() => navigate('/')}
            className="bg-primary hover:bg-primary-hover hover-glow transition-all duration-300"
          >
            Back to Home
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;