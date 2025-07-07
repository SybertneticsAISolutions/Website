import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBQBNVFIUX4cv8iYMQ9vrh8dbfyraaqcPI",
  authDomain: "sybertnetics-webpage.firebaseapp.com",
  projectId: "sybertnetics-webpage",
  storageBucket: "sybertnetics-webpage.firebasestorage.app",
  messagingSenderId: "366404787585",
  appId: "1:366404787585:web:6b354b24a466b7d1875c80",
  measurementId: "G-BSRCLV2205"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Initialize Analytics only on client side
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// Types
export interface BetaSignup {
  id?: string;
  email: string;
  name?: string;
  discord?: string;
  experience?: string;
  interests?: string[];
  timestamp: Date;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  timestamp: Date;
}

// Beta signup functions
export const addBetaSignup = async (signupData: Omit<BetaSignup, 'id' | 'timestamp'>) => {
  try {
    const docRef = await addDoc(collection(db, 'beta-signups'), {
      ...signupData,
      timestamp: new Date()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding beta signup:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

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

// Contact form functions
export const addContactMessage = async (messageData: Omit<ContactMessage, 'id' | 'timestamp'>) => {
  try {
    const docRef = await addDoc(collection(db, 'contact-messages'), {
      ...messageData,
      timestamp: new Date()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding contact message:', error);
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
      loginEmail = `${email.toLowerCase()}@sybertnetics.com`;
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