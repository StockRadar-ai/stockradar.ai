import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-black/30 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img 
            src="/lovable-uploads/512a904e-81b0-4fa4-b3ef-d7326f3b6993.png" 
            alt="StockRadar Logo" 
            className="w-8 h-8"
          />
          <span className="text-2xl font-bold text-white">StockRadar</span>
        </Link>

        <div className="hidden md:flex items-center justify-center flex-1 space-x-8">
          <a href="#features" className="text-sm hover:text-primary transition-colors">
            Features
          </a>
          <a href="#company" className="text-sm hover:text-primary transition-colors">
            Company
          </a>
        </div>

        <div className="md:flex items-center justify-end hidden">
          <Link to="/signup">
            <Button className="bg-primary hover:bg-primary/90">Start Now</Button>
          </Link>
        </div>

        <button
          className="md:hidden p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
};

export default Navbar;
