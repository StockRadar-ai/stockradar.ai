import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import MobileMenu from "./MobileMenu";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <nav className="fixed w-full top-0 z-50 bg-black/20 backdrop-blur-md border-b border-border/40 shadow-lg transition-all duration-300">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/lovable-uploads/c22f3ef4-7e97-4460-a322-3b100bcd6d45.png" alt="StockRadar Logo" className="h-8 w-8 object-contain" />
            <span className="text-xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">StockRadar</span>
          </Link>
          
          <div className="hidden md:flex items-center justify-center flex-1 space-x-8">
            <a href="#features" className="text-sm hover:text-primary transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm hover:text-primary transition-colors">How it Works</a>
            <a href="#testimonials" className="text-sm hover:text-primary transition-colors">Testimonials</a>
            <a href="#faq" className="text-sm hover:text-primary transition-colors">FAQ</a>
          </div>
          
          <div className="md:flex items-center justify-end hidden">
            <Button 
              className="bg-primary hover:bg-primary-hover hover:scale-105 transition-all duration-300"
              onClick={() => navigate('/login')}
            >
              Start Now
            </Button>
          </div>
          
          <div className="md:hidden ml-auto">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hover:bg-primary/20"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </nav>
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Navbar;