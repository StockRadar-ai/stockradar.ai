import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useAnimation, useInView } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    quote: "StockRadar has been a game-changer for my portfolio. The AI-powered insights are incredibly accurate.",
    rating: 5,
    speed: 1.2 // outer column
  },
  {
    name: "Michael Chen",
    quote: "The real-time analysis and predictions have helped me make informed decisions consistently.",
    rating: 5,
    speed: 1 // center column
  },
  {
    name: "Emma Davis",
    quote: "I've tried many stock analysis tools, but StockRadar's accuracy and ease of use are unmatched.",
    rating: 5,
    speed: 1.2 // outer column
  },
  {
    name: "David Wilson",
    quote: "The premium features are worth every penny. My investment returns have improved significantly.",
    rating: 5,
    speed: 1.2
  },
  {
    name: "Lisa Zhang",
    quote: "StockRadar's predictions have helped me avoid several potential losses. It's like having a personal financial advisor.",
    rating: 5,
    speed: 1
  },
  {
    name: "James Anderson",
    quote: "The interface is intuitive and the insights are presented in an easy-to-understand format.",
    rating: 5,
    speed: 1.2
  }
];

const TestimonialCard = ({ testimonial, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.7,
          ease: "easeOut",
          delay: index * 0.2
        }
      });
    }
  }, [isInView, controls, index]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={controls}
      className="bg-black/30 backdrop-blur-xl rounded-[24px] p-8 border border-gray-800/50 hover:border-primary/30 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-primary/5"
      style={{
        willChange: "transform",
        transform: `translateY(${testimonial.speed === 1.2 ? "-10%" : "0"})`
      }}
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="flex gap-1">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-primary text-primary" />
          ))}
        </div>
      </div>
      <p className="text-gray-300 font-light leading-relaxed mb-4">{testimonial.quote}</p>
      <p className="text-sm text-primary/80 italic">{testimonial.name}</p>
    </motion.div>
  );
};

const Testimonials = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <section ref={containerRef} className="py-24 px-4 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-transparent pointer-events-none" />
      
      <motion.div style={{ opacity }} className="container mx-auto relative z-10">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <span className="text-primary">Our Community</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-light text-center mb-16 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          What Our Users Say
        </h2>

        <motion.div 
          style={{ y }}
          className="grid md:grid-cols-3 gap-8 px-4"
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={index} 
              testimonial={testimonial} 
              index={index} 
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Testimonials;