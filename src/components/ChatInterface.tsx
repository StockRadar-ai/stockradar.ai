import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import MessageList from "./chat/MessageList";
import ChatInput from "./chat/ChatInput";
import { UsageTracker } from "./UsageTracker";
import SubscriptionCheck from "./SubscriptionCheck";
import { supabase } from "@/integrations/supabase/client";
import { auth } from "@/services/firebase";

interface ChatInterfaceProps {
  option: string;
  onClose: () => void;
}

const ChatInterface = ({ option, onClose }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([]);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [displayedContent, setDisplayedContent] = useState("");
  const [fullContent, setFullContent] = useState("");
  const usageTrackerRef = useRef<{ incrementUse: () => boolean }>();

  useEffect(() => {
    if (fullContent) {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= fullContent.length) {
          setDisplayedContent(fullContent.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 20); // Adjust speed here

      return () => clearInterval(interval);
    }
  }, [fullContent]);

  const handleSubmit = async (userMessage: string) => {
    if (!usageTrackerRef.current?.incrementUse()) {
      toast({
        title: "Usage limit reached",
        description: "Please upgrade your subscription to continue.",
        variant: "destructive"
      });
      return;
    }

    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Not authenticated");

      const response = await supabase.functions.invoke('analyze-stock', {
        body: { option, query: userMessage }
      });

      if (response.error) throw response.error;

      const aiResponse = response.data.choices[0].message.content;
      setFullContent(aiResponse);
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SubscriptionCheck>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-lg border-t border-gray-800/50 p-4 z-50"
      >
        <div className="container mx-auto max-w-4xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">{option}</h3>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <MessageList 
            messages={messages} 
            isLoading={isLoading} 
            displayedContent={displayedContent}
          />
          
          <ChatInput 
            onSubmit={handleSubmit}
            isLoading={isLoading}
            placeholder={`Enter your ${option.toLowerCase()} query...`}
          />
        </div>
      </motion.div>
    </SubscriptionCheck>
  );
};

export default ChatInterface;