import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Login = () => {
  const [key, setKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Here you would integrate with KeyAuth
      // For now, we'll just show a success message
      toast.success("Successfully logged in!");
      // Redirect to dashboard or main app
    } catch (error) {
      toast.error("Invalid license key");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#151821] via-[#1E2330] to-[#2A2F3C]">
      <div className="w-full max-w-md p-8 space-y-8 bg-black/40 backdrop-blur-lg rounded-lg border border-gray-800">
        <div className="text-center">
          <img
            src="/lovable-uploads/c22f3ef4-7e97-4460-a322-3b100bcd6d45.png"
            alt="StockRadar Logo"
            className="h-12 w-12 mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold text-white">Login to Start</h2>
          <p className="text-gray-400 mt-2">with your first analysis!</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <Input
              type="text"
              placeholder="Please enter your Key"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="bg-black/50 border-gray-700 focus:border-primary"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary-hover hover-glow transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Continue"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;