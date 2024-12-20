import { motion } from "framer-motion";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  userName: string | null;
  onSettingsClick: () => void;
}

const DashboardHeader = ({ userName, onSettingsClick }: DashboardHeaderProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 w-full bg-black/60 backdrop-blur-lg border-b border-gray-800/50 z-50"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img src="/lovable-uploads/c22f3ef4-7e97-4460-a322-3b100bcd6d45.png" alt="Logo" className="h-8 w-8" />
          <span className="text-xl font-semibold">StockRadar</span>
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          className="hover:bg-gray-800/50"
          onClick={onSettingsClick}
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </motion.div>
  );
};

export default DashboardHeader;