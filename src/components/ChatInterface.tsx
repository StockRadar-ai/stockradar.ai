import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import MessageList from "./chat/MessageList";
import ChatInput from "./chat/ChatInput";
import { supabase } from "@/integrations/supabase/client";
import { auth } from "@/services/firebase";

interface ChatInterfaceProps {
  option: string;
  onClose: () => void;
  initialMessages?: Array<{ role: 'user' | 'assistant', content: string }>;
}

const ChatInterface = ({ option, onClose, initialMessages }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>(
    initialMessages || []
  );
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [displayedContent, setDisplayedContent] = useState("");
  const [fullContent, setFullContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const abortController = useRef<AbortController | null>(null);
  const typingInterval = useRef<NodeJS.Timeout | null>(null);

  const getPlaceholder = (option: string) => {
    const placeholders = {
      "Stocks of the Week": "Press enter to get this week's top stock picks...",
      "Stock Analysis": "Enter a stock symbol or company name to analyze...",
      "Chart Explanation": "Enter a stock symbol to explain its chart patterns...",
      "Strategy Builder": "Describe your trading goals for a personalized strategy..."
    };
    return placeholders[option as keyof typeof placeholders] || "Enter your query...";
  };

  useEffect(() => {
    if (fullContent) {
      let currentIndex = 0;
      typingInterval.current = setInterval(() => {
        if (currentIndex <= fullContent.length) {
          setDisplayedContent(fullContent.slice(0, currentIndex));
          currentIndex++;
        } else {
          if (typingInterval.current) {
            clearInterval(typingInterval.current);
          }
          setIsGenerating(false);
        }
      }, 5); // Reduced from 10ms to 5ms for double speed

      return () => {
        if (typingInterval.current) {
          clearInterval(typingInterval.current);
        }
      };
    }
  }, [fullContent]);

  const getPrefix = (option: string) => {
    const prefixes = {
      "Stocks of the Week": "Analyze the stock market for this week and identify the top-performing stocks based on the latest data from a fresh internet search. Include key performance indicators and reasons why these stocks stand out. Format the response professionally, starting with: 'These are the Top Stocks of the Week:'",
      "Stock Analysis": `Perform a professional stock analysis based on the latest data from a fresh internet search. Focus on key metrics such as P/E ratio, revenue growth, and market trends. Additionally, analyze and color-code the following criteria:

ROIC%, Equity Growth%, EPS Growth%, Revenue Growth%, Free Cash Flow%:
- 10% or higher: 🟢 Green
- 8-10%: 🟡 Orange
- Below 8%: 🔴 Red

Debt Repayment Period:
- 3 years or less: 🟢 Green
- 3-4 years: 🟡 Orange
- 4 years or more: 🔴 Red

5-Year Performance:
- Above 200%: 🟢 Green
- 150-200%: 🟡 Orange
- Below 150%: 🔴 Red

Use extensive datapoints to ensure precise analysis. Provide a clear, concise, and professional explanation, starting with: 'Here is your Personalized Professional Stock Analysis:'`,
      "Chart Explanation": "Explain this stock chart in detail based on the latest data from a fresh internet search. Focus on trends, patterns, and key insights visible in the chart. Format the explanation professionally and begin with: 'Let me Explain this Chart to you!'",
      "Strategy Builder": "Develop a personalized stock trading strategy using insights from the latest data acquired through a fresh internet search. Provide actionable advice and clear steps, professionally formatted, beginning with: 'Here is your Personalized Strategy:'"
    };
    return prefixes[option as keyof typeof prefixes] || "";
  };

  const handleSubmit = async (userMessage: string) => {
    if (hasSubmitted) return; // Prevent multiple submissions
    
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);
    setIsGenerating(true);
    setHasSubmitted(true); // Mark as submitted after first query

    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Not authenticated");

      abortController.current = new AbortController();

      const prefix = getPrefix(option);
      const fullPrompt = `${prefix} ${userMessage}`;

      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer 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',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-small-128k-online',
          messages: [{ role: 'user', content: fullPrompt }]
        }),
        signal: abortController.current.signal
      });

      if (!response.ok) throw new Error('API request failed');

      const data = await response.json();
      const aiResponse = data.choices[0].message.content;
      
      // Save chat to local storage
      const savedChats = JSON.parse(localStorage.getItem('savedChats') || '[]');
      savedChats.push({
        option,
        timestamp: new Date().toISOString(),
        userQuery: userMessage,
        messages: [...messages, { role: 'user', content: userMessage }, { role: 'assistant', content: aiResponse }]
      });
      localStorage.setItem('savedChats', JSON.stringify(savedChats));

      setFullContent(aiResponse);
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      if (error.name === 'AbortError') {
        if (typingInterval.current) {
          clearInterval(typingInterval.current);
        }
        setIsGenerating(false);
        setDisplayedContent("");
        toast({
          title: "Generation stopped",
          description: "The AI response generation was stopped.",
          variant: "default"
        });
      } else {
        console.error('Error:', error);
        toast({
          title: "Error",
          description: "Failed to get response. Please try again.",
          variant: "destructive"
        });
        setHasSubmitted(false); // Reset on error to allow retry
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleStopGeneration = () => {
    if (abortController.current) {
      abortController.current.abort();
      if (typingInterval.current) {
        clearInterval(typingInterval.current);
      }
      setIsGenerating(false);
      setDisplayedContent("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50"
    >
      <div className="container mx-auto h-full flex flex-col p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{option}</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-grow overflow-y-auto mb-4">
          <MessageList 
            messages={messages} 
            isLoading={isLoading} 
            displayedContent={displayedContent}
          />
        </div>
        
        <div className="mt-auto">
          <ChatInput 
            onSubmit={handleSubmit}
            isLoading={isLoading}
            placeholder={getPlaceholder(option)}
            isGenerating={isGenerating}
            onStopGeneration={handleStopGeneration}
            disabled={hasSubmitted} // Disable input after first submission
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ChatInterface;