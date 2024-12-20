import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Legal from "./pages/Legal";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";
import { supabase } from "@/integrations/supabase/client";
import { Toaster } from "sonner";

function App() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session:", session);
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state changed:", session ? "logged in" : "logged out");
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Show loading state
  if (loading) {
    return null;
  }

  return (
    <>
      <Toaster position="top-center" />
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route 
            path="/login" 
            element={!session ? <Login /> : <Navigate to="/dashboard" replace />} 
          />
          <Route 
            path="/signup" 
            element={!session ? <SignUp /> : <Navigate to="/dashboard" replace />} 
          />
          <Route 
            path="/dashboard" 
            element={session ? <Dashboard /> : <Navigate to="/login" replace />} 
          />
          <Route path="/legal" element={<Legal />} />
          <Route path="/admin-x9kp2m" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;