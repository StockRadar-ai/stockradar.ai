import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatInputProps {
  onSubmit: (message: string) => void;
  isLoading: boolean;
  placeholder: string;
}

const ChatInput = ({ onSubmit, isLoading, placeholder }: ChatInputProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSubmit(input.trim());
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={placeholder}
        className="bg-black/40 border-gray-800"
      />
      <Button 
        type="submit" 
        disabled={isLoading}
        className="rounded-full aspect-square p-2"
      >
        <ArrowRight className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default ChatInput;