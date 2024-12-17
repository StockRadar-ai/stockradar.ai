import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const MAX_USES = 5;

const UsageTracker = () => {
  const [uses, setUses] = useState(0);
  const { toast } = useToast();
  
  useEffect(() => {
    // Load uses from localStorage
    const lastReset = localStorage.getItem('lastUsageReset');
    const currentUses = localStorage.getItem('currentUses');
    
    const now = new Date();
    const today = now.toDateString();
    
    if (lastReset !== today) {
      // Reset uses at midnight
      localStorage.setItem('lastUsageReset', today);
      localStorage.setItem('currentUses', '0');
      setUses(0);
    } else if (currentUses) {
      setUses(parseInt(currentUses));
    }
  }, []);

  const incrementUse = () => {
    if (uses >= MAX_USES) {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      const timeLeft = tomorrow.getTime() - now.getTime();
      const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
      const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

      toast({
        title: "Out of uses!",
        description: `Please wait for ${hoursLeft}h ${minutesLeft}m for your uses to restock!`,
        variant: "destructive",
      });
      return false;
    }
    
    const newUses = uses + 1;
    setUses(newUses);
    localStorage.setItem('currentUses', newUses.toString());
    return true;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 right-4 bg-black/40 backdrop-blur-md border border-gray-800/50 rounded-lg px-4 py-2 text-sm flex items-center gap-2"
    >
      <AlertCircle className="h-4 w-4 text-primary" />
      <span>Remaining uses: {MAX_USES - uses}/{MAX_USES}</span>
    </motion.div>
  );
};

export { UsageTracker, MAX_USES };