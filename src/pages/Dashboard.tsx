import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import DashboardOption from "@/components/DashboardOption";
import ChatInterface from "@/components/ChatInterface";
import SavedChats from "@/components/SavedChats";
import SettingsModal from "@/components/Settings";
import { useToast } from "@/components/ui/use-toast";
import { UsageTracker } from "@/components/UsageTracker";

const Dashboard = () => {
  const [showGreeting, setShowGreeting] = useState(true);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [showSavedChats, setShowSavedChats] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const key = localStorage.getItem("licenseKey");

  useEffect(() => {
    if (!key) {
      navigate("/login");
      return;
    }
  }, [key, navigate]);

  const handleOptionClick = (option: string) => {
    setShowGreeting(false);
    setSelectedOption(option);
    if (option !== "Stocks of the Week") {
      setShowChat(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      {/* Top Bar */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 w-full bg-black/60 backdrop-blur-lg border-b border-gray-800/50 z-50"
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src="/lovable-uploads/c22f3ef4-7e97-4460-a322-3b100bcd6d45.png" alt="Logo" className="h-8 w-8" />
            <span className="text-xl font-semibold">StockRadar</span>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            className="hover:bg-gray-800/50"
            onClick={() => setShowSettings(true)}
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </motion.div>

      {/* Usage Tracker */}
      <UsageTracker />

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-32 pb-16">
        <AnimatePresence>
          {showGreeting && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center mb-16"
            >
              <h1 className="text-3xl font-bold mb-2">Hi there!</h1>
              <p className="text-gray-400">Can I help you with anything?</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Options Grid */}
        <AnimatePresence>
          {!showChat && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 mt-16"
            >
              <DashboardOption
                title="Stocks of the Week"
                description="Get this week's top stock picks"
                onClick={() => handleOptionClick("Stocks of the Week")}
                isSelected={selectedOption === "Stocks of the Week"}
              />
              <DashboardOption
                title="Stock Analysis"
                description="Analyze any stock in detail"
                onClick={() => handleOptionClick("Stock Analysis")}
                isSelected={selectedOption === "Stock Analysis"}
              />
              <DashboardOption
                title="Chart Explanation"
                description="Understand chart patterns"
                onClick={() => handleOptionClick("Chart Explanation")}
                isSelected={selectedOption === "Chart Explanation"}
              />
              <DashboardOption
                title="Strategy Builder"
                description="Create custom trading strategies"
                onClick={() => handleOptionClick("Strategy Builder")}
                isSelected={selectedOption === "Strategy Builder"}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Interface */}
        <AnimatePresence>
          {showChat && (
            <ChatInterface 
              option={selectedOption!} 
              onClose={() => {
                setShowChat(false);
                setSelectedOption(null);
                setShowGreeting(true);
              }}
            />
          )}
        </AnimatePresence>

        {/* Saved Chats Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed bottom-6 left-6"
        >
          <Button
            variant="outline"
            className="bg-black/40 backdrop-blur-md border-gray-800 hover:bg-gray-800/50"
            onClick={() => setShowSavedChats(true)}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Chats
          </Button>
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm text-gray-500 mt-8"
        >
          Not financial Advice. Always do your own research.
        </motion.p>

        {/* Saved Chats Modal */}
        <AnimatePresence>
          {showSavedChats && (
            <SavedChats onClose={() => setShowSavedChats(false)} />
          )}
        </AnimatePresence>
      </div>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <SettingsModal 
            onClose={() => setShowSettings(false)}
            licenseKey={key || ''}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
