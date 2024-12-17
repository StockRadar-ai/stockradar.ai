import { Check } from "lucide-react";
import { Button } from "./ui/button";

const Pricing = () => {
  const features = [
    "High Quality Analysis",
    "Professional & Data Backed",
    "5 Analyses Daily",
    "Free Future Updates",
    "Easy & Intuitive to Use"
  ];

  return (
    <section className="py-24 px-4" id="pricing">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Start Your Journey
        </h2>
        <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
          Get access to professional stock analysis tools
        </p>

        <div className="max-w-md mx-auto">
          <div className="premium-card p-8 hover-lift">
            <h3 className="text-2xl font-bold mb-2">Premium Access</h3>
            <div className="flex items-baseline mb-6">
              <span className="text-4xl font-bold">$59.99</span>
              <span className="text-gray-400 ml-2">/month</span>
            </div>
            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <Check className="w-5 h-5 text-primary mr-2" />
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
            <Button 
              className="w-full bg-primary hover:bg-primary-hover hover-glow transition-all duration-300"
              onClick={() => window.location.href = '/login'}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;