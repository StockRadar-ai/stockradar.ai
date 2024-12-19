import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBiZUGdA-q7EjpkimmxnI8qmHp3s7qz7HE",
  authDomain: "stockradarr.firebaseapp.com",
  projectId: "stockradarr",
  storageBucket: "stockradarr.firebasestorage.app",
  messagingSenderId: "939030826463",
  appId: "1:939030826463:web:1a2deb5b6a1144443f086a",
  measurementId: "G-JTKL367XE3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const loginWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const signUpWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};