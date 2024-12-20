import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const HowItWorks = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [50, 0]);

  return (
    <section ref={ref} className="py-24 px-4 relative overflow-hidden">
      <motion.div
        style={{ opacity, y }}
        className="container mx-auto relative z-10"
      >
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <span className="text-primary">How does it work?</span>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-light text-center mb-16 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Seamless Process,<br />High Quality Analysis
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-[24px] bg-black/40 backdrop-blur-sm border border-gray-800 hover:border-primary/50 transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-primary text-lg font-semibold">01</span>
              <h3 className="text-xl">Create an Account</h3>
            </div>
            <p className="text-gray-400">
              Sign up for a StockRadar account to access our powerful AI-driven stock analysis platform.
            </p>
          </div>

          <div className="p-8 rounded-[24px] bg-black/40 backdrop-blur-sm border border-gray-800 hover:border-primary/50 transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-primary text-lg font-semibold">02</span>
              <h3 className="text-xl">Get ready to use our bot</h3>
            </div>
            <p className="text-gray-400">
              Get ready to receive the best Stock Analysis you've ever looked at! 3, 2, 1 Action!
            </p>
          </div>

          <div className="p-8 rounded-[24px] bg-black/40 backdrop-blur-sm border border-gray-800 hover:border-primary/50 transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-primary text-lg font-semibold">03</span>
              <h3 className="text-xl">Get high-quality analysis</h3>
            </div>
            <p className="text-gray-400">
              Use the platform to access insightful analyses and invest confidently in the right markets — all through a secure and intuitive platform.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HowItWorks;