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
import { supabase } from "@/integrations/supabase/client";
import { auth } from "@/services/firebase";

const Dashboard = () => {
  const [showGreeting, setShowGreeting] = useState(true);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [showSavedChats, setShowSavedChats] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserName = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('user_analytics')
          .select('name')
          .eq('user_id', user.id)
          .single();

        if (data?.name) {
          setUserName(data.name);
        }
      }
    };

    fetchUserName();
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate('/login');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleOptionClick = async (option: string) => {
    setShowGreeting(false);
    setSelectedOption(option);

    if (option === "Stocks of the Week") {
      try {
        const user = auth.currentUser;
        if (!user) throw new Error("Not authenticated");

        const prefix = "Analyze the stock market for this week and identify the top-performing stocks based on the latest data from a fresh internet search. Include key performance indicators and reasons why these stocks stand out. Format the response professionally, starting with: 'These are the Top Stocks of the Week:'";

        const response = await fetch('https://api.perplexity.ai/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer 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',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'llama-3.1-sonar-small-128k-online',
            messages: [{ role: 'user', content: prefix }]
          }),
        });

        if (!response.ok) throw new Error('API request failed');

        const data = await response.json();
        const aiResponse = data.choices[0].message.content;
        
        // Save chat to local storage
        const savedChats = JSON.parse(localStorage.getItem('savedChats') || '[]');
        savedChats.push({
          option,
          timestamp: new Date().toISOString(),
          userQuery: "Stocks of the Week",
          messages: [
            { role: 'user', content: "Show me the stocks of the week" },
            { role: 'assistant', content: aiResponse }
          ]
        });
        localStorage.setItem('savedChats', JSON.stringify(savedChats));

        setShowChat(true);
      } catch (error) {
        console.error('Error:', error);
        toast({
          title: "Error",
          description: "Failed to get stocks of the week. Please try again.",
          variant: "destructive"
        });
      }
    } else {
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

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-32 pb-16">
        <AnimatePresence>
          {showGreeting && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center mb-64"
            >
              <h1 className="text-3xl font-bold mb-2">
                Hi there{userName ? <>, <span className="text-primary">{userName}</span></> : ""}!
              </h1>
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
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
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
              initialMessages={
                selectedOption === "Stocks of the Week" 
                  ? [
                      { role: 'user', content: "Show me the stocks of the week" }
                    ]
                  : undefined
              }
            />
          )}
        </AnimatePresence>

        {/* All Queries Button */}
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
            All Queries
          </Button>
        </motion.div>

        {/* Updated Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm text-gray-500 mt-8"
        >
          This is not financial advice. Always do your own research.
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
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;