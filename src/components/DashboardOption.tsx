import { motion } from "framer-motion";

interface DashboardOptionProps {
  title: string;
  description: string;
  onClick: () => void;
  isSelected: boolean;
}

const DashboardOption = ({ title, description, onClick, isSelected }: DashboardOptionProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}  // Reduced from 1.02
      whileTap={{ scale: 0.99 }}    // Reduced from 0.98
      onClick={onClick}
      className={`
        cursor-pointer rounded-xl p-6
        bg-black/40 backdrop-blur-lg
        border border-gray-800/50
        transition-all duration-300
        hover:shadow-sm hover:shadow-primary/5  // Reduced from shadow-lg
        ${isSelected ? 'border-primary shadow-md shadow-primary/20' : 'hover:border-gray-700'}
      `}
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </motion.div>
  );
};

export default DashboardOption;