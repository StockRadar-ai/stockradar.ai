import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { auth } from "@/services/firebase";
import PaymentDialog from "./PaymentDialog";

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