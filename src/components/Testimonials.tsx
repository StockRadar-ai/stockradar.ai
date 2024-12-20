import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star } from "lucide-react";

const Testimonials = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [50, 0]);

  const testimonials = [
    {
      avatar: "/lovable-uploads/c31fc29c-c890-4fa5-9f3a-c0b3d0add0e6.png",
      quote: "StockRadar has been a game-changer for my portfolio. It's like having a personal financial advisor 24/7.",
      rating: 5
    },
    {
      avatar: "/lovable-uploads/c31fc29c-c890-4fa5-9f3a-c0b3d0add0e6.png",
      quote: "With StockRadar's insights, I've made smarter trades with confidence. It's like a safety net for my decisions.",
      rating: 5
    },
    {
      avatar: "/lovable-uploads/c31fc29c-c890-4fa5-9f3a-c0b3d0add0e6.png",
      quote: "I never imagined stock analysis could be so easy and accurate. StockRadar's recommendations have significantly boosted my returns.",
      rating: 5
    }
  ];

  return (
    <section ref={ref} className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-transparent pointer-events-none" />
      <motion.div
        style={{ opacity, y }}
        className="container mx-auto relative z-10"
      >
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <span className="text-primary">More User Stories</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-light text-center mb-16 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Real Success,<br />Authentic Voices
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="p-6 rounded-lg bg-black/40 backdrop-blur-sm border border-gray-800 hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <img src={testimonial.avatar} alt="User" className="w-12 h-12 rounded-full" />
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
              </div>
              <p className="text-gray-300">{testimonial.quote}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Testimonials;