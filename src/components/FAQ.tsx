import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [50, 0]);

  const faqs = [
    {
      question: "Is StockRadar Financial Advice?",
      answer: "Stock Radar offers analysis and insights solely for informational purposes. This does not constitute financial advice or a recommendation to buy or sell any assets. Please consult with a qualified financial advisor before making any investment decisions."
    },
    {
      question: "What is StockRadar?",
      answer: "StockRadar is an AI-powered stock analysis platform that provides real-time market insights and investment recommendations based on comprehensive data analysis."
    },
    {
      question: "What data sources does StockRadar use for analysis?",
      answer: "StockRadar utilizes multiple reliable financial data sources, including market feeds, company financials, and economic indicators to provide comprehensive analysis."
    },
    {
      question: "How many requests can I make per month?",
      answer: "The number of requests depends on your subscription plan. Basic users get 5 requests per month, while premium users enjoy unlimited access."
    },
    {
      question: "What is the difference between StockRadar and other stock analysis tools?",
      answer: "StockRadar differentiates itself through its advanced AI algorithms, real-time analysis, and comprehensive market insights, providing more accurate and timely recommendations."
    },
    {
      question: "What types of financial reports can I generate with StockRadar?",
      answer: "StockRadar enables you to generate various reports including market analysis, stock performance predictions, risk assessments, and portfolio optimization recommendations."
    }
  ];

  return (
    <section ref={ref} className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-transparent pointer-events-none" />
      <motion.div
        style={{ opacity, y }}
        className="container mx-auto max-w-3xl relative z-10"
      >
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <span className="text-primary">Frequently Asked Questions</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-light text-center mb-16 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Questions & Answer
        </h2>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-gray-800">
              <AccordionTrigger className="text-left hover:text-primary transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-400">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </section>
  );
};

export default FAQ;
