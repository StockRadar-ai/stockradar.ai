import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import DashboardOption from "@/components/DashboardOption";
import ChatContainer from "@/components/chat/ChatContainer";
import SavedChats from "@/components/SavedChats";
import SettingsModal from "@/components/Settings";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardGreeting from "@/components/dashboard/DashboardGreeting";
import DashboardFooter from "@/components/dashboard/DashboardFooter";
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
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserName = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const { data, error } = await supabase
          .from('user_analytics')
          .select('name')
          .eq('user_id', currentUser.uid)
          .single();

        if (data?.name) {
          setUserName(data.name);
        }
      }
    };

    fetchUserName();
  }, []);

  const handleOptionClick = (option: string) => {
    setShowGreeting(false);
    setSelectedOption(option);
    setShowChat(true);
  };

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <DashboardHeader 
        userName={userName}
        onSettingsClick={() => setShowSettings(true)}
      />

      <div className="container mx-auto px-4 pt-32 pb-16">
        <AnimatePresence>
          <DashboardGreeting 
            userName={userName}
            showGreeting={showGreeting}
          />
        </AnimatePresence>

        <AnimatePresence>
          {!showChat && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
            </div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showChat && (
            <ChatContainer
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

        <DashboardFooter onShowSavedChats={() => setShowSavedChats(true)} />

        <AnimatePresence>
          {showSavedChats && (
            <SavedChats onClose={() => setShowSavedChats(false)} />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showSettings && (
            <SettingsModal onClose={() => setShowSettings(false)} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Dashboard;