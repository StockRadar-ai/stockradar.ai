import { auth } from '@/services/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export async function signInUser(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    console.log("Sign in error:", error);
    return { user: null, error };
  }
}

export async function signUpUser(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    console.log("Sign up error:", error);
    return { user: null, error };
  }
}

export async function updateUserProfile(userId: string, updates: { name?: string }) {
  const { error } = await supabase
    .from('user_analytics')
    .upsert({ 
      user_id: userId,
      email: auth.currentUser?.email || '',
      name: updates.name 
    });

  if (error) {
    console.log("Profile update error:", error);
  }

  return { error };
}