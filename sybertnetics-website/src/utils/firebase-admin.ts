import { initializeApp, getApps } from 'firebase-admin/app';
import { getFirestore, FieldValue, Timestamp } from 'firebase-admin/firestore';

// Types for backend operations. Duplicated to ensure full separation from client code.
export interface BetaSignup {
  id?: string;
  email: string;
  name?: string;
  discord?: string;
  experience?: string;
  interests?: string[];
  timestamp: Timestamp; // Using Admin SDK Timestamp
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  timestamp: Timestamp; // Using Admin SDK Timestamp
}

// Admin SDK initialization
if (!getApps().length) {
  initializeApp();
}
const adminDb = getFirestore();

// --- Backend-Only Functions ---

// Beta signup function (uses Admin SDK)
export const addBetaSignupAdmin = async (signupData: Omit<BetaSignup, 'id' | 'timestamp'>) => {
  try {
    const docRef = await adminDb.collection('beta-signups').add({
      ...signupData,
      timestamp: FieldValue.serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding beta signup with admin SDK:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

// Contact form function (uses Admin SDK)
export const addContactMessageAdmin = async (messageData: Omit<ContactMessage, 'id' | 'timestamp'>) => {
  try {
    const docRef = await adminDb.collection('contact-messages').add({
      ...messageData,
      timestamp: FieldValue.serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding contact message with admin SDK:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}; 