import { Menu } from "lucide-react";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="fixed w-full top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img src="/lovable-uploads/89534923-4a0d-450e-8593-e1c8ce2568a3.png" alt="StockRadar Logo" className="h-8 w-8" />
          <span className="text-xl font-semibold">StockRadar</span>
        </div>
        <div className="md:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-sm hover:text-primary transition-colors">Features</a>
          <a href="#about" className="text-sm hover:text-primary transition-colors">About</a>
          <a href="#pricing" className="text-sm hover:text-primary transition-colors">Pricing</a>
          <Button className="bg-primary hover:bg-primary-hover hover-glow transition-all duration-300">
            Start Now
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;