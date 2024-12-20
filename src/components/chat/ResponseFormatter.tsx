import { motion } from "framer-motion";

interface ResponseFormatterProps {
  content: string;
}

const ResponseFormatter = ({ content }: ResponseFormatterProps) => {
  const formatLine = (line: string, index: number) => {
    // Handle headings
    if (line.startsWith("###")) {
      return (
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          key={index}
          className="text-xl font-semibold text-primary my-5"
        >
          {line.replace(/^###/, "").trim()}
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
          {line.replace(/^[-*]/, "").trim()}
        </motion.li>
      );
    }
    
    // Handle italic text
    if (line.match(/(\*\*\*.*\*\*\*|_.*_)/)) {
      return (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={index}
          className="italic my-3"
        >
          {line.replace(/^\*{3}|^\_|\*{3}$|\_$/, "").trim()}
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