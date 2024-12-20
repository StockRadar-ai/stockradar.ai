import { motion } from "framer-motion";

interface DashboardGreetingProps {
  userName: string | null;
  showGreeting: boolean;
}

const DashboardGreeting = ({ userName, showGreeting }: DashboardGreetingProps) => {
  if (!showGreeting) return null;

  return (
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
  );
};

export default DashboardGreeting;