import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Ban, UserPlus, Shield, Activity } from "lucide-react";

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Mock data - In a real app, this would come from your backend
  const mockUsers = [
    { id: 1, email: "user1@example.com", subscription: "Premium", status: "Active", requests: 23 },
    { id: 2, email: "user2@example.com", subscription: "Basic", status: "Banned", requests: 5 },
    { id: 3, email: "user3@example.com", subscription: "Premium", status: "Active", requests: 45 },
  ];

  const pieData = [
    { name: "Premium Users", value: 63 },
    { name: "Basic Users", value: 37 },
  ];

  const activityData = [
    { name: "Mon", requests: 24 },
    { name: "Tue", requests: 35 },
    { name: "Wed", requests: 42 },
    { name: "Thu", requests: 38 },
    { name: "Fri", requests: 45 },
    { name: "Sat", requests: 32 },
    { name: "Sun", requests: 28 },
  ];

  const COLORS = ["#FF4500", "#FF6A33"];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Hardcoded credentials check
      if (username === "admin" && password === "PH@X@swi-1@lCrL49GO#") {
        setIsAuthenticated(true);
        toast.success("Successfully logged in as admin!");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-[#141414]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 flex items-center justify-center p-4"
        >
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Admin Access</h2>
              <p className="text-gray-400">Secure admin dashboard login</p>
            </div>

            <form onSubmit={handleLogin} className="mt-8 space-y-6 bg-black/40 backdrop-blur-lg border border-gray-800/50 rounded-lg p-8">
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary-hover h-12 transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? "Authenticating..." : "Access Dashboard"}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#141414] text-white p-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <img src="/lovable-uploads/c22f3ef4-7e97-4460-a322-3b100bcd6d45.png" alt="Logo" className="h-8 w-8" />
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          </div>
          <Button
            variant="outline"
            onClick={() => setIsAuthenticated(false)}
            className="border-gray-700 hover:bg-gray-800"
          >
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-black/40 backdrop-blur-lg border border-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Total Users</h3>
            <p className="text-4xl font-bold text-primary">1,234</p>
            <p className="text-gray-400 mt-2">+12% from last month</p>
          </div>
          
          <div className="bg-black/40 backdrop-blur-lg border border-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Active Subscriptions</h3>
            <p className="text-4xl font-bold text-primary">856</p>
            <p className="text-gray-400 mt-2">+8% from last month</p>
          </div>
          
          <div className="bg-black/40 backdrop-blur-lg border border-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Total Requests</h3>
            <p className="text-4xl font-bold text-primary">45,678</p>
            <p className="text-gray-400 mt-2">+15% from last month</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-black/40 backdrop-blur-lg border border-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Weekly Activity</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#000', 
                      border: '1px solid #333',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="requests" 
                    stroke="#FF4500" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-lg border border-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">User Distribution</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#000', 
                      border: '1px solid #333',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-black/40 backdrop-blur-lg border border-gray-800/50 rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">User Management</h3>
            <div className="flex space-x-4">
              <Button variant="outline" className="border-gray-700 hover:bg-gray-800">
                <UserPlus className="w-4 h-4 mr-2" />
                Add User
              </Button>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search users..."
                  className="pl-10 bg-black/50 border-gray-700 focus:border-primary"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Subscription</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total Requests</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.subscription}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.status === 'Active' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                      }`}>
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell>{user.requests}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="border-gray-700 hover:bg-gray-800">
                          <Activity className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="border-gray-700 hover:bg-gray-800">
                          <Ban className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;