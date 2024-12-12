import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center bg-primary/10 rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
              <span className="text-sm font-medium text-primary">
                Supercharge Your Portfolio with AI
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              When Money Talks,
              <br />
              We Translate
            </h1>
            
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-8">
              Discover the AI-powered wealth management platform built for professional
              investors. Optimize your portfolio and make smarter, data-driven investment
              decisions to secure your financial future.
            </p>

            <Button 
              className="bg-primary hover:bg-primary-hover hover:scale-105 transition-all duration-300 text-white px-8 py-6 text-lg"
              onClick={() => navigate('/login')}
            >
              Start Now
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-[100px] animate-pulse" />
            <img 
              src="/lovable-uploads/7025b423-122e-4cea-a5ac-b16c5a1943fe.png"
              alt="New York Stock Exchange"
              className="rounded-3xl shadow-2xl relative z-10 w-full"
            />
          </motion.div>
        </div>

        <motion.div 
          className="mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h3 className="text-xl text-gray-400 mb-8">Our aspirational partners</h3>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50">
            <motion.img 
              src="/lovable-uploads/5a64ffb0-ad1e-4eca-8fbe-ee5eebe7a3ea.png"
              alt="Financial Times" 
              className="h-8"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            />
            <motion.img 
              src="/lovable-uploads/9a95ef80-64cd-4341-ba1a-0afa1d8a79ca.png"
              alt="Bloomberg" 
              className="h-8"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;