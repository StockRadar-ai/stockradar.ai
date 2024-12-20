import { auth } from '@/services/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

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
  try {
    if (auth.currentUser && updates.name) {
      await updateProfile(auth.currentUser, {
        displayName: updates.name
      });
    }
    return { error: null };
  } catch (error: any) {
    console.log("Profile update error:", error);
    return { error };
  }
}