import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardFooterProps {
  onShowSavedChats: () => void;
}

const DashboardFooter = ({ onShowSavedChats }: DashboardFooterProps) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed bottom-6 left-6"
      >
        <Button
          variant="outline"
          className="bg-black/40 backdrop-blur-md border-gray-800 hover:bg-gray-800/50"
          onClick={onShowSavedChats}
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          All Queries
        </Button>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-sm text-gray-500 mt-8"
      >
        This is not financial advice. Always do your own research.
      </motion.p>
    </>
  );
};

export default DashboardFooter;