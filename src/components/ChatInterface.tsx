import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import MessageList from "./chat/MessageList";
import ChatInput from "./chat/ChatInput";
import { UsageTracker, MAX_USES } from "./UsageTracker";

interface ChatInterfaceProps {
  option: string;
  onClose: () => void;
}

const ChatInterface = ({ option, onClose }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([]);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const usageTrackerRef = useRef<{ incrementUse: () => boolean }>();

  const handleSubmit = async (userMessage: string) => {
    if (!usageTrackerRef.current?.incrementUse()) {
      return;
    }

    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Here we would integrate with Perplexity API
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: `This is a placeholder response for ${option}. In the real implementation, this would come from the Perplexity API.` 
        }]);
        setIsLoading(false);
      }, 1000);

      // Save chat to local storage
      const savedChats = JSON.parse(localStorage.getItem('savedChats') || '[]');
      savedChats.push({
        option,
        timestamp: new Date().toISOString(),
        messages: [...messages, { role: 'user', content: userMessage }]
      });
      localStorage.setItem('savedChats', JSON.stringify(savedChats));

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  return (
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

        <MessageList messages={messages} isLoading={isLoading} />
        
        <ChatInput 
          onSubmit={handleSubmit}
          isLoading={isLoading}
          placeholder={`Enter your ${option.toLowerCase()} query...`}
        />
      </div>
    </motion.div>
  );
};

export default ChatInterface;