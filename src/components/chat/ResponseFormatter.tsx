import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface ResponseFormatterProps {
  content: string;
}

const ResponseFormatter = ({ content }: ResponseFormatterProps) => {
  const formatLine = (line: string, index: number) => {
    // Handle headings with # or ##
    if (line.match(/^#+/)) {
      const level = line.match(/^#+/)[0].length;
      const text = line
        .replace(/^#+/, "") // Remove heading markers
        .replace(/\*\*/g, "") // Remove bold markers
        .trim();
      
      const fontSize = {
        1: "text-2xl",
        2: "text-xl",
        3: "text-lg"
      }[level] || "text-base";

      return (
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          key={index}
          className={`${fontSize} font-bold text-primary my-5`}
        >
          {text}
        </motion.h3>
      );
    }
    
    // Handle list items
    if (line.startsWith("-") || line.startsWith("*")) {
      return (
        <motion.li
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          key={index}
          className="ml-6 my-2 flex items-start"
        >
          <span className="text-primary mr-2">•</span>
          {line.replace(/^[-*]/, "").replace(/\*\*/g, "").trim()}
        </motion.li>
      );
    }
    
    // Handle bold text
    if (line.includes("**")) {
      return (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={index}
          className="font-bold my-3"
        >
          {line.replace(/\*\*/g, "").trim()}
        </motion.p>
      );
    }
    
    // Handle italic text
    if (line.match(/(_.*_)/)) {
      return (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={index}
          className="italic my-3"
        >
          {line.replace(/^\_|\_$/g, "").trim()}
        </motion.p>
      );
    }
    
    // Regular paragraphs
    return (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        key={index}
        className="my-3"
      >
        {line.trim()}
      </motion.p>
    );
  };

  return (
    <div className="bg-black/40 backdrop-blur-lg p-6 rounded-lg shadow-lg">
      {content.split("\n").map((line, index) => formatLine(line, index))}
    </div>
  );
};

export default ResponseFormatter;