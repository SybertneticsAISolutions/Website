import { useState, useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

// Define admin users by email (temporary solution until custom claims work)
const ADMIN_EMAILS = [
  'kaynenbpellegrino@sybertnetics.com',
  'kaynbpellegrino@sybertnetics.com'
];

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      // Check if user is admin
      if (user) {
        const userIsAdmin = ADMIN_EMAILS.includes(user.email || '');
        setIsAdmin(userIsAdmin);
        
        console.log('User authenticated:', {
          email: user.email,
          uid: user.uid,
          isAdmin: userIsAdmin
        });
        
        // Still try to check custom claims if available
        try {
          const idTokenResult = await user.getIdTokenResult();
          console.log('User ID token claims:', idTokenResult.claims);
          
          // If custom claims are available, use them
          if (idTokenResult.claims.admin) {
            setIsAdmin(true);
          }
        } catch (error) {
          console.error('Error getting ID token:', error);
          // Fall back to email-based admin check
        }
      } else {
        setIsAdmin(false);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return { user, loading, isAdmin };
} 