import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Client SDK initialization
const firebaseConfig = {
  apiKey: "AIzaSyBQBNVFIUX4cv8iYMQ9vrh8dbfyraaqcPI",
  authDomain: "sybertnetics-webpage.firebaseapp.com",
  projectId: "sybertnetics-webpage",
  storageBucket: "sybertnetics-webpage.firebasestorage.app",
  messagingSenderId: "366404787585",
  appId: "1:366404787585:web:6b354b24a466b7d1875c80",
  measurementId: "G-BSRCLV2205"
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}
export const db = getFirestore();
export const auth = getAuth();

// Initialize Analytics only on client side
export const analytics = typeof window !== 'undefined' ? getAnalytics() : null;

// Types
export interface BetaSignup {
  id?: string;
  email: string;
  name?: string;
  discord?: string;
  experience?: string;
  interests?: string[];
  timestamp: Timestamp; // Use Firestore Timestamp for client
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  timestamp: Timestamp; // Use Firestore Timestamp for client
}

// Client-side functions
export const getBetaSignups = async () => {
  try {
    const q = query(collection(db, 'beta-signups'), orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);
    const signups: BetaSignup[] = [];
    querySnapshot.forEach((doc) => {
      signups.push({ id: doc.id, ...doc.data() } as BetaSignup);
    });
    return { success: true, data: signups };
  } catch (error) {
    console.error('Error getting beta signups:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

export const getContactMessages = async () => {
  try {
    const q = query(collection(db, 'contact-messages'), orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);
    const messages: ContactMessage[] = [];
    querySnapshot.forEach((doc) => {
      messages.push({ id: doc.id, ...doc.data() } as ContactMessage);
    });
    return { success: true, data: messages };
  } catch (error) {
    console.error('Error getting contact messages:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

// Admin authentication functions
export const adminLogin = async (email: string, password: string) => {
  try {
    // Handle case-insensitive username
    let loginEmail = email;
    
    // If it's not a full email, assume it's a username and append the domain
    if (!email.includes('@')) {
      // Handle the specific case of the admin username
      if (email.toLowerCase() === 'kaynbpellegrino') {
        loginEmail = 'kaynenbpellegrino@sybertnetics.com';
      } else {
      loginEmail = `${email.toLowerCase()}@sybertnetics.com`;
      }
    }
    
    const userCredential = await signInWithEmailAndPassword(auth, loginEmail, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('Error logging in:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

export const adminLogout = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Error logging out:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}; 