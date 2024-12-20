import { Input } from "@/components/ui/input";

interface AuthFormInputsProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
}

export const AuthFormInputs = ({ 
  email, 
  setEmail, 
  password, 
  setPassword 
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
    </div>
  );
};