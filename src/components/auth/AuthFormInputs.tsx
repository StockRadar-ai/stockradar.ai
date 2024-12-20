import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";

interface AuthFormInputsProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  rememberMe?: boolean;
  setRememberMe?: (checked: boolean) => void;
}

export const AuthFormInputs = ({ 
  email, 
  setEmail, 
  password, 
  setPassword,
  rememberMe,
  setRememberMe
}: AuthFormInputsProps) => {
  return (
    <div className="space-y-4">
      <Input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-black/50 border-gray-800 focus:border-primary h-12"
        required
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="bg-black/50 border-gray-800 focus:border-primary h-12"
        required
      />
      {setRememberMe && (
        <motion.div 
          className="flex items-center space-x-2"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Checkbox
            id="remember-me"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            className="border-gray-600 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
          />
          <label
            htmlFor="remember-me"
            className="text-sm text-gray-400 cursor-pointer select-none"
          >
            Remember me
          </label>
        </motion.div>
      )}
    </div>
  );
};