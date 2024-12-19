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
  const { data: session } = await supabase.auth.getSession();
  if (!session?.session?.access_token) throw new Error('Not authenticated');

  const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-operations`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${session.session.access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ action: 'getAnalytics' })
  });

  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  const data = await response.json();
  return data.users;
};

export const updateUserSubscription = async (userId: string, subscription: string) => {
  const { data: session } = await supabase.auth.getSession();
  if (!session?.session?.access_token) throw new Error('Not authenticated');

  const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-operations`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${session.session.access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: 'updateUser',
      userId,
      data: { subscription }
    })
  });

  if (!response.ok) {
    throw new Error('Failed to update user subscription');
  }
};

export const banUser = async (userId: string, banned: boolean) => {
  const { data: session } = await supabase.auth.getSession();
  if (!session?.session?.access_token) throw new Error('Not authenticated');

  const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-operations`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${session.session.access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: 'updateUser',
      userId,
      data: { status: banned ? 'Banned' : 'Active' }
    })
  });

  if (!response.ok) {
    throw new Error('Failed to update user status');
  }
};

export const getAnalytics = async () => {
  const { data: session } = await supabase.auth.getSession();
  if (!session?.session?.access_token) throw new Error('Not authenticated');

  const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-operations`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${session.session.access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ action: 'getAnalytics' })
  });

  if (!response.ok) {
    throw new Error('Failed to fetch analytics');
  }

  return response.json();
};