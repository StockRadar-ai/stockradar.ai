import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Plus, Minus, X } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

const FAQ = () => {
  const ref = useRef(null);
  const [selectedFaq, setSelectedFaq] = useState<FAQ | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2], [50, 0]);

  const faqs: FAQ[] = [
    {
      question: "What is StockRadar?",
      answer: "StockRadar is an AI-powered stock analysis platform that provides real-time market insights and investment recommendations based on comprehensive data analysis."
    },
    {
      question: "What data sources does StockRadar use for analysis?",
      answer: "StockRadar utilizes multiple reliable financial data sources, including market feeds, company financials, and economic indicators to provide comprehensive analysis."
    },
    {
      question: "Is StockRadar Financial Advice?",
      answer: "Stock Radar offers analysis and insights solely for informational purposes. This does not constitute financial advice or a recommendation to buy or sell any assets. Please consult with a qualified financial advisor before making any investment decisions."
    },
    {
      question: "How many requests can I make per month?",
      answer: "The number of requests depends on your subscription plan. Basic users get 5 requests per month, while premium users enjoy unlimited access."
    },
    {
      question: "What types of financial reports can I generate?",
      answer: "StockRadar enables you to generate various reports including market analysis, stock performance predictions, risk assessments, and portfolio optimization recommendations."
    }
  ];

  return (
    <section ref={ref} className="py-24 px-4 relative">
      <motion.div
        style={{ opacity, y }}
        className="container mx-auto max-w-6xl relative"
      >
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center justify-center gap-2 mb-4"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-primary text-sm font-medium">Frequently Asked Questions</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-semibold bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent"
          >
            Questions & Answer
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <button
                  onClick={() => setSelectedFaq(selectedFaq?.question === faq.question ? null : faq)}
                  className="w-full flex items-center justify-between p-4 text-left rounded-lg bg-black/20 backdrop-blur-sm border border-gray-800 hover:border-primary/50 transition-all duration-300"
                >
                  <span className="text-gray-200 group-hover:text-white transition-colors">
                    {faq.question}
                  </span>
                  {selectedFaq?.question === faq.question ? (
                    <Minus className="w-4 h-4 text-primary" />
                  ) : (
                    <Plus className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                  )}
                </button>
              </motion.div>
            ))}
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              {selectedFaq && (
                <motion.div
                  key={selectedFaq.question}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="sticky top-24 p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-gray-800"
                >
                  <button
                    onClick={() => setSelectedFaq(null)}
                    className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-800/50 transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                  <h3 className="text-xl font-medium text-white mb-4">{selectedFaq.question}</h3>
                  <p className="text-gray-400 leading-relaxed">{selectedFaq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default FAQ;