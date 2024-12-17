import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SettingsProps {
  onClose: () => void;
  licenseKey: string;
}

const Settings = ({ onClose, licenseKey }: SettingsProps) => {
  const [isKeyVisible, setIsKeyVisible] = useState(false);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                   bg-black/80 backdrop-blur-lg border border-gray-800/50 
                   rounded-lg p-6 w-[90%] max-w-md z-50"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Settings</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-900/50 p-4 rounded-lg">
            <p className="text-sm text-gray-400 mb-2">License Key</p>
            <div 
              className={`font-mono text-sm transition-all duration-300 ${
                isKeyVisible ? '' : 'blur-sm'
              }`}
              onMouseEnter={() => setIsKeyVisible(true)}
              onMouseLeave={() => setIsKeyVisible(false)}
            >
              {licenseKey}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Settings;