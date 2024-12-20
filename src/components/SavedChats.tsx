import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChatInterface from "./ChatInterface";
import { useState } from "react";

interface SavedChatsProps {
  onClose: () => void;
}

const SavedChats = ({ onClose }: SavedChatsProps) => {
  const savedChats = JSON.parse(localStorage.getItem('savedChats') || '[]');
  const [selectedChat, setSelectedChat] = useState<any>(null);

  const handleChatClick = (chat: any) => {
    setSelectedChat(chat);
  };

  if (selectedChat) {
    return (
      <ChatInterface
        option={selectedChat.option}
        onClose={() => setSelectedChat(null)}
        initialMessages={selectedChat.messages}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50"
    >
      <div className="container mx-auto px-4 py-8 h-full overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Saved Chats</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-4">
          {savedChats.map((chat: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-black/40 backdrop-blur-lg border border-gray-800/50 rounded-lg p-4 cursor-pointer hover:bg-black/60 transition-colors"
              onClick={() => handleChatClick(chat)}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">{chat.option}</h3>
                <span className="text-sm text-gray-400">
                  {new Date(chat.timestamp).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-gray-300">
                Query: {chat.userQuery}
              </p>
            </motion.div>
          ))}
          {savedChats.length === 0 && (
            <p className="text-center text-gray-400">No saved chats yet</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SavedChats;