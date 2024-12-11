import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import MobileMenu from "./MobileMenu";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <nav className="fixed w-full top-0 z-50 bg-black/60 backdrop-blur-lg border-b border-border/50 shadow-lg">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src="/lovable-uploads/c22f3ef4-7e97-4460-a322-3b100bcd6d45.png" alt="StockRadar Logo" className="h-8 w-8 object-contain" />
            <span className="text-xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">StockRadar</span>
          </div>
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hover:bg-primary/20"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-sm hover:text-primary transition-colors">Features</a>
            <a href="#pricing" className="text-sm hover:text-primary transition-colors">Pricing</a>
            <a href="#company" className="text-sm hover:text-primary transition-colors">Company</a>
            <a href="#contact" className="text-sm hover:text-primary transition-colors">Contact</a>
            <Button 
              className="bg-primary hover:bg-primary-hover hover-glow transition-all duration-300"
              onClick={() => navigate('/login')}
            >
              Start Now
            </Button>
          </div>
        </div>
      </nav>
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Navbar;