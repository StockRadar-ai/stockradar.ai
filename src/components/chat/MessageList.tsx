import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import ResponseFormatter from "./ResponseFormatter";
import { Loader2 } from "lucide-react";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  displayedContent: string;
}

const MessageList = ({ messages, isLoading, displayedContent }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, displayedContent]);

  return (
    <div className="space-y-4 mb-4">
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
          {msg.role === 'assistant' && idx === messages.length - 1 ? (
            <ResponseFormatter content={displayedContent || msg.content} />
          ) : (
            msg.role === 'assistant' ? (
              <ResponseFormatter content={msg.content} />
            ) : (
              msg.content
            )
          )}
        </motion.div>
      ))}
      {isLoading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-800/50 p-4 rounded-lg mr-auto max-w-[80%] flex items-center justify-center"
        >
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </motion.div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;