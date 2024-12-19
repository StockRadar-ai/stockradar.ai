import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { auth } from "@/services/firebase";
import PaymentDialog from "./PaymentDialog";
import { supabase } from "@/integrations/supabase/client";

interface SubscriptionCheckProps {
  children: React.ReactNode;
}

const SubscriptionCheck = ({ children }: SubscriptionCheckProps) => {
  const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          setIsSubscribed(false);
          return;
        }

        // Create analytics record if it doesn't exist
        const { error: upsertError } = await supabase
          .from('user_analytics')
          .upsert({
            user_id: user.uid,
            email: user.email,
            subscription: 'Basic',
            requests: 0
          }, {
            onConflict: 'user_id'
          });

        if (upsertError) {
          console.error('Error upserting user analytics:', upsertError);
          return;
        }

        // Check subscription status
        const { data, error } = await supabase
          .from('user_analytics')
          .select('subscription')
          .eq('user_id', user.uid)
          .single();

        if (error) {
          throw error;
        }

        setIsSubscribed(data?.subscription === 'Premium');
      } catch (error) {
        console.error('Error checking subscription:', error);
        toast({
          title: "Error",
          description: "Failed to verify subscription status",
          variant: "destructive",
        });
      }
    };

    checkSubscription();
  }, []);

  if (isSubscribed === null) {
    return null; // Loading state
  }

  if (!isSubscribed) {
    return (
      <>
        <div onClick={() => setShowPayment(true)}>
          {children}
        </div>
        <PaymentDialog
          open={showPayment}
          onOpenChange={setShowPayment}
        />
      </>
    );
  }

  return <>{children}</>;
};

export default SubscriptionCheck;