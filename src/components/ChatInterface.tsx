import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { UsageTracker, MAX_USES } from "./UsageTracker";

interface ChatInterfaceProps {
  option: string;
  onClose: () => void;
}

const ChatInterface = ({ option, onClose }: ChatInterfaceProps) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([]);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const usageTrackerRef = useRef<{ incrementUse: () => boolean }>();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Check usage limit
    if (!usageTrackerRef.current?.incrementUse()) {
      return;
    }

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Here we would integrate with Perplexity API
      // For now, just show a placeholder response
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

        <div className="space-y-4 mb-4 max-h-[400px] overflow-y-auto">
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-3 rounded-lg ${
                msg.role === 'user' 
                  ? 'bg-primary/20 ml-auto max-w-[80%]' 
                  : 'bg-gray-800/50 mr-auto max-w-[80%]'
              }`}
            >
              {msg.content}
            </motion.div>
          ))}
          {isLoading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gray-800/50 p-3 rounded-lg mr-auto max-w-[80%]"
            >
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200" />
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Enter your ${option.toLowerCase()} query...`}
            className="bg-black/40 border-gray-800"
          />
          <Button 
            type="submit" 
            disabled={isLoading}
            className="rounded-full aspect-square p-2"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </motion.div>
  );
};

export default ChatInterface;