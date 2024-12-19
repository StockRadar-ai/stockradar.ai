import { supabase } from "@/integrations/supabase/client";

export interface UserData {
  id: string;
  email: string;
  subscription: string;
  status: string;
  requests: number;
  created_at: Date;
  last_login: Date;
}

export const fetchUsers = async (): Promise<UserData[]> => {
  const { data, error } = await supabase
    .from('user_analytics')
    .select('*');
  
  if (error) throw error;
  return data || [];
};

export const updateUserSubscription = async (userId: string, subscription: string) => {
  const { error } = await supabase
    .from('user_analytics')
    .update({ subscription })
    .eq('user_id', userId);
  
  if (error) throw error;
};

export const banUser = async (userId: string, banned: boolean) => {
  const { error } = await supabase
    .from('user_analytics')
    .update({ status: banned ? 'Banned' : 'Active' })
    .eq('user_id', userId);
  
  if (error) throw error;
};

export const getAnalytics = async () => {
  const { data, error } = await supabase
    .from('user_analytics')
    .select('*');
  
  if (error) throw error;
  
  const users = data || [];
  return {
    totalUsers: users.length,
    premiumUsers: users.filter(u => u.subscription === 'Premium').length,
    basicUsers: users.filter(u => u.subscription === 'Basic').length,
    totalRequests: users.reduce((acc, u) => acc + (u.requests || 0), 0),
    averageRequests: users.length > 0 
      ? users.reduce((acc, u) => acc + (u.requests || 0), 0) / users.length 
      : 0,
    users
  };
};