import { initializeApp, getApps, cert } from 'firebase-admin/app';
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
let adminDb: any;

function initializeFirebaseAdmin() {
  try {
    if (!getApps().length) {
      console.log('Firebase Admin: Initializing Firebase Admin SDK');
      
      // Check if we're running in Firebase hosting environment
      // Firebase hosting automatically provides credentials for the Admin SDK
      const isFirebaseHosting = process.env.FIREBASE_CONFIG || 
                               process.env.FUNCTIONS_EMULATOR || 
                               process.env.GCLOUD_PROJECT ||
                               process.env.GOOGLE_CLOUD_PROJECT;
      
      if (isFirebaseHosting) {
        // Running in Firebase hosting/Cloud Functions environment
        console.log('Firebase Admin: Using Firebase hosting environment credentials');
        initializeApp();
      } else if (process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
        // Local development with explicit credentials
        console.log('Firebase Admin: Using explicit credentials');
        initializeApp({
          credential: cert({
            projectId: process.env.FIREBASE_PROJECT_ID || 'sybertnetics-webpage',
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
          })
        });
      } else {
        // Default initialization (works in Firebase hosting)
        console.log('Firebase Admin: Using default initialization');
        initializeApp();
      }
    }
    
    adminDb = getFirestore();
    console.log('Firebase Admin: Successfully initialized');
    return true;
  } catch (error) {
    console.error('Firebase Admin: Failed to initialize:', error);
    // Don't fail during build time
    if (process.env.NODE_ENV === 'production' || process.env.VERCEL || process.env.FIREBASE_CONFIG) {
      console.log('Firebase Admin: Deferring initialization to runtime');
      return true; // Return true to avoid build failures
    }
    return false;
  }
}

// Initialize on module load
initializeFirebaseAdmin();

// --- Backend-Only Functions ---

// Beta signup function (uses Admin SDK)
export const addBetaSignupAdmin = async (signupData: Omit<BetaSignup, 'id' | 'timestamp'>) => {
  try {
    // Ensure Firebase Admin is initialized
    if (!adminDb) {
      const initSuccess = initializeFirebaseAdmin();
      if (!initSuccess || !adminDb) {
        throw new Error('Failed to initialize Firebase Admin SDK');
      }
    }
    
    const docRef = await adminDb.collection('beta-signups').add({
      ...signupData,
      timestamp: FieldValue.serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Firebase Admin: Error adding beta signup:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

// Contact form function (uses Admin SDK)
export const addContactMessageAdmin = async (messageData: Omit<ContactMessage, 'id' | 'timestamp'>) => {
  try {
    // Ensure Firebase Admin is initialized
    if (!adminDb) {
      const initSuccess = initializeFirebaseAdmin();
      if (!initSuccess || !adminDb) {
        throw new Error('Failed to initialize Firebase Admin SDK');
      }
    }
    
    const docRef = await adminDb.collection('contact-messages').add({
      ...messageData,
      timestamp: FieldValue.serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Firebase Admin: Error adding contact message:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}; 