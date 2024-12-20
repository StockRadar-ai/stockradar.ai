import { motion } from "framer-motion";
import { X, Trash2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChatInterface from "./ChatInterface";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface SavedChatsProps {
  onClose: () => void;
}

const SavedChats = ({ onClose }: SavedChatsProps) => {
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDeleteAllDialog, setShowDeleteAllDialog] = useState(false);
  const [chatToDelete, setChatToDelete] = useState<number | null>(null);
  const [savedChats, setSavedChats] = useState(() => {
    const chats = JSON.parse(localStorage.getItem('savedChats') || '[]');
    return chats.map((chat: any) => ({ ...chat, favorite: false }));
  });

  const handleChatClick = (chat: any) => {
    setSelectedChat(chat);
  };

  const handleDeleteChat = (index: number) => {
    setChatToDelete(index);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (chatToDelete !== null) {
      const newChats = savedChats.filter((_, idx) => idx !== chatToDelete);
      setSavedChats(newChats);
      localStorage.setItem('savedChats', JSON.stringify(newChats));
      setShowDeleteDialog(false);
      setChatToDelete(null);
    }
  };

  const handleDeleteAll = () => {
    setShowDeleteAllDialog(true);
  };

  const confirmDeleteAll = () => {
    const favoriteChats = savedChats.filter(chat => chat.favorite);
    setSavedChats(favoriteChats);
    localStorage.setItem('savedChats', JSON.stringify(favoriteChats));
    setShowDeleteAllDialog(false);
  };

  const toggleFavorite = (index: number) => {
    const newChats = [...savedChats];
    newChats[index].favorite = !newChats[index].favorite;
    setSavedChats(newChats);
    localStorage.setItem('savedChats', JSON.stringify(newChats));
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

  const favoriteChats = savedChats.filter(chat => chat.favorite);
  const regularChats = savedChats.filter(chat => !chat.favorite);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50"
    >
      <div className="container mx-auto px-4 py-8 h-full overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">All Queries</h2>
          <div className="flex items-center space-x-2">
            <Button 
              variant="destructive"
              size="sm"
              onClick={handleDeleteAll}
              className="mr-2"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete All
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {favoriteChats.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-primary">Favorites</h3>
            <div className="space-y-4">
              {favoriteChats.map((chat: any, idx: number) => (
                <motion.div
                  key={`favorite-${idx}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-black/40 backdrop-blur-lg border border-gray-800/50 rounded-lg p-4 relative"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">{chat.option}</h3>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-yellow-500"
                        onClick={() => toggleFavorite(savedChats.indexOf(chat))}
                      >
                        <Star className="h-4 w-4 fill-current" />
                      </Button>
                      <span className="text-sm text-gray-400">
                        {new Date(chat.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div 
                    className="text-sm text-gray-300 cursor-pointer"
                    onClick={() => handleChatClick(chat)}
                  >
                    Query: {chat.userQuery}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-4">
          {regularChats.map((chat: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-black/40 backdrop-blur-lg border border-gray-800/50 rounded-lg p-4 relative"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">{chat.option}</h3>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleFavorite(savedChats.indexOf(chat))}
                  >
                    <Star className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500"
                    onClick={() => handleDeleteChat(savedChats.indexOf(chat))}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-gray-400">
                    {new Date(chat.timestamp).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div 
                className="text-sm text-gray-300 cursor-pointer"
                onClick={() => handleChatClick(chat)}
              >
                Query: {chat.userQuery}
              </div>
            </motion.div>
          ))}
          {savedChats.length === 0 && (
            <p className="text-center text-gray-400">No saved queries yet</p>
          )}
        </div>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Query</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this query? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showDeleteAllDialog} onOpenChange={setShowDeleteAllDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete All Queries</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete all non-favorite queries? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteAll} className="bg-red-500 hover:bg-red-600">
              Delete All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
};

export default SavedChats;