import { getFirebaseAdmin } from './firebaseAdmin';

export interface UserData {
  id: string;
  email: string;
  subscription: string;
  status: string;
  requests: number;
  createdAt: Date;
  lastLogin: Date;
}

export const fetchUsers = async (): Promise<UserData[]> => {
  try {
    const { auth, db } = await getFirebaseAdmin();
    
    // Get all users from Firebase Auth
    const listUsersResult = await auth.listUsers();
    
    // Get additional user data from Firestore
    const usersSnapshot = await db.collection('users').get();
    const usersData = new Map(usersSnapshot.docs.map(doc => [doc.id, doc.data()]));
    
    return listUsersResult.users.map(user => {
      const userData = usersData.get(user.uid) || {};
      return {
        id: user.uid,
        email: user.email || '',
        subscription: userData.subscription || 'Basic',
        status: user.disabled ? 'Banned' : 'Active',
        requests: userData.requests || 0,
        createdAt: user.metadata.creationTime ? new Date(user.metadata.creationTime) : new Date(),
        lastLogin: user.metadata.lastSignInTime ? new Date(user.metadata.lastSignInTime) : new Date()
      };
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const updateUserSubscription = async (userId: string, subscription: string) => {
  try {
    const { db } = await getFirebaseAdmin();
    await db.collection('users').doc(userId).update({ subscription });
  } catch (error) {
    console.error('Error updating user subscription:', error);
    throw error;
  }
};

export const banUser = async (userId: string, banned: boolean) => {
  try {
    const { auth } = await getFirebaseAdmin();
    await auth.updateUser(userId, { disabled: banned });
  } catch (error) {
    console.error('Error updating user status:', error);
    throw error;
  }
};

export const getAnalytics = async () => {
  try {
    const { db } = await getFirebaseAdmin();
    const usersSnapshot = await db.collection('users').get();
    const users = usersSnapshot.docs.map(doc => doc.data());

    return {
      totalUsers: users.length,
      premiumUsers: users.filter(user => user.subscription === 'Premium').length,
      basicUsers: users.filter(user => user.subscription === 'Basic').length,
      totalRequests: users.reduce((acc, user) => acc + (user.requests || 0), 0),
      averageRequests: users.length > 0 
        ? users.reduce((acc, user) => acc + (user.requests || 0), 0) / users.length 
        : 0
    };
  } catch (error) {
    console.error('Error fetching analytics:', error);
    throw error;
  }
};