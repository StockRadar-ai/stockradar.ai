import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { auth } from "@/services/firebase";

const MAX_USES = 5;

const UsageTracker = () => {
  const [uses, setUses] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          setIsSubscribed(false);
          return;
        }

        const token = await user.getIdToken();
        const response = await fetch('https://0068-2a01-41e3-2bd3-a100-f85b-46e6-96d4-378b.ngrok-free.app/api/auth/check-subscription', {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });

        if (!response.ok) {
          throw new Error('Failed to check subscription');
        }

        const data = await response.json();
        setIsSubscribed(data.subscribed);
      } catch (error) {
        console.error('Error checking subscription:', error);
      }
    };

    checkSubscription();
  }, []);

  useEffect(() => {
    if (!isSubscribed) return;

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
  }, [isSubscribed]);

  if (!isSubscribed) return null;

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