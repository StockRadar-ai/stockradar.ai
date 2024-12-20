import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { auth } from "@/services/firebase";
import { supabase } from "@/integrations/supabase/client";

const MAX_USES = 5;

const UsageTracker = () => {
  const [uses, setUses] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    const checkSubscriptionAndUsage = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          setIsSubscribed(false);
          return;
        }

        // First check if record exists
        let { data, error } = await supabase
          .from('user_analytics')
          .select('subscription, requests')
          .eq('user_id', user.uid)
          .single();

        if (error && error.code === 'PGRST116') {
          // Record doesn't exist, create it
          const { data: insertData, error: insertError } = await supabase
            .from('user_analytics')
            .insert({
              user_id: user.uid,
              email: user.email,
              subscription: 'Basic',
              requests: 0
            })
            .select()
            .single();

          if (insertError) {
            console.error('Error inserting user analytics:', insertError);
            return;
          }

          data = insertData;
        } else if (error) {
          console.error('Error fetching user analytics:', error);
          return;
        }

        setIsSubscribed(data?.subscription === 'Premium');
        setUses(data?.requests || 0);
      } catch (error) {
        console.error('Error checking subscription and usage:', error);
      }
    };

    checkSubscriptionAndUsage();
  }, []);

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