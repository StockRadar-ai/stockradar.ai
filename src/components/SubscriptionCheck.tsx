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

        // First check if record exists
        const { data: existingData, error: fetchError } = await supabase
          .from('user_analytics')
          .select('subscription')
          .eq('user_id', user.uid)
          .maybeSingle();

        if (fetchError) {
          console.error('Error fetching user analytics:', fetchError);
          return;
        }

        // If no record exists, create one
        if (!existingData) {
          const { error: insertError } = await supabase
            .from('user_analytics')
            .insert({
              user_id: user.uid,
              email: user.email,
              subscription: 'Basic',
              requests: 0
            });

          if (insertError) {
            console.error('Error inserting user analytics:', insertError);
            return;
          }
          
          setIsSubscribed(false);
        } else {
          setIsSubscribed(existingData.subscription === 'Premium');
        }
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