import { Check } from "lucide-react";
import { Button } from "./ui/button";

const Pricing = () => {
  const plans = [
    {
      name: "Basic",
      price: "49",
      features: [
        "Basic stock analysis",
        "Daily market updates",
        "Standard API access",
        "Email support"
      ]
    },
    {
      name: "Pro",
      price: "99",
      features: [
        "Advanced AI analysis",
        "Real-time alerts",
        "Premium API access",
        "Priority support",
        "Custom reports"
      ]
    },
    {
      name: "Enterprise",
      price: "249",
      features: [
        "Full AI capabilities",
        "Unlimited analysis",
        "Custom integrations",
        "24/7 dedicated support",
        "Team collaboration",
        "Custom solutions"
      ]
    }
  ];

  return (
    <section className="py-24 px-4" id="pricing">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Choose Your Plan
        </h2>
        <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
          Select the perfect plan for your investment needs
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className="p-8 rounded-lg bg-secondary/50 backdrop-blur-sm border border-gray-800 hover:border-primary/50 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-gray-400 ml-2">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="w-5 h-5 text-primary mr-2" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className="w-full bg-primary hover:bg-primary-hover hover-glow transition-all duration-300"
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;