const Footer = () => {
  return (
    <footer className="py-12 px-4 border-t border-gray-800">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src="/lovable-uploads/c22f3ef4-7e97-4460-a322-3b100bcd6d45.png" alt="StockRadar Logo" className="h-8 w-8" />
              <span className="text-xl font-semibold">StockRadar</span>
            </div>
            <p className="text-gray-400">
              AI-powered stock analysis for professional investors.
            </p>
            <p className="text-gray-400 mt-2">contact@stockradar.ai</p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="text-gray-400 hover:text-primary">Features</a></li>
              <li><a href="#pricing" className="text-gray-400 hover:text-primary">Pricing</a></li>
              <li><a href="/login" className="text-gray-400 hover:text-primary">Get Early Access</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-primary">About</a></li>
              <li><a href="/legal/imprint" className="text-gray-400 hover:text-primary">Imprint</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-primary">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-primary">Privacy Policy</a></li>
              <li><a href="/legal/liability" className="text-gray-400 hover:text-primary">Limitation of Liability</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} StockRadar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;