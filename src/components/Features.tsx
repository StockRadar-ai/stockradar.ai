import { LineChart, Zap, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: <LineChart className="w-12 h-12 text-primary" />,
      title: "AI-Powered Analysis",
      description: "Advanced algorithms analyze market trends and predict potential opportunities with high accuracy."
    },
    {
      icon: <Zap className="w-12 h-12 text-primary" />,
      title: "Real-Time Insights",
      description: "Get instant updates and alerts on market movements that matter to your portfolio."
    },
    {
      icon: <Shield className="w-12 h-12 text-primary" />,
      title: "Secure Platform",
      description: "Enterprise-grade security ensures your data and investments are protected at all times."
    }
  ];

  return (
    <section className="py-24 px-4" id="features" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-primary/80 bg-gradient-to-r from-orange-200 to-orange-100 bg-clip-text text-transparent">Our Features</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Powerful Functionality, Effortless Experience
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Leverage cutting-edge technology to make informed investment decisions
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="p-6 rounded-lg bg-secondary/50 backdrop-blur-sm border border-gray-800 hover:border-primary/50 transition-all duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;