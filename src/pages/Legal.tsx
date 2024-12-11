import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

const Legal = () => {
  const { type } = useParams();

  const content = {
    imprint: {
      title: "Imprint",
      content: `
        StockRadar AI
        [Your Company Address]
        Email: contact@stockradar.ai

        Represented by: [Your Name]
        Register Entry: [Registration Details]
        VAT ID: [Your VAT ID]
      `
    },
    liability: {
      title: "Limitation of Liability",
      content: `
        1. Content Liability
        The contents of our pages have been created with utmost care. However, we cannot guarantee the accuracy, completeness, or topicality of our content.

        2. Link Liability
        Our offer contains links to external third-party websites, over whose contents we have no influence. Therefore, we cannot assume any liability for these external contents.

        3. Copyright
        The contents and works created by the site operators on these pages are subject to copyright law.
      `
    }
  };

  const pageContent = type === 'imprint' ? content.imprint : content.liability;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#151821] via-[#1E2330] to-[#2A2F3C]">
      <div className="flex items-center p-4 fixed w-full top-0 bg-black/60 backdrop-blur-lg">
        <a href="/" className="flex items-center space-x-2">
          <img src="/lovable-uploads/c22f3ef4-7e97-4460-a322-3b100bcd6d45.png" alt="StockRadar Logo" className="h-8 w-8" />
          <span className="text-xl font-semibold">StockRadar</span>
        </a>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 container mx-auto px-4 pt-24 pb-12"
      >
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">{pageContent.title}</h1>
          <div className="prose prose-invert max-w-none">
            <pre className="whitespace-pre-wrap font-sans text-gray-400">
              {pageContent.content}
            </pre>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Legal;