import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import useChatLogic from "@/hooks/useChatLogic";

interface ChatContainerProps {
  option: string;
  onClose: () => void;
  initialMessages?: Array<{ role: 'user' | 'assistant', content: string }>;
  isExistingChat?: boolean;
}

const ChatContainer = ({ option, onClose, initialMessages, isExistingChat }: ChatContainerProps) => {
  const {
    messages,
    isLoading,
    displayedContent,
    isGenerating,
    hasSubmitted,
    handleSubmit,
    handleStopGeneration
  } = useChatLogic(option, initialMessages, isExistingChat);

  const getPlaceholder = (option: string) => {
    const placeholders = {
      "Stocks of the Week": "Press enter to get this week's top stock picks...",
      "Stock Analysis": "Enter a stock symbol or company name to analyze...",
      "Chart Explanation": "Enter a stock symbol to explain its chart patterns...",
      "Strategy Builder": "Describe your trading goals for a personalized strategy..."
    };
    return placeholders[option as keyof typeof placeholders] || "Enter your query...";
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
        
        {!hasSubmitted && option !== "Stocks of the Week" && (
          <div className="mt-auto">
            <ChatInput 
              onSubmit={handleSubmit}
              isLoading={isLoading}
              placeholder={getPlaceholder(option)}
              isGenerating={isGenerating}
              onStopGeneration={handleStopGeneration}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ChatContainer;