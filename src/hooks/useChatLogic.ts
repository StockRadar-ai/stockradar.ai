import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/services/firebase";

const useChatLogic = (
  option: string,
  initialMessages?: Array<{ role: 'user' | 'assistant', content: string }>,
  isExistingChat?: boolean
) => {
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

  useEffect(() => {
    if (initialMessages && option === "Stocks of the Week" && !isExistingChat) {
      handleSubmit("Show me the stocks of the week");
    }
  }, []);

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
      }, 2.5);

      return () => {
        if (typingInterval.current) {
          clearInterval(typingInterval.current);
        }
      };
    }
  }, [fullContent]);

  const handleSubmit = async (userMessage: string) => {
    if (hasSubmitted) return;
    
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);
    setIsGenerating(true);
    setHasSubmitted(true);

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
        setHasSubmitted(false);
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

  return {
    messages,
    isLoading,
    displayedContent,
    isGenerating,
    hasSubmitted,
    handleSubmit,
    handleStopGeneration
  };
};

export default useChatLogic;