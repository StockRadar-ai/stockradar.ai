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
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        cursor-pointer rounded-xl p-6
        bg-black/40 backdrop-blur-lg
        border border-gray-800/50
        transition-all duration-300
        hover:shadow-lg hover:shadow-primary/5
        ${isSelected ? 'border-primary shadow-lg shadow-primary/20' : 'hover:border-gray-700'}
      `}
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </motion.div>
  );
};

export default DashboardOption;