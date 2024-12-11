import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto text-center">
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
        
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8">
          Discover the AI-powered wealth management platform built for professional
          investors. Optimize your portfolio and make smarter, data-driven investment
          decisions to secure your financial future.
        </p>

        <Button 
          className="bg-primary hover:bg-primary-hover hover-glow transition-all duration-300 text-white px-8 py-6 text-lg"
          onClick={() => navigate('/login')}
        >
          Start Now
        </Button>

        <div className="mt-20">
          <h3 className="text-xl text-gray-400 mb-8">Our aspirational partners</h3>
          <div className="flex justify-center items-center space-x-12 opacity-50">
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Financial_Times_logo.svg" 
                 alt="Financial Times" 
                 className="h-8" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/3/32/Bloomberg_logo.svg" 
                 alt="Bloomberg" 
                 className="h-8" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;