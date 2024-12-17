import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Lock } from "lucide-react";

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PaymentDialog = ({ open, onOpenChange }: PaymentDialogProps) => {
  const features = [
    "High Quality Analysis",
    "Professional & Data Backed",
    "5 Analyses Daily",
    "Free Future Updates",
    "Easy & Intuitive to Use",
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-[#1A1A1A] border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Complete Your Purchase
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-4 space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-baseline border-b border-gray-800 pb-4">
              <span className="text-lg text-gray-300">StockRadar Access</span>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">$59.99</div>
                <div className="text-sm text-gray-400">One month access</div>
              </div>
            </div>
            
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-primary mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <Button 
              className="w-full h-12 bg-primary hover:bg-primary-hover transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
              onClick={() => {
                // Payment logic will be implemented later
                console.log("Process payment");
              }}
            >
              <Lock className="w-4 h-4 mr-2" />
              Pay Securely
            </Button>
            
            <p className="text-center text-sm text-gray-400">
              Your license key will be delivered instantly after payment
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;