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
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              When Money Talks,
              <br />
              We Translate
            </h1>
            
            <p className="text-lg md:text-xl text-white mb-8">
              Discover the AI-powered wealth management platform built for professional
              investors. Optimize your portfolio and make smarter, data-driven investment
              decisions to secure your financial future.
            </p>

            <Button 
              className="bg-primary hover:bg-primary-hover hover:shadow-[0_0_15px_rgba(255,69,0,0.5)] transition-all duration-300 text-white px-8 py-6 text-lg transform hover:scale-105"
              onClick={() => navigate('/login')}
            >
              Start Now
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, rotateY: -90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative md:-right-20 lg:-right-32"
          >
            <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-[100px] animate-pulse" />
            <img 
              src="/lovable-uploads/7025b423-122e-4cea-a5ac-b16c5a1943fe.png"
              alt="New York Stock Exchange"
              className="rounded-3xl shadow-2xl relative z-10 w-[120%] max-w-none"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;