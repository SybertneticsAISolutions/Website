import { initializeApp, getApps } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

// Types from the client-side, assuming they are also used here
import { BetaSignup, ContactMessage } from './firebase';

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