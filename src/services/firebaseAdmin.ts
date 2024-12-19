import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

const initializeFirebaseAdmin = async () => {
  try {
    // Fetch credentials from Supabase
    const response = await fetch('/api/secrets/FIREBASE_ADMIN_CREDENTIALS');
    if (!response.ok) {
      throw new Error('Failed to fetch Firebase credentials');
    }
    const credentials = await response.json();

    if (getApps().length === 0) {
      initializeApp({
        credential: cert(credentials)
      });
    }

    return {
      auth: getAuth(),
      db: getFirestore()
    };
  } catch (error) {
    console.error('Error initializing Firebase Admin:', error);
    throw error;
  }
};

export const getFirebaseAdmin = async () => {
  return await initializeFirebaseAdmin();
};